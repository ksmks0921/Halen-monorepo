import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ResponseDto } from '@halen/shared';
import { BaseLoggerService } from '../../services/base-logger/base-logger.service';
import { PaymentMethodService } from './payment-method.service';
import {
  DeletePaymentMethodRequest,
  PaymentMethodRequest,
} from '../../models/requests/payment-method.request';
import { PaymentMethod } from '../../models/payment-method.interface';

@ApiTags('Payment')
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({ status: 400, description: 'Input Validation Error' })
@ApiResponse({ status: 401, description: 'Missing Authorization' })
@Controller('v1/payment')
export class PaymentMethodController {
  constructor(
    private readonly paymentMethodService: PaymentMethodService,
    private readonly logger: BaseLoggerService,
  ) {
    logger.classContext = this.constructor.name;
  }

  @ApiOperation({ summary: 'Create Payment Method' })
  @Post('/create')
  async createPaymentMethod(
    @Body() body: PaymentMethodRequest,
  ): Promise<ResponseDto<PaymentMethod>> {
    return await this.paymentMethodService.createPaymentMethod(body);
  }

  @ApiOperation({ summary: 'Delete Payment Method' })
  @Post('/delete')
  async deletePaymentMethod(
    @Body() body: DeletePaymentMethodRequest,
  ): Promise<ResponseDto<PaymentMethod>> {
    return await this.paymentMethodService.deletePaymentMethod(body);
  }

  @ApiOperation({ summary: 'List Payment Methods' })
  @Get('/list')
  async listPaymentMethods(
    @Query('user_id') userId: string,
    @Query('user_email') userEmail: string,
  ): Promise<ResponseDto<PaymentMethod[]>> {
    return await this.paymentMethodService.listPaymentMethods(
      userId,
      userEmail,
    );
  }
}
