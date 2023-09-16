import { TestingModule } from '@nestjs/testing';
import { DynamodbClientService } from '../../services/dynamodb-client/dynamodb-client.service';
import { MealmeAxiosClientService } from '../../gateways/mealme-axios-client/mealme-axios-client.service';
import { InventoryService } from './inventory.service';
import { SharedTestingModule } from '../../modules/shared-testing.module';

describe('InventoryService', () => {
  let service: InventoryService;
  let mealmeAxiosClientService: MealmeAxiosClientService;
  let dynamodbClientService: DynamodbClientService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    service = module.get<InventoryService>(InventoryService);
    mealmeAxiosClientService = module.get<MealmeAxiosClientService>(
      MealmeAxiosClientService,
    );
    dynamodbClientService = module.get<DynamodbClientService>(
      DynamodbClientService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(mealmeAxiosClientService).toBeDefined();
    expect(dynamodbClientService).toBeDefined();
  });
});
