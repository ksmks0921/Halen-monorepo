import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import {
  CartItemRequest,
  CartRequest,
  CartSearchRequest,
} from '../../models/requests/cart.request';
import { CartService } from './cart.service';
import { ResponseDto } from '@halen/shared';
import { Cart } from '../../models/cart.interface';
import { BaseLoggerService } from '../../services/base-logger/base-logger.service';

@ApiTags('Cart')
@ApiResponse({ status: 200, description: 'Success' })
@ApiResponse({ status: 400, description: 'Input Validation Error' })
@ApiResponse({ status: 401, description: 'Missing Authorization' })
@Controller('v1/cart')
export class CartController {
  constructor(
    private readonly cartService: CartService,
    private readonly logger: BaseLoggerService,
  ) {
    logger.classContext = this.constructor.name;
  }

  @ApiOperation({ summary: 'Create Cart' })
  @Post('/create')
  async createCart(@Body() body: CartRequest): Promise<ResponseDto<Cart>> {
    return await this.cartService.createCart(body);
  }

  @ApiOperation({ summary: 'Add Items to Cart' })
  @Post('/add')
  async addCartItem(@Body() body: CartItemRequest): Promise<ResponseDto<Cart>> {
    return await this.cartService.addCartItem(body);
  }

  @ApiOperation({ summary: 'Remove Items from Cart' })
  @Post('/remove')
  async removeCartItems(
    @Body() body: CartItemRequest,
  ): Promise<ResponseDto<Cart>> {
    return await this.cartService.removeCartItems(body);
  }

  @ApiOperation({ summary: 'Retrieve Cart' })
  @Get('/retrieve')
  async retrieveCart(
    @Query() query: CartSearchRequest,
  ): Promise<ResponseDto<Cart>> {
    return await this.cartService.retrieveCart(query);
  }

  @ApiOperation({ summary: 'List Carts' })
  @Get('/list')
  async listCarts(
    @Query() query: CartSearchRequest,
  ): Promise<ResponseDto<Cart[]>> {
    return await this.cartService.listCarts(query);
  }
}
