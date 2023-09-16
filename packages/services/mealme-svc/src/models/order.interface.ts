import { EmailReceiptSpecifications, Item } from './cart.interface';

export interface Order {
  order_id: string;
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
