import { ApiProperty } from '@nestjs/swagger';

export class InventorySearchRequest {
  @ApiProperty({
    description: 'The ID if the store to fetch a menu for',
    required: true,
  })
  store_id: string;

  @ApiProperty({
    description:
      'The optional Subcategory ID, needed for some requests if the menu is too large.',
    required: false,
  })
  subcategory_id: string;

  @ApiProperty({
    description: 'true for pickup quotes, false for delivery quotes.',
    required: false,
  })
  pickup: boolean;

  @ApiProperty({
    description: 'Whether to include the realtime delivery/pickup quote.',
    required: false,
  })
  include_quote: boolean;

  @ApiProperty({
    description:
      'The preferred quote for order fulfillment. Can be default, cheapest, fastest, first_available, cheapest_inventory, or cheapest_for_store.',
    required: false,
  })
  quote_preference: string;

  @ApiProperty({
    description: 'Whether to include customizations.',
    required: false,
  })
  include_customizations: boolean;

  @ApiProperty({
    description:
      "The maximum amount, in Dollars, that the user has specified they'd like to spend on an order. Used when quote_preference=cheapest.",
    required: false,
  })
  budget: number;

  @ApiProperty({
    description: 'The latitude of the user.',
    required: true,
    default: '37.7786357',
  })
  user_latitude: number;

  @ApiProperty({
    description:
      'The longitude of the user. In the US, this value is negative.',
    required: true,
    default: '-122.3918135',
  })
  user_longitude: number;

  @ApiProperty({
    description: 'Street name of the user.',
    required: false,
  })
  user_street_num: string;

  @ApiProperty({
    description: 'City of the user.',
    required: false,
  })
  user_street_name: string;

  @ApiProperty({
    description: 'State abbreviation of the user.',
    required: false,
  })
  user_state: string;

  @ApiProperty({
    description: 'Zipcode of the user.',
    required: false,
  })
  user_zipcode: string;

  @ApiProperty({
    description: 'Country of the user. Can be US or CA.',
    required: false,
  })
  user_country: string;

  @ApiProperty({
    description:
      'The desired height to scale product images to. If supplied, then image_width will be ignored. The thumbnail_image property in the response will represent the scaled image URL, if supports_image_scaling=true.',
    required: false,
  })
  image_height: number;

  @ApiProperty({
    description:
      'The desired width to scale product images to. If image_height is supplied, then image_width will be ignored. The thumbnail_image property in the response will represent the scaled image URL, if supports_image_scaling=true.',
    required: false,
  })
  image_width: number;

  @ApiProperty({
    description:
      'The ID of the menu to fetch. If supplied, the store_id and quote_preference parameters will be ignored.',
    required: false,
  })
  menu_id: string;
}
