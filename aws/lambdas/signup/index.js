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


    // const options = {
    //     method: 'POST',
    //     headers: { 'content-type': 'application/json' },
    //     body: '{"client_id":"JiPwRclG8HvQAljlnwv3SFo1a0w5FrOG","client_secret":"4jctjN2qSotSOOvQoy5jTtk9H9rV23d6ceZqp8OOKdPASmwzbd2P85vm95U79fHx","audience":"https://q3guo5kcf2.execute-api.us-east-1.amazonaws.com/","grant_type":"client_credentials"}'
    // };

    // const results = (await fetch('https://dev-1qsx7375fpxjg7nl.us.auth0.com/oauth/token', options))

    console.log('here are your results')
    console.log(results)
    console.log('end of results')

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from signUp!'),
    };
    return response;
};

