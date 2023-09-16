import { CartItemRequest, CartRequest } from '../requests/cart.request';
import { OrderFinalizeRequest, OrderRequest } from '../requests/order.request';
import {
  DeletePaymentMethodRequest,
  PaymentMethodRequest,
} from '../requests/payment-method.request';

export type MealmePostRequestType =
  | CartRequest
  | OrderRequest
  | OrderFinalizeRequest
  | CartItemRequest
  | PaymentMethodRequest
  | DeletePaymentMethodRequest;
