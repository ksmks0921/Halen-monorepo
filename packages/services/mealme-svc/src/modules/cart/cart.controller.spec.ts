import { TestingModule } from '@nestjs/testing';
import { CartController } from './cart.controller';
import { SharedTestingModule } from '../shared-testing.module';

describe('CartController', () => {
  let controller: CartController;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    controller = module.get<CartController>(CartController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
