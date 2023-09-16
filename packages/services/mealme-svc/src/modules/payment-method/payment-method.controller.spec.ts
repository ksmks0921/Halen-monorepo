import { TestingModule } from '@nestjs/testing';
import { SharedTestingModule } from '../shared-testing.module';
import { PaymentMethodController } from './payment-method.controller';

describe('PaymentMethodController', () => {
  let controller: PaymentMethodController;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;
    controller = module.get<PaymentMethodController>(PaymentMethodController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
