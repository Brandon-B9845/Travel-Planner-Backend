import { connectSequelize } from "../../lib/connectSequelize"
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda"
import { bodyType } from '../../types/types'
import { Saved_Attractions } from "../../models/Saved_Attractions"



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

    try {
        await Saved_Attractions.create({
        name: data.name,
        address: data.address,
        rating: data.rating,
        image_url: data.image_url,
        description: data?.description,
        lattitude: data.lattitude,
        longitude: data.longitude,
        attractions_type: data.attraction_type,
        review_count: data.review_count,
        user_id: data.userId
        })
    }
}