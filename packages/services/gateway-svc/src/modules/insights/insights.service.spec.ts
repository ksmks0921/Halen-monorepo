import { TestingModule } from '@nestjs/testing';
import { DynamodbClientService } from '../../services/dynamodb-client/dynamodb-client.service';
import { InsightsService } from './insights.service';
import { SharedTestingModule } from '../shared-testing.module';

describe('InsightsService', () => {
  let service: InsightsService;
  let dynamodbClientService: DynamodbClientService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    service = module.get<InsightsService>(InsightsService);
    dynamodbClientService = module.get<DynamodbClientService>(DynamodbClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(dynamodbClientService).toBeDefined();
  });
});
