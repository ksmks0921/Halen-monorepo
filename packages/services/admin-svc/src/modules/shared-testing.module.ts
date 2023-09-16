import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import envConfig from '../config/env.config';

export const SharedTestingModule = Test.createTestingModule({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
}).compile();
