import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';
import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import { PromiseResult } from 'aws-sdk/lib/request';
import { BaseLoggerService } from '../base-logger/base-logger.service';

@Injectable()
export class DynamodbClientService {
  constructor(private readonly logger: BaseLoggerService, protected readonly configService: ConfigService) {
    logger.classContext = this.constructor.name;
  }

  async writeDataToDynamoDB(
    putItem: AWS.DynamoDB.DocumentClient.PutItemInput
  ): Promise<PromiseResult<AWS.DynamoDB.DocumentClient.PutItemOutput, AWS.AWSError>> {
    const dynamoDBClient: DocumentClient = await this.getDocumentClient();
    try {
      return await dynamoDBClient.put(putItem).promise();
    } catch (error) {
      this.logger.error(`Error in writing to dynamoDb : ${error.message}`, error);
      throw new InternalServerErrorException(error);
    }
  }

  async getDocumentClient(): Promise<AWS.DynamoDB.DocumentClient> {
    const awsRegion = this.configService.get<string>('AWS_REGION');
    return new AWS.DynamoDB.DocumentClient({ region: awsRegion });
  }
}
