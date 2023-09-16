/* eslint-disable @typescript-eslint/no-var-requires */
import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { BaseLoggerService } from '../services/base-logger/base-logger.service';
import { InsightsController } from './insights/insights.controller';
import { InsightsService } from './insights/insights.service';
import envConfig from '../config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    HttpModule,
  ],
  controllers: [AppController, InsightsController],
  providers: [AppService, InsightsService, BaseLoggerService],
})
export class AppModule {}
