import { TestingModule } from '@nestjs/testing';
import { DynamodbClientService } from '../../services/dynamodb-client/dynamodb-client.service';
import { InsightsController } from './insights.controller';
import { InsightsService } from './insights.service';
import { SharedTestingModule } from '../shared-testing.module';

describe('InsightsController', () => {
  let controller: InsightsController;
  let service: InsightsService;
  let dynamodbClientService: DynamodbClientService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    controller = module.get<InsightsController>(InsightsController);
    service = module.get<InsightsService>(InsightsService);
    dynamodbClientService = module.get<DynamodbClientService>(DynamodbClientService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(service).toBeDefined();
    expect(dynamodbClientService).toBeDefined();
  });
});
