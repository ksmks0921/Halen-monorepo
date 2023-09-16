import { TestingModule } from '@nestjs/testing';
import { DynamodbClientService } from '../../services/dynamodb-client/dynamodb-client.service';
import { SearchController } from './search.controller';
import { SearchService } from './search.service';
import { SharedTestingModule } from './../shared-testing.module';

describe('SearchController', () => {
  let controller: SearchController;
  let searchService: SearchService;
  let dynamodbClientService: DynamodbClientService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    controller = module.get<SearchController>(SearchController);
    searchService = module.get<SearchService>(SearchService);
    dynamodbClientService = module.get<DynamodbClientService>(
      DynamodbClientService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(searchService).toBeDefined();
    expect(dynamodbClientService).toBeDefined();
  });
});
