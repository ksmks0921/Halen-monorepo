export interface Category {
  name: string;
  subcategory_id: string;
  menu_item_list: MenuItemList[];
}

export interface MenuItemList {
  name: string;
  price: number;
  qty_available: unknown; // TODO: dont use any
  unit_size: unknown; // TODO: dont use any
  unit_of_measurement: string;
  description: string;
  min_price: number;
  image?: string;
  customizations: unknown[]; // TODO: dont use any
  formatted_price: string;
  product_id: string;
  thumbnail_image?: string;
  should_fetch_customizations: boolean;
  supports_image_scaling: boolean;
}
