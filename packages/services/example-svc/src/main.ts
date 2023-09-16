import 'reflect-metadata';
// eslint-disable-next-line @typescript-eslint/no-var-requires
// require('source-map-support').install();
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

const logger = new Logger('Halen Example Service');
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
    .setTitle('Halen Technologies - Example Service')
    .setDescription('Example Service for Halen Technologies')
    .setVersion('1.0.0')
    .addTag('#tag')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
}

// NOTE: If you get ERR_CONTENT_DECODING_FAILED in your browser, this is likely
// due to a compressed response (e.g. gzip) which has not been handled correctly
// by aws-serverless-express and/or API Gateway. Add the necessary MIME types to
// binaryMimeTypes below
async function bootstrapServer(): Promise<Server> {
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

  cachedServer = await bootstrapServer();
  return proxy(cachedServer, event, context, 'PROMISE').promise;
};
