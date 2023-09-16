import { ApiProperty } from '@nestjs/swagger';

// Request body
export class PaymentMethod {
  @ApiProperty({
    type: String,
    description: 'The email of the user to create a payment method for.',
    example: 'jane@example.com',
  })
  user_email: string;

  @ApiProperty({
    type: String,
    description:
      'The unique user ID of the user to create a payment method for.',
    example: '123456789',
  })
  user_id: string;

  @ApiProperty({
    type: String,
    description: 'The ID of the payment method to delete.',
    example: 'pm_123456789',
  })
  payment_method_id: string;
}

// Response body
export class PaymentMethodDto {
  @ApiProperty({
    type: String,
    description: 'The payment method ID.',
    example: 'pm_123456789',
  })
  id: string;

  @ApiProperty({
    type: Number,
    description: 'The payment method expiration month.',
    example: 12,
  })
  exp_month: number;

  @ApiProperty({
    type: Number,
    description: 'The payment method expiration year.',
    example: 2024,
  })
  exp_year: number;

  @ApiProperty({
    type: String,
    description: 'The last 4 digits of the payment method.',
    example: '4242',
  })
  last4: string;

  @ApiProperty({
    type: String,
    description: 'The payment method network.',
    example: 'Visa',
  })
  network: string;
}
