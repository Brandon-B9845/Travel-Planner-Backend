export const handler = async (event) => {
    // TODO implement
    var options = {
        method: 'POST',

        headers: { 'content-type': 'application/json' },
        body: `{"client_id":"${process.env.client_id}","client_secret":"${process.env.client_secret}","audience":"${process.env.audience}' }`
    };

    await fetch(process.env.auth0_urltoken, options)

    const response = {
        statusCode: 200,
        body: JSON.stringify('Hello from signUp!'),
    };
    return response;
};

