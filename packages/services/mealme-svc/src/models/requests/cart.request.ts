import { EmailReceiptSpecifications, Item } from '../cart.interface';

export class CartRequest {
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
  disable_sms: boolean;
  email_receipt_specifications: EmailReceiptSpecifications;
  autofill_selected_options: boolean;
  store_id: string;
}

export class CartItemRequest {
  cart_id: string;
  items: Item[];
}

export class CartSearchRequest {
  cart_id: string;
  user_id: string;
}
