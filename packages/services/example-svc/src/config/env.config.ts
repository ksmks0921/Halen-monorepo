import { SecretsManager } from 'aws-sdk';

const notFound = 'Secret Not Found';

export default async () => {
  return await loadSecretsFromAWS();
};

export function getSecret(key: string): string {
  return process.env[key] ?? notFound;
}

export async function loadSecretsFromAWS() {
  try {
    const client = new SecretsManager({
      region: process.env.AWS_REGION,
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
    });

    const secrets = await client.getSecretValue({ SecretId: process.env.AWS_SECRET_NAME }).promise();

    const parsedSecrets = JSON.parse(secrets.SecretString);
    console.log({ parsedSecrets });

    // Store secrets to process env
    Object.keys(parsedSecrets).forEach(function (key) {
      process.env[key] = parsedSecrets[key];
    });
  } catch (error) {
    // switch (error.code) {
    //   case "DecryptionFailureException":
    //     // Secrets Manager can't decrypt the protected secret text using the provided KMS key.
    //     // Deal with the exception here, and/or rethrow at your discretion.
    //     break;
    //   case "InternalServiceErrorException":
    //     // An error occurred on the server side.
    //     // Deal with the exception here, and/or rethrow at your discretion.
    //     break;
    //   case "InvalidParameterException":
    //     // You provided an invalid value for a parameter.
    //     // Deal with the exception here, and/or rethrow at your discretion.
    //     break;
    //   case "InvalidRequestException":
    //     // You provided a parameter value that is not valid for the current state of the resource.
    //     // Deal with the exception here, and/or rethrow at your discretion.
    //     break;
    //   case "ResourceNotFoundException":
    //     // We can't find the resource that you asked for.
    //     // Deal with the exception here, and/or rethrow at your discretion.
    //     break;
    //   default:
    //     break;
    // }
    throw error;
  }
}

// https://github.com/razzkumar/nestjs-aws-secrets-manager/tree/main/samples/quick-start-secrets-to-env
// https://github.com/ajdelgados/nestjs-aws-secrets-manager
// https://github.com/Rapid-learnings/nestjs-secrets-manager        this one
