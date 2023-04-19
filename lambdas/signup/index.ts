import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { connectSequelize } from "../../lib/connectSequelize"
import { User } from "../../models/Users"
import { bodyType } from "../../types/types"



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

  console.log(data)
  console.log(data.email)
  console.log(data.id)

  try {
    await User.create({
      email: data.email,
      id: data.id
    })
    body.success = true
    connection.close()
  }

  catch (e) {
    console.log('FAILED TO CREATE USER...')
    console.log(e)
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

  return {
    statusCode: 200,
    body: JSON.stringify(body)
  }
}
