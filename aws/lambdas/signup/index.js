import fetch from 'node-fetch'

export const handler = async (event) => {
    
let client_id = process.env.client_id
let client_secret = process.env.client_secret
let audience = process.env.audience
let auth0_urlToken = process.env.auth0_urltoken

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: `{"client_id":"${client_id}","client_secret":"${client_secret}","audience":"${audience}" ,"grant_type":"client_credentials"}`
    };

    const results = await fetch(auth0_urlToken, options)

    const response = {
        statusCode: 200,
        body: JSON.stringify(await results.json),
    };
    return response;
};

