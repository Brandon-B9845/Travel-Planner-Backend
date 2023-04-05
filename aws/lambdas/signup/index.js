import fetch from 'node-fetch'

export const handler = async (event) => {

    var options = {
        method: 'POST',

        headers: { 'content-type': 'application/json' },
        body: `{"client_id":${process.env.client_id},"client_secret":${process.env.client_secret},"audience":${process.env.audience} ,"grant_type":"client_credentials"}`
    };

    const results = await fetch(process.env.auth0_urltoken, options)
    console.log('here are your results')
    console.log(results)
    console.log('end of results')
    
    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from signUp!'),
    };
    return response;
};

