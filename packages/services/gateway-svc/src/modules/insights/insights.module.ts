import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { BaseLoggerService } from '../../services/base-logger/base-logger.service';
import { DynamodbClientService } from '../../services/dynamodb-client/dynamodb-client.service';
import { InsightsController } from './insights.controller';
import { InsightsService } from './insights.service';

@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [InsightsController],
  providers: [BaseLoggerService, InsightsService, DynamodbClientService],
})
export class InsightsModule {}
