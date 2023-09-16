import { TestingModule } from '@nestjs/testing';
import { DynamodbClientService } from '../../services/dynamodb-client/dynamodb-client.service';
import { InventoryController } from './inventory.controller';
import { InventoryService } from './inventory.service';
import { SharedTestingModule } from '../../modules/shared-testing.module';

describe('InventoryController', () => {
  let controller: InventoryController;
  let inventoryService: InventoryService;
  let dynamodbClientService: DynamodbClientService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    controller = module.get<InventoryController>(InventoryController);
    inventoryService = module.get<InventoryService>(InventoryService);
    dynamodbClientService = module.get<DynamodbClientService>(
      DynamodbClientService,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
    expect(inventoryService).toBeDefined();
    expect(dynamodbClientService).toBeDefined();
  });
});
