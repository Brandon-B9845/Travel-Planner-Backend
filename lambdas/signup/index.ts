import { scryptSync, randomBytes, createHash } from "crypto"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { connectSequelize } from "../../lib/connectSequelize"
import { User } from "../../models/Users"
import { bodyType } from "../../types/types"

export function hash(input: string) {
  return createHash("sha256").update(input).digest("hex")
}

export function getSafePassword(password: string) {
  const hashResult = hash(password)

  const salt = randomBytes(16).toString("hex")

  const hashedPassword = scryptSync(hashResult, salt, 64)

  return `${salt} : ${hashedPassword}`
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const client_id = process.env.client_id
  const client_secret = process.env.client_secret
  const audience = process.env.audience
  const auth0_urlToken = process.env.auth0_urltoken
  const database = process.env.database
  const username = process.env.username
  const password = process.env.password
  const host = process.env.host

  const data = JSON.parse(event.body)
  let body: bodyType = {}

  const connection = connectSequelize(database, username, password, host)
  const userPassword = getSafePassword(data.password)

  try {
    await User.create({
      email: data.email,
      password: userPassword,
    })
    body.success = true
    connection.close()
  }

  catch (e) {
    let errorMessage: string;
    if (e.name === 'SequelizeUniqueConstraintError') {
      errorMessage = 'User already exists!'
    } else {
      errorMessage = 'Failed to create user!'
    }
    connection.close()
    body.error = errorMessage
    return {
      statusCode: 200,
      body: JSON.stringify(body)
    }
  }
  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: `{"client_id":"${client_id}","client_secret":"${client_secret}","audience":"${audience}" ,"grant_type":"client_credentials"}`,
  }

  try {

    const auth0Response = await fetch(auth0_urlToken as string, options)
    const jwt = await auth0Response.json()
    const sendableJWT = jwt.access_token

    body.jwt = sendableJWT
  } catch (e) {
    console.log("Failed to sign up: ", e)
    body.error = 'Could not sign up'
  }

  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
}
