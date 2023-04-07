import { scryptSync, timingSafeEqual } from 'crypto'
import { hash } from '../signup'

export function checkPassword(savedPassword ,password){
    // Get salt and key from original password
    const [salt, key] = savedPassword.split(' : ') 
    const keyBuffer =  Buffer.from(key)

    // Hash input password
    const hashedPass = hash(password)

    // Get buffer the same way we did with original password
    const hashedBuffer = scryptSync(hashedPass, salt, 64)

    // We stringify and then split the buffer the same way we did as above
    const stringifiedBuffer= `${hashedBuffer}`;

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