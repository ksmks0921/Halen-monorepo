import { CartSearchRequest } from '../requests/cart.request';
import { InventorySearchRequest } from '../requests/inventory-search.request';
import { ListOrdersRequest } from '../requests/order.request';
import { ProductDetailsRequest } from '../requests/product-details.request';
import { ProductSearchRequest } from '../requests/product-search.request';
import { StoreSearchRequest } from '../requests/store-search.request';

export type MealmeSearchRequestType =
  | InventorySearchRequest
  | StoreSearchRequest
  | ProductSearchRequest
  | CartSearchRequest
  | ProductDetailsRequest
  | ListOrdersRequest;
