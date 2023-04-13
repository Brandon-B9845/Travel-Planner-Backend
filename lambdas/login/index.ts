import { scryptSync, timingSafeEqual } from 'crypto'
import { hash } from '../signup'
import { User } from '../../models/Users'
import { connectSequelize } from "../../lib/connectSequelize"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { bodyType } from '../../types/types'

export function checkPassword(savedPassword, password) {
    // Get salt and key from original password
    const [salt, key] = savedPassword.split(' : ')
    const keyBuffer = Buffer.from(key)

    // Hash input password
    const hashedPass = hash(password)

    // Get buffer the same way we did with original password
    const hashedBuffer = scryptSync(hashedPass, salt, 64)

    // We stringify and then split the buffer the same way we did as above
    const stringifiedBuffer = `${hashedBuffer}`;

    const testBuffer = Buffer.from(stringifiedBuffer)

    try {
        const match = timingSafeEqual(testBuffer, keyBuffer)
        console.log('Successfully compared the buffers. Results are: ', match)
        if (match) return true
    } catch (e) {
        console.log('Error testing buffers...', e)
        return false
    }
    return false

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
    const connection = connectSequelize(database, username, password, host)

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: `{"client_id":"${client_id}","client_secret":"${client_secret}","audience":"${audience}" ,"grant_type":"client_credentials"}`
    };


    let body: bodyType = {}
    try {
        const user = await User.findOne({
            where: {
                email: data.email
            }
        })
        const passwordsMatch: boolean = checkPassword(user.password, data.password)

        if (passwordsMatch) {
            body.success = true
        } else {
            body.success = false
            body.error = 'Passwords did not match'
        }
        connection.close()
    }
    catch (e) {
        console.log('Failed to log in.', e)
        body.success = false
        body.error = 'Unknown error occured... Try again'
        connection.close()
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