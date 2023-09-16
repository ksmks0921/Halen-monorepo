import { HttpService } from '@nestjs/axios';
import { TestingModule } from '@nestjs/testing';
import { DynamodbClientService } from '../../services/dynamodb-client/dynamodb-client.service';
import { UtilsService } from '../../utils/utils.service';
import { MealmeAxiosClientService } from './mealme-axios-client.service';
import { SharedTestingModule } from '../../modules/shared-testing.module';

describe('MealmeAxiosClientService', () => {
  let service: MealmeAxiosClientService;
  let utilsService: UtilsService;
  let dynamodbClientService: DynamodbClientService;
  let httpService: HttpService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    service = module.get<MealmeAxiosClientService>(MealmeAxiosClientService);
    utilsService = module.get<UtilsService>(UtilsService);
    httpService = module.get<HttpService>(HttpService);
    dynamodbClientService = module.get<DynamodbClientService>(
      DynamodbClientService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(utilsService).toBeDefined();
    expect(httpService).toBeDefined();
    expect(dynamodbClientService).toBeDefined();
  });
});
