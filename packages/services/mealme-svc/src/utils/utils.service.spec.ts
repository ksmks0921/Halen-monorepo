import { TestingModule } from '@nestjs/testing';
import { UtilsService } from './utils.service';
import { SharedTestingModule } from '../modules/shared-testing.module';

describe('UtilsService', () => {
  let service: UtilsService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    service = module.get<UtilsService>(UtilsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
