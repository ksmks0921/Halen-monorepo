import { Store } from '../store.interface';

export interface StoreSearchResponse {
  stores: Store[];
  next_page: number;
}
