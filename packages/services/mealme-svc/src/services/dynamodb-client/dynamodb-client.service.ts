import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';

@Injectable()
export class DynamodbClientService {
  constructor(private readonly configService: ConfigService) {}

  async writeDataToDynamoDB(
    putItem: AWS.DynamoDB.DocumentClient.PutItemInput,
  ): Promise<
    PromiseResult<AWS.DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError>
  > {
    const dynamoDBClient: DocumentClient = await this.getDocumentClient();
    try {
      return await dynamoDBClient.put(putItem).promise();
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
    return null;
  }

  async getDocumentClient(): Promise<AWS.DynamoDB.DocumentClient> {
    const awsRegion = this.configService.get<string>('AWS_REGION');
    return new AWS.DynamoDB.DocumentClient({ region: awsRegion });
  }
}
