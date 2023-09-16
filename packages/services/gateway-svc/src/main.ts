import 'reflect-metadata';

import express from 'express';
import { Server } from 'http';
import { NestFactory } from '@nestjs/core';
import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ExpressAdapter } from '@nestjs/platform-express';
import { Context, Handler } from 'aws-lambda';
import { createServer, proxy } from 'aws-serverless-express';
import { eventContext } from 'aws-serverless-express/middleware';
import { AppModule } from './modules/app.module';

const logger = new Logger('Halen Rest Gateway');
let cachedServer: Server;

if (process.env.ENVIRONMENT === 'local' && process.env.BOOTSTRAP_NEST_APP === 'true') {
  nestBootstrap();
} else {
  logger.log(`Cannot Start Nest Service. Bad configuration: `, {
    gien: {
      env: process.env.ENVIRONMENT,
      nestBootstrapFlag: process.env.BOOTSTRAP_NEST_APP,
    },
    required: {
      env: 'local',
      nestBootstrapFlag: 'true',
    },
  });
}

async function nestBootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const PORT = configService.get('PORT');

  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  setupSwagger(app);

  await app.listen(PORT, '0.0.0.0');
  logger.log(`Nest Service is running on: ${await app.getUrl()}`);
}

export function setupSwagger(app: INestApplication) {
  const options = new DocumentBuilder()
    .setTitle('Halen Technologies - Rest Gateway Service')
    .setDescription('Rest Gateway Service for Halen Technologies')
    .setVersion('1.0')
    .addTag('')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

async function serverlessBootstrap(): Promise<Server> {
  const binaryMimeTypes: string[] = [];
  if (!cachedServer) {
    logger.log('Bootstraping Server for Serverless');
    try {
      const expressApp = express();
      const adapter = new ExpressAdapter(expressApp);
      const app = await NestFactory.create(AppModule, adapter);
      app.use(eventContext());

      app.setGlobalPrefix('api');
      app.useGlobalPipes(new ValidationPipe());
      setupSwagger(app);

      await app.init(); // has to be after the swagger setup
      cachedServer = createServer(expressApp, undefined, binaryMimeTypes);
    } catch (e) {
      return Promise.reject(e);
    }
  }

  logger.log('Using Cached Server for Serverless');
  return Promise.resolve(cachedServer);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const handler: Handler = async (event: any, context: Context) => {
  if (event.path === '/api') {
    event.path = '/api/';
  }
  event.path = event.path.includes('swagger-ui') ? `/api${event.path}` : event.path;

  cachedServer = await serverlessBootstrap();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
