import { ApiProperty } from '@nestjs/swagger';
import { Store } from './store.interface';

export interface Product {
  product_id: string;
  item_name: string;
  image: string;
  description: string;
  category: string;
  price: number;
  formatted_price: string;
  upc_codes: string[];
  unit_size: string;
  unit_of_measurement: string;
  should_fetch_customizations: boolean;
  menu_id: string;
  grand_total: number;
  store: Store;
}

interface CustomizationOption {
  name: string;
  price: number;
  customizations: CustomizationOption[];
  min_qty: number;
  max_qty: number;
  conditional_price: number;
  formatted_price: string;
  default_qty: number;
  option_id: string;
}

interface Customization {
  name: string;
  min_choice_options: number;
  max_choice_options: number;
  options: CustomizationOption[];
  customization_id: string;
}

export class ProductDetails {
  @ApiProperty({
    description: 'The name of the product',
    type: String,
    required: true,
  })
  name: string;

  @ApiProperty({
    description: 'The price of the product in cents',
    type: Number,
    required: true,
  })
  price: number;

  @ApiProperty({
    description: 'The quantity available of the product',
    type: Number,
    required: false,
  })
  qty_available?: number;

  @ApiProperty({
    description: 'The unit size of the product',
    type: String,
    required: false,
  })
  unit_size?: string;

  @ApiProperty({
    description: 'The unit of measurement for the product',
    type: String,
    required: false,
  })
  unit_of_measurement?: string;

  @ApiProperty({
    description: 'The description of the product',
    type: String,
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'The original price of the product in cents',
    type: Number,
    required: true,
  })
  original_price: number;

  @ApiProperty({
    description: 'The image URL of the product',
    type: String,
    required: true,
  })
  image: string;

  @ApiProperty({
    description: 'The minimum price of the product in cents',
    type: Number,
    required: true,
  })
  min_price: number;

  @ApiProperty({
    description: 'The formatted price of the product',
    type: String,
    required: true,
  })
  formatted_price: string;

  @ApiProperty({
    description: 'The product ID of the product',
    type: String,
    required: true,
  })
  product_id: string;

  @ApiProperty({
    description: 'The thumbnail image URL of the product',
    type: String,
    required: true,
  })
  thumbnail_image: string;

  @ApiProperty({
    description: 'Whether the product is alcoholic or not',
    type: Boolean,
    required: true,
  })
  is_alcoholic: boolean;

  @ApiProperty({
    description: 'The UPC code of the product',
    type: String,
    required: false,
  })
  upc_code?: string;

  @ApiProperty({
    description: 'Whether the product supports image scaling or not',
    type: Boolean,
    required: true,
  })
  supports_image_scaling: boolean;

  @ApiProperty({
    description: 'Whether the product is available or not',
    type: Boolean,
    required: true,
  })
  is_available: boolean;

  @ApiProperty({
    description: 'The customizations available for the product',
    type: [],
    required: false,
  })
  customizations?: Customization[];
}
