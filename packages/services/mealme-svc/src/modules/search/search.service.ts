import { Injectable } from '@nestjs/common';

import { ResponseDto } from '@halen/shared';
import { InventoryService } from '../inventory/inventory.service';
import { MealmeAxiosClientService } from '../../gateways/mealme-axios-client/mealme-axios-client.service';
import { Product } from '../../models/product.interface';
import { InventorySearchRequest } from '../../models/requests/inventory-search.request';
import { ProductSearchRequest } from '../../models/requests/product-search.request';
import { StoreSearchRequest } from '../../models/requests/store-search.request';
import { StoreSearchResponse } from '../../models/responses/store-search.response';
import { ProductSearchResponse } from '../../models/responses/product-search.response';
import { Store } from '../../models/store.interface';
import { InventorySearchResponse } from '../../models/responses/inventory-search.response';

@Injectable()
export class SearchService {
  constructor(
    private readonly mealMeClientService: MealmeAxiosClientService,
    private readonly inventoryService: InventoryService,
  ) {}

  async searchStores(query: StoreSearchRequest): Promise<ResponseDto<Store[]>> {
    let response: ResponseDto<Store[]>;
    try {
      if (query.maximum_miles === undefined) {
        query.maximum_miles = 2;
      }
      const storeList: StoreSearchResponse =
        await this.mealMeClientService.get<StoreSearchResponse>(
          'search/store/v3',
          query,
        );
      response = {
        status: true,
        statusCode: 200,
        message: 'Stores Searched Successfully',
        data: storeList.stores,
        nextPage: storeList.next_page,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Store Search Failed',
        error: error.message,
      };
    }
    return response;
  }

  async getStoreDetails(storeIds: string): Promise<ResponseDto<Store[]>> {
    let response: ResponseDto<Store[]>;
    try {
      const storeList: StoreSearchResponse =
        await this.mealMeClientService.get<StoreSearchResponse>(
          `utils/store_lookup/v2?store_ids=${storeIds}`,
          null,
        );
      response = {
        status: true,
        statusCode: 200,
        message: 'Store Details Received Successfully',
        data: storeList.stores,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Store Details Failed to Receive',
        error: error.message,
      };
    }
    return response;
  }

  async searchProducts(
    query: ProductSearchRequest,
  ): Promise<ResponseDto<Product[]>> {
    let response: ResponseDto<Product[]>;

    try {
      if (query.maximum_miles === undefined) {
        query.maximum_miles = 2;
      }

      if (query.store_id && !query.menu_id) {
        // get menu_id from store inventory
        const inventoryQuery: InventorySearchRequest =
          new InventorySearchRequest();
        inventoryQuery.store_id = query.store_id;
        const inventoryResult = await this.inventoryService.getInventoryDetails(
          inventoryQuery,
        );
        const inventory: InventorySearchResponse = Array.isArray(
          inventoryResult.data,
        )
          ? inventoryResult.data[0]
          : inventoryResult.data;
        // assigne menu_id to product serach request
        query.menu_id = inventory.menu_id;
      }

      const productList: ProductSearchResponse =
        await this.mealMeClientService.get<ProductSearchResponse>(
          'search/product/v4',
          query,
        );

      if (query.menu_id) {
        //exclude store information
        productList.products.forEach((element) => {
          delete element.store;
        });
      }

      response = {
        status: true,
        statusCode: 200,
        message: 'Product Searched Successfully',
        data: productList.products,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Product Search Failed',
        error: error.message,
      };
    }
    return response;
  }
}
