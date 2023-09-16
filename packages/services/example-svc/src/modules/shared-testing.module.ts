import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { BaseLoggerService } from '../services/base-logger/base-logger.service';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import envConfig from '../config/env.config';

export const SharedTestingModule = Test.createTestingModule({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: '.env',
      load: [envConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService, BaseLoggerService],
}).compile();
