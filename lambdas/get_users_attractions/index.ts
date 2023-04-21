import { connectSequelize } from "../../lib/connectSequelize";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { Saved_Attraction } from "../../models/Saved_Attractions";
import { bodyType } from '../../types/types'

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const database = process.env.database
    const username = process.env.username
    const password = process.env.password
    const host = process.env.host

    console.log('event is: ', event)
    console.log('he body is: ', event.body)
    console.log('he PARSED body isss: ', JSON.parse(event?.body))
    const data = JSON.parse(event.body)
    const connection = connectSequelize(database, username, password, host)

    console.log(typeof data)
    console.log(data)

    const userId = parseInt(data.userId)
    console.log('id is here: ', userId)
    const record = await Saved_Attraction.findAll({
        where: {
            user_id: userId
        },
        raw: true
    })
    connection.close()

    try {
        return {
            statusCode: 200,
            body: JSON.stringify(record)
        }
    }
    catch (e){
        console.log('FAILED TO GRAB USER ATTRACTIONS')
        console.log(e)
        return {
            statusCode: 200,
            body: JSON.stringify('Failed')
        }
    }
}