import { ApiProperty } from '@nestjs/swagger';

export class CardDetails {
  @ApiProperty({
    type: 'number',
    required: true,
  })
  card_number: number;

  @ApiProperty({
    type: 'number',
    required: true,
  })
  expiration_year: number;

  @ApiProperty({
    type: 'number',
    required: true,
  })
  expiration_month: number;

  @ApiProperty({
    type: 'number',
    required: true,
  })
  cvc: number;
}

export class PaymentMethodRequest {
  @ApiProperty({
    type: 'string',
    required: true,
  })
  user_email: string;

  @ApiProperty({
    type: 'string',
    required: true,
  })
  user_id: string;

  @ApiProperty({
    type: CardDetails,
    required: true,
  })
  payment_method: CardDetails;
}

export class DeletePaymentMethodRequest {
  @ApiProperty({
    type: String,
    description: 'The email of the user to create a payment method for.',
    required: true,
  })
  user_email: string;

  @ApiProperty({
    type: String,
    description:
      'The unique user ID of the user to create a payment method for.',
    required: true,
  })
  user_id: string;

  @ApiProperty({
    type: String,
    description: 'The ID of the payment method to delete.',
    required: true,
  })
  payment_method_id: string;
}
