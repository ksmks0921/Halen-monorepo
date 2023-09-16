import { TestingModule } from '@nestjs/testing';
import { DynamodbClientService } from './dynamodb-client.service';
import { SharedTestingModule } from '../../modules/shared-testing.module';

describe('DynamodbClientService', () => {
  let service: DynamodbClientService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    service = module.get<DynamodbClientService>(DynamodbClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
