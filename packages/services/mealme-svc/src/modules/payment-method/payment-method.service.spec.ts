import { TestingModule } from '@nestjs/testing';
import { SharedTestingModule } from '../shared-testing.module';
import { PaymentMethodService } from './payment-method.service';

describe('PaymentMethodService', () => {
  let service: PaymentMethodService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;
    service = module.get<PaymentMethodService>(PaymentMethodService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
