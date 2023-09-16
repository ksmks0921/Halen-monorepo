import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags('App')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({ summary: 'Get Application Health' })
  @ApiResponse({ status: 200, description: 'OK' })
  @Get('/health')
  getHealth(): string {
    return this.appService.getHealth();
  }
}
