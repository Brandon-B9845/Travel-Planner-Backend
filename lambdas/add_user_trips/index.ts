import { connectSequelize } from "../../lib/connectSequelize";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { bodyType } from "../../types/types";
import { User_Trips} from "../../models/User_Trips";

export const handler = async (
    event: APIGatewayProxyEvent
): Promise <APIGatewayProxyResult> => {
    const database = process.env.database
    const username = process.env.username
    const password = process.env.password 
    const host = process.env.host

    const data = JSON.parse(event.body)
    let body: bodyType = {}
    const connection = connectSequelize(database, username, password, host)

    const record = await User_Trips.findOne({
        where: {
            trip_name:data.tripName,
            user_id: data.userId
        }
    })

    if (!record){
        try {
            await User_Trips.create({
                userId : data.userId,
                trip_name : data.tripName,
                image_url : data?.image_url,
                attractions: data.attractions,

            })
            connection.close()
        }
        catch (e) {
            console.log('FAILED TO INSERT INTO DATABAE...')
            console.log(e)
            body.error = e 
            return {
                statusCode: 200,
                body: JSON.stringify(body)
            }
        }
    }

}