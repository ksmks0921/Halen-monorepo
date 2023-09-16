import { TestingModule } from '@nestjs/testing';
import { DynamodbClientService } from '../../services/dynamodb-client/dynamodb-client.service';
import { InventoryService } from '../inventory/inventory.service';
import { MealmeAxiosClientService } from '../../gateways/mealme-axios-client/mealme-axios-client.service';
import { SearchService } from './search.service';
import { SharedTestingModule } from './../shared-testing.module';

describe('SearchService', () => {
  let service: SearchService;
  let mealmeAxiosClientService: MealmeAxiosClientService;
  let inventoryService: InventoryService;
  let dynamodbClientService: DynamodbClientService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    service = module.get<SearchService>(SearchService);
    mealmeAxiosClientService = module.get<MealmeAxiosClientService>(
      MealmeAxiosClientService,
    );
    inventoryService = module.get<InventoryService>(InventoryService);
    dynamodbClientService = module.get<DynamodbClientService>(
      DynamodbClientService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mealmeAxiosClientService).toBeDefined();
    expect(inventoryService).toBeDefined();
    expect(dynamodbClientService).toBeDefined();
  });
});
