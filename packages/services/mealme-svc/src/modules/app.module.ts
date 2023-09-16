import { Module } from '@nestjs/common';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { UtilsService } from '../utils/utils.service';
import { HttpModule } from '@nestjs/axios';
import { MealmeAxiosClientService } from '../gateways/mealme-axios-client/mealme-axios-client.service';
import { ConfigModule } from '@nestjs/config';
import { InventoryController } from './inventory/inventory.controller';
import { InventoryService } from './inventory/inventory.service';
import { DynamodbClientService } from '../services/dynamodb-client/dynamodb-client.service';
import { BaseLoggerService } from '../services/base-logger/base-logger.service';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { PaymentMethodController } from './payment-method/payment-method.controller';
import { PaymentMethodService } from './payment-method/payment-method.service';
import envConfig from '../config/env.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
    HttpModule,
  ],
  controllers: [
    AppController,
    SearchController,
    InventoryController,
    CartController,
    OrderController,
    PaymentMethodController,
  ],
  providers: [
    AppService,
    SearchService,
    UtilsService,
    MealmeAxiosClientService,
    InventoryService,
    DynamodbClientService,
    BaseLoggerService,
    CartService,
    OrderService,
    PaymentMethodService,
  ],
})
export class AppModule {}
