import { TestingModule } from '@nestjs/testing';
import { CartService } from './cart.service';
import { SharedTestingModule } from '../shared-testing.module';

describe('CartService', () => {
  let service: CartService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;

    service = module.get<CartService>(CartService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
