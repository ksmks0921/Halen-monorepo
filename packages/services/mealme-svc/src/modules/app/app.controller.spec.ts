import { TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { SharedTestingModule } from '../shared-testing.module';

describe('AppController', () => {
  let appController: AppController;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;
    appController = module.get<AppController>(AppController);
    configService = module.get<ConfigService>(ConfigService);
  });

  describe('root', () => {
    it('should return health confirmation', () => {
      expect(appController.getHealth()).toBe(
        `${configService.get<string>('FRIENDLY_NAME')} is Alive and Healthy`,
      );
    });
  });
});
