import { scryptSync, randomBytes, createHash } from "crypto";
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export function hash(input: string) {
  return createHash("sha256").update(input).digest("hex");
}

export function getSafePassword(password: string) {
  const hashResult = hash(password);

  const salt = randomBytes(16).toString("hex");

  const hashedPassword = scryptSync(hashResult, salt, 64);

  return `${salt}:${hashedPassword}`;
}

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  const client_id = process.env.client_id;
  const client_secret = process.env.client_secret;
  const audience = process.env.audience;
  const auth0_urlToken = process.env.auth0_urltoken;

  const options = {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: `{"client_id":"${client_id}","client_secret":"${client_secret}","audience":"${audience}" ,"grant_type":"client_credentials"}`,
  };

  let jwt;
  let response;
  try {
    // const userPassword = getSafePassword(event.password)

    // Create user
    // await User.insert({
    //     email: event.email,
    //     password: userPassword
    // })

    // jwt = await fetch(auth0_urlToken as string, options)
    response = {
      statusCode: 200,
      body: "hey",
      // body: JSON.stringify(await jwt.json()),
    };
  } catch (e) {
    console.log("Failed to sign up: ", e);
    response = {
      statusCode: 200,
      body: JSON.stringify("Could not sign up"),
    };
  }

  return response;
};
