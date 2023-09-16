import { Injectable } from '@nestjs/common';
import { MealmeAxiosClientService } from '../../gateways/mealme-axios-client/mealme-axios-client.service';
import {
  CartItemRequest,
  CartRequest,
  CartSearchRequest,
} from '../../models/requests/cart.request';
import { ResponseDto } from '@halen/shared';
import { Cart } from '../../models/cart.interface';
import { BaseLoggerService } from '../../services/base-logger/base-logger.service';

@Injectable()
export class CartService {
  constructor(
    private readonly mealMeClientService: MealmeAxiosClientService,
    private readonly logger: BaseLoggerService,
  ) {
    logger.classContext = this.constructor.name;
  }

  async createCart(body: CartRequest): Promise<ResponseDto<Cart>> {
    let response: ResponseDto<Cart>;
    try {
      const cart: Cart = await this.mealMeClientService.post<Cart>(
        'cart/create',
        body,
      );
      response = {
        status: true,
        statusCode: 200,
        message: 'Cart Created Succesfully',
        data: cart,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Create Cart Failed',
        error: error.message,
      };
    }
    return response;
  }

  async addCartItem(body: CartItemRequest): Promise<ResponseDto<Cart>> {
    let response: ResponseDto<Cart>;
    try {
      const cart: Cart = await this.mealMeClientService.post<Cart>(
        'cart/add',
        body,
      );
      response = {
        status: true,
        statusCode: 200,
        message: 'Cart Items Added Successfully',
        data: cart,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Cart Items Failed to Add',
        error: error.message,
      };
    }
    return response;
  }

  async removeCartItems(body: CartItemRequest): Promise<ResponseDto<Cart>> {
    let response: ResponseDto<Cart>;
    try {
      const cart: Cart = await this.mealMeClientService.post<Cart>(
        'cart/remove',
        body,
      );
      response = {
        status: true,
        statusCode: 200,
        message: 'Cart Items Removed Succesfully',
        data: cart,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Cart Items Failed to Remove',
        error: error.message,
      };
    }
    return response;
  }

  async retrieveCart(query: CartSearchRequest): Promise<ResponseDto<Cart>> {
    let response: ResponseDto<Cart>;
    try {
      const cart: Cart = await this.mealMeClientService.get<Cart>(
        'cart/retrieve',
        query,
      );
      response = {
        status: true,
        statusCode: 200,
        message: 'Cart Retrieved Succesfully',
        data: cart,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Cart Failed to Retrieve',
        error: error.message,
      };
    }
    return response;
  }

  async listCarts(query: CartSearchRequest): Promise<ResponseDto<Cart[]>> {
    let response: ResponseDto<Cart[]>;
    try {
      const carts: Cart[] = await this.mealMeClientService.get<Cart[]>(
        'cart/list',
        query,
      );
      response = {
        status: true,
        statusCode: 200,
        message: 'Carts Listed Succesfully',
        data: carts,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Carts Failed to List',
        error: error.message,
      };
    }
    return response;
  }
}
