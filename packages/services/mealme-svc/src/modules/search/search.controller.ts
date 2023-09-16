import { Controller, Get, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

import { ResponseDto } from '@halen/shared';
import { Product } from '../../models/product.interface';
import { ProductSearchRequest } from '../../models/requests/product-search.request';
import { StoreSearchRequest } from '../../models/requests/store-search.request';
import { SearchService } from './search.service';
import { Store } from '../../models/store.interface';

@ApiTags('Search')
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({ status: 400, description: 'Input Validation Error' })
@ApiResponse({ status: 401, description: 'Missing Authorization' })
@Controller('v1/search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @ApiOperation({ summary: 'Search for Stores' })
  @Get('/store')
  async searchStores(
    @Query() query: StoreSearchRequest,
  ): Promise<ResponseDto<Store[]>> {
    return await this.searchService.searchStores(query);
  }

  @ApiOperation({ summary: 'Get Store Details' })
  @Get('/store/details')
  async getStoreDetails(
    @Query('store_ids') storeIds: string,
  ): Promise<ResponseDto<Store[]>> {
    return await this.searchService.getStoreDetails(storeIds);
  }

  @ApiOperation({ summary: 'Search for Products' })
  @Get('/product')
  async searchProducts(
    @Query() query: ProductSearchRequest,
  ): Promise<ResponseDto<Product[]>> {
    return await this.searchService.searchProducts(query);
  }
}
