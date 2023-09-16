import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  ListOrdersRequest,
  OrderFinalizeRequest,
  OrderRequest,
} from '../../models/requests/order.request';
import { ResponseDto } from '@halen/shared';
import { OrderService } from './order.service';
import { BaseLoggerService } from '../../services/base-logger/base-logger.service';
import { Order } from '../../models/order.interface';

@ApiTags('Order')
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({ status: 400, description: 'Input Validation Error' })
@ApiResponse({ status: 401, description: 'Missing Authorization' })
@Controller('v1/order')
export class OrderController {
  constructor(
    private readonly orderService: OrderService,
    private readonly logger: BaseLoggerService,
  ) {
    logger.classContext = this.constructor.name;
  }

  @ApiOperation({ summary: 'Create Order' })
  @Post('/create')
  async createOrder(@Body() body: OrderRequest): Promise<ResponseDto<Order>> {
    return await this.orderService.createOrder(body);
  }

  @ApiOperation({ summary: 'Finalize Order' })
  @Post('/finalize')
  async finalizeOrder(
    @Body() body: OrderFinalizeRequest,
  ): Promise<ResponseDto<Order>> {
    return await this.orderService.finalizeOrder(body);
  }

  @ApiOperation({ summary: 'List Orders' })
  @Get('/list')
  async listOrders(
    @Query() query: ListOrdersRequest,
  ): Promise<ResponseDto<Order[]>> {
    return await this.orderService.listOrders(query);
  }
}
