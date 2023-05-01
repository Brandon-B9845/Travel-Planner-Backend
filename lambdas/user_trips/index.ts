import { connectSequelize } from "../../lib/connectSequelize";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { bodyType } from "../../types/types";
import { User_trips} from "../../models/User_Trips";

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

    const record = await User_trips.findOne({
        where: {
            name:data.name,
            user_id: data.userId
        }
    })

    if (!record){
        
    }

}