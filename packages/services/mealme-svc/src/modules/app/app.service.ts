import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  constructor(protected readonly configService: ConfigService) {}

  getHealth(): string {
    return `${this.configService.get<string>(
      'FRIENDLY_NAME',
    )} is Alive and Healthy`;
  }
}
