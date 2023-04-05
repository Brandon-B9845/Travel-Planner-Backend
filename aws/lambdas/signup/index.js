import fetch from 'node-fetch'

export const handler = async (event) => {
    
const client_id = process.env.client_id
const client_secret = process.env.client_secret
const audience = process.env.audience
const  auth0_urlToken = process.env.auth0_urltoken

    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: `{"client_id":"${client_id}","client_secret":"${client_secret}","audience":"${audience}" ,"grant_type":"client_credentials"}`
    };

    const results = await fetch(auth0_urlToken, options)

    const response = {
        statusCode: 200,
        body: JSON.stringify(await results.json()),
    };
    return response;
};

