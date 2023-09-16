import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { AppController } from './app/app.controller';
import { AppService } from './app/app.service';
import { BaseLoggerService } from '../services/base-logger/base-logger.service';
import { CartController } from './cart/cart.controller';
import { CartService } from './cart/cart.service';
import { DynamodbClientService } from '../services/dynamodb-client/dynamodb-client.service';
import { InventoryController } from './inventory/inventory.controller';
import { InventoryService } from './inventory/inventory.service';
import { MealmeAxiosClientService } from '../gateways/mealme-axios-client/mealme-axios-client.service';
import { OrderController } from './order/order.controller';
import { OrderService } from './order/order.service';
import { PaymentMethodController } from './payment-method/payment-method.controller';
import { PaymentMethodService } from './payment-method/payment-method.service';
import { SearchController } from './search/search.controller';
import { SearchService } from './search/search.service';
import { UtilsService } from '../utils/utils.service';
import envConfig from '../config/env.config';

export const SharedTestingModule = Test.createTestingModule({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [envConfig],
    }),
  ],
  controllers: [
    AppController,
    CartController,
    InventoryController,
    OrderController,
    SearchController,
    PaymentMethodController,
  ],
  providers: [
    AppService,
    BaseLoggerService,
    CartService,
    DynamodbClientService,
    InventoryService,
    OrderService,
    SearchService,
    PaymentMethodService,
    MealmeAxiosClientService,
    UtilsService,
  ],
}).compile();
