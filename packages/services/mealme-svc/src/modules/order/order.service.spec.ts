import { TestingModule } from '@nestjs/testing';
import { OrderService } from './order.service';
import { SharedTestingModule } from '../shared-testing.module';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
