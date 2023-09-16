import { TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { SharedTestingModule } from '../modules/shared-testing.module';
import { getSecret } from './env.config';

describe('envConfig', () => {
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await SharedTestingModule;
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should get a static secret', () => {
    const secretValue = getSecret('FRIENDLY_NAME');
    expect(secretValue).toBe('Halen Example Service');
  });

  it('should get a local secret from configService', () => {
    const secretValue = configService.get<string>('FRIENDLY_NAME');
    expect(secretValue).toBe('Halen Example Service');
  });

  it('should get a remote secret from configService', () => {
    const secretValue = configService.get<string>('_X_AMZN_TRACE_ID');
    expect(secretValue).toBeDefined();
  });
});
