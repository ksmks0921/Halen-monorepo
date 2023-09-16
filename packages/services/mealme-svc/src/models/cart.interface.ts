export interface Cart {
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
  cart_id: string;
}

export interface AddedFee {
  added_fee_flat: number;
  added_fee_percent: number;
}

export interface EmailReceiptSpecifications {
  prices_marked: boolean;
  added_fee: AddedFee;
  unify_service_fee: boolean;
  disable_email: boolean;
}

export interface SelectedOption {
  name: string;
  price: number;
  quantity: number;
  default_qty: number;
  option_id: string;
  customizations: unknown[];
}

export interface Item {
  name: string;
  base_price: number;
  quantity: number;
  image: string;
  description: string;
  product_id: string;
  selected_options: SelectedOption[];
  notes: string;
}
