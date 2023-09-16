import { TestingModule } from '@nestjs/testing';
import { OrderController } from './order.controller';
import { SharedTestingModule } from '../shared-testing.module';

describe('OrderController', () => {
  let controller: OrderController;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    controller = module.get<OrderController>(OrderController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
