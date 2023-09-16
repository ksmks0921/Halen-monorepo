import { Injectable } from '@nestjs/common';
import { BaseLoggerService } from '../../services/base-logger/base-logger.service';
import { MealmeAxiosClientService } from '../../gateways/mealme-axios-client/mealme-axios-client.service';
import {
  DeletePaymentMethodRequest,
  PaymentMethodRequest,
} from '../../models/requests/payment-method.request';
import { ResponseDto } from '@halen/shared';
import { PaymentMethod } from '../../models/payment-method.interface';

@Injectable()
export class PaymentMethodService {
  constructor(
    private readonly mealMeClientService: MealmeAxiosClientService,
    private readonly logger: BaseLoggerService,
  ) {
    logger.classContext = this.constructor.name;
  }

  async createPaymentMethod(
    body: PaymentMethodRequest,
  ): Promise<ResponseDto<PaymentMethod>> {
    let response: ResponseDto<PaymentMethod>;
    try {
      const paymentMethodResponse =
        await this.mealMeClientService.post<PaymentMethod>(
          'payment/create',
          body,
        );
      response = {
        status: true,
        statusCode: 200,
        message: 'Payment Method Created Succesfully',
        data: paymentMethodResponse,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Payment Method Failed to Create',
        error: error.message,
      };
    }
    return response;
  }

  async deletePaymentMethod(
    body: DeletePaymentMethodRequest,
  ): Promise<ResponseDto<PaymentMethod>> {
    let response: ResponseDto<PaymentMethod>;
    try {
      const paymentMethodResponse: PaymentMethod =
        await this.mealMeClientService.post<PaymentMethod>(
          'payment/delete',
          body,
        );
      response = {
        status: true,
        statusCode: 200,
        message: 'Payment Method Deleted Succesfully',
        data: paymentMethodResponse,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Payment Method Failed to Delete',
        error: error.message,
      };
    }
    return response;
  }

  async listPaymentMethods(
    userId: string,
    userEmail: string,
  ): Promise<ResponseDto<PaymentMethod[]>> {
    let response: ResponseDto<PaymentMethod[]>;
    try {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const paymentMethodList = await this.mealMeClientService.get<any>(
        `payment/list?user_id=${userId}&user_email=${userEmail}`,
        null,
      );
      response = {
        status: true,
        statusCode: 200,
        message: 'Payment Methods Listed Successfully',
        data: paymentMethodList.payment_methods,
      };
    } catch (error) {
      response = {
        status: false,
        statusCode: 500,
        message: 'Payment Methods Failed to List',
        error: error.message,
      };
    }
    return response;
  }
}
