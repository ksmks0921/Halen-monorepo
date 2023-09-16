import { Address } from './address.interface';
import { LocalHours } from './local-hours.interface';
import { StoreType } from './constants/store.type';

export interface Store {
  _id: string;
  name: string;
  phone_number: number;
  address: Address;
  type: StoreType;
  description: string;
  local_hours: LocalHours;
  cuisines: string[];
  food_photos: string[];
  logo_photos: string[];
  store_photos: string[];
  dollar_signs: number;
  pickup_enabled: boolean;
  delivery_enabled: boolean;
  is_open: boolean;
  offers_first_party_delivery: boolean;
  offers_third_party_delivery: boolean;
  miles: number;
  weighted_rating_value: number;
  aggregated_rating_count: number;
  supports_upc_codes: boolean;
}
