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

    const record = await Saved_Attraction.findOne({
        where: {
            name: data.name,
            user_id: data.userId
        }
    });

    if (!record) {
        try {
            await Saved_Attraction.create({
                user_id: data.userId,
                name: data.name,
                address: data.address,
                rating: data.rating,
                image_url: data?.image_url,
                description: data?.description,
                latitude: JSON.stringify(data.lat),
                longitude: JSON.stringify(data.lng),
                attractions_type: JSON.stringify(data.attraction_type),
                review_count: data.rating_count,
            })
            connection.close()
        }

        catch (e) {
            console.log('FAILED TO INSERT INTO DATABASE...')
            console.log(e)
            connection.close()
            body.error = e
            return {
                statusCode: 200,
                body: JSON.stringify(body)
            }

        }
    }
    else {
        return {
            statusCode: 200,
            body: JSON.stringify("Location already saved!")
        }
    }
    return {
        statusCode: 200,
        body: JSON.stringify(body)
    }
}