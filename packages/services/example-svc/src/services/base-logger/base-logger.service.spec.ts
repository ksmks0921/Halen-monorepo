import { TestingModule } from '@nestjs/testing';
import { BaseLoggerService } from './base-logger.service';
import { SharedTestingModule } from '../../modules/shared-testing.module';

describe('BaseLoggerService', () => {
  let service: BaseLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    service = module.get<BaseLoggerService>(BaseLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
