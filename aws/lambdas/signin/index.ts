import { scryptSync, randomBytes, createHash, timingSafeEqual } from 'crypto'


export function checkPassword(savedPassword ,password){
    const [salt, key] = savedPassword.split(':') 
    console.log(key)
    const length: number =key.length
    const hashedBuffer = scryptSync(password, salt, length)
    console.log(hashedBuffer.length)
    const keyBuffer = Buffer.from(key, 'hex')
    console.log(keyBuffer)
    const match = timingSafeEqual(hashedBuffer, keyBuffer) 

    if (match){
        return true
    } else return false
}

const handler = async (event) => {
    const client_id = process.env.client_id
const client_secret = process.env.client_secret
const audience = process.env.audience
const  auth0_urlToken = process.env.auth0_urltoken

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: `{"client_id":"${client_id}","client_secret":"${client_secret}","audience":"${audience}" ,"grant_type":"client_credentials"}`
    };

    let jwt
    let response
    try {
        // const user = User.findOne({
        //     where: {
        //         email: event.email
        //     }
        // })
        // const passwordsMatch: boolean = checkPassword(user.password)

        // jwt = await fetch(auth0_urlToken as string, options)
        response = {
            statusCode: 200,
            body: JSON.stringify(await jwt.json()),
        };
    } catch (e){
        console.log('Failed to log in.', e)
        response = {
            statusCode: 200,
            body: JSON.stringify('Could not log in'),
        };
    }
    

    
    return response;
}