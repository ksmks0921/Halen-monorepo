import { uuid } from 'uuidv4';
import { HttpException } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DynamodbClientService } from '../../services/dynamodb-client/dynamodb-client.service';
import { WaitlistRegistrationDto } from './dtos/insights.dto';
import { BaseLoggerService } from '../../services/base-logger/base-logger.service';

@Injectable()
export class InsightsService {
  constructor(
    private readonly logger: BaseLoggerService,
    protected readonly configService: ConfigService,
    private readonly dynamoDBClient: DynamodbClientService
  ) {
    logger.classContext = this.constructor.name;
  }

  async createWaitlist(data: WaitlistRegistrationDto): Promise<void> {
    try {
      data.id = uuid();
      data.createdAt = new Date().toISOString();
      await this.dynamoDBClient.writeDataToDynamoDB({
        TableName: this.configService.get<string>('WAITLIST_TABLE'),
        Item: data,
      });
    } catch (error) {
      this.logger.log(`error in creating waitlist: ${error.message}`);
      throw new HttpException(`error in creating waitlist`, 500);
    }
  }
}
