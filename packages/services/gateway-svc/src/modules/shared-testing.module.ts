import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { BaseLoggerService } from '../services/base-logger/base-logger.service';
import { DynamodbClientService } from '../services/dynamodb-client/dynamodb-client.service';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { InsightsController } from './insights/insights.controller';
import { InsightsService } from './insights/insights.service';
import envConfig from '../config/env.config';

export const SharedTestingModule = Test.createTestingModule({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
  ],
  controllers: [AppController, InsightsController],
  providers: [AppService, BaseLoggerService, DynamodbClientService, InsightsService],
}).compile();
