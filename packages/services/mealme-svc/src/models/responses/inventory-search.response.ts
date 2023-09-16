import { Category } from '../inventory.interface';

export interface InventorySearchResponse {
  menu_id: string;
  categories: Category[];
}
