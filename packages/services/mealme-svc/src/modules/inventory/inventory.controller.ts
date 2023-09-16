import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ResponseDto } from '@halen/shared';
import { InventorySearchRequest } from '../../models/requests/inventory-search.request';
import { InventoryService } from './inventory.service';
import { InventorySearchResponse } from '../../models/responses/inventory-search.response';
import { ProductDetailsRequest } from '../../models/requests/product-details.request';
import { ProductDetails } from '../../models/product.interface';
import { BaseLoggerService } from '../../services/base-logger/base-logger.service';

@ApiTags('Inventory')
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({ status: 400, description: 'Input Validation Error' })
@ApiResponse({ status: 401, description: 'Missing Authorization' })
@Controller('v1/inventory')
export class InventoryController {
  constructor(
    private readonly inventoryService: InventoryService,
    private readonly logger: BaseLoggerService,
  ) {
    logger.classContext = this.constructor.name;
  }

  @ApiOperation({ summary: 'Get Inventory Details' })
  @Get('/details')
  async getInventoryDetails(
    @Query() query: InventorySearchRequest,
  ): Promise<ResponseDto<InventorySearchResponse>> {
    return await this.inventoryService.getInventoryDetails(query);
  }

  @ApiOperation({ summary: 'Get Product Details' })
  @Get('/product')
  async getProductDetails(
    @Query() query: ProductDetailsRequest,
  ): Promise<ResponseDto<ProductDetails>> {
    return await this.inventoryService.getProductDetails(query);
  }
}
