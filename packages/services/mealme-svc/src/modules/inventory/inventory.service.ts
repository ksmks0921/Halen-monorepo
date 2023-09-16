import { Injectable } from '@nestjs/common';

import { ResponseDto } from '@halen/shared';
import { MealmeAxiosClientService } from '../../gateways/mealme-axios-client/mealme-axios-client.service';
import { InventorySearchRequest } from '../../models/requests/inventory-search.request';
import { InventorySearchResponse } from '../../models/responses/inventory-search.response';
import { ProductDetails } from '../../models/product.interface';
import { ProductDetailsRequest } from '../../models/requests/product-details.request';

@Injectable()
export class InventoryService {
  constructor(private readonly mealMeClientService: MealmeAxiosClientService) {}

  async getInventoryDetails(
    query: InventorySearchRequest,
  ): Promise<ResponseDto<InventorySearchResponse>> {
    let response: ResponseDto<InventorySearchResponse>;
    try {
      const inventory =
        await this.mealMeClientService.get<InventorySearchResponse>(
          'details/inventory',
          query,
        );
      response = {
        status: true,
        statusCode: 200,
        message: 'Inventory Details Retrieved Successfully',
        data: inventory,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Inventory Details Failed to Retrieve',
        error: error.message,
      };
    }
    return response;
  }

  async getProductDetails(
    query: ProductDetailsRequest,
  ): Promise<ResponseDto<ProductDetails>> {
    let response: ResponseDto<ProductDetails>;
    try {
      const product = await this.mealMeClientService.get<ProductDetails>(
        'details/product',
        query,
      );
      response = {
        status: true,
        statusCode: 200,
        message: 'Product Details Retrieved Successfully',
        data: product,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Product Details Failed to Retrieve',
        error: error.message,
      };
    }
    return response;
  }
}
