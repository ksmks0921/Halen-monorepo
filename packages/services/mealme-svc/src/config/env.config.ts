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

    const secrets = await client
      .getSecretValue({ SecretId: process.env.AWS_SECRET_NAME })
      .promise();
    const parsedSecrets = JSON.parse(secrets.SecretString);

    // Store secrets to process env
    Object.keys(parsedSecrets).forEach(function (key) {
      process.env[key] = parsedSecrets[key];
    });
  } catch (error) {
    throw error;
  }
}
