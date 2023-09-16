import { ApiProperty } from '@nestjs/swagger';
import { EmailReceiptSpecifications, Item } from '../cart.interface';

export class OrderRequest {
  place_order: boolean;
  items: Item[];
  pickup: boolean;
  driver_tip_cents: number;
  user_latitude: number;
  user_longitude: number;
  user_street_num: string;
  user_street_name: string;
  user_city: string;
  user_state: string;
  user_country: string;
  user_zipcode: string;
  user_dropoff_notes: string;
  user_name: string;
  user_email: string;
  user_phone: number;
  user_id: string;
  charge_user: boolean;
  include_final_quote: boolean;
  disable_sms: boolean;
  email_receipt_specifications: EmailReceiptSpecifications;
  favorited: boolean;
  enable_substitution: boolean;
  autofill_selected_options: boolean;
}

export class OrderFinalizeRequest {
  order_id: string;
}

export class ListOrdersRequest {
  @ApiProperty({
    description:
      'The order_id for the order to fetch, this takes precedence over all filters below',
    type: String,
  })
  order_id: string;

  @ApiProperty({
    description:
      'The start date (MM/DD/YYYY) to fetch orders for, starting from 12:00am UTC, inclusive',
    type: String,
  })
  start_date: string;

  @ApiProperty({
    description:
      'The end date (MM/DD/YYYY) to fetch orders for, ending at 11:59pm UTC, inclusive',
    type: String,
  })
  end_date: string;

  @ApiProperty({
    description:
      'The order status type to filter by. Can be unplaced, awaiting_confirmation, in_progress, canceled, completed, or empty to fetch all orders.',
    type: String,
  })
  status: string;

  @ApiProperty({
    description:
      'Whether to return orders that are favorited or not favorited. Note: unplaced orders that are not favorited will never be returned to prevent overload.',
    type: Boolean,
  })
  favorited: boolean;

  @ApiProperty({
    description: 'The user ID to filter by',
    type: String,
  })
  user_id: string;
}
