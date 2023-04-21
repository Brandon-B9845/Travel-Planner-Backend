import { connectSequelize } from "../../lib/connectSequelize"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { bodyType } from '../../types/types'
import { Saved_Attraction } from "../../models/Saved_Attractions"

export const handler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
    const database = process.env.database
    const username = process.env.username
    const password = process.env.password
    const host = process.env.host

    const data = JSON.parse(event.body)
    let body: bodyType = {}
    const connection = connectSequelize(database, username, password, host)

    console.log('please')
    console.log(data)

    try {
        await Saved_Attraction.create({
        user_id: data.userId,
        name: data.name,
        address: data.address,
        rating: data.rating,
        image_url: data?.image_url,
        description: data?.description,
        lattitude: data.lat,
        longitude: data.lng,
        attractions_type: data.attraction_type,
        review_count: data.rating_count,
        })
        connection.close()
    }

    catch (e){
        console.log('FAILED TO INSERT INTO DATABASE...')
        console.log(e)
        connection.close()
        body.error = e
        return {
            statusCode: 200,
            body: JSON.stringify(body)
        }

    }

    return{
        statusCode: 200,
        body: JSON.stringify(body)
    }
}