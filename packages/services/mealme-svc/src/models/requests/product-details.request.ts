import { ApiProperty } from '@nestjs/swagger';

export class ProductDetailsRequest {
  @ApiProperty({
    example: '12345',
    description:
      'The Product ID given for this store by the Restaurant Menu API or Grocery Products API',
    required: true,
  })
  product_id: string;

  @ApiProperty({
    example: 'false',
    description: 'true for pickup quotes, false for delivery quotes.',
    type: Boolean,
  })
  pickup: boolean;

  @ApiProperty({
    example: 'false',
    description: 'Whether to include the realtime delivery/pickup quote.',
    type: Boolean,
  })
  include_quote: boolean;

  @ApiProperty({
    example: '37.7786357',
    description:
      'The latitude of the user. Strongly recommended for realtime price and availability.',
    type: Number,
  })
  user_latitude: number;

  @ApiProperty({
    example: '-122.3918135',
    description:
      'The longitude of the user. Strongly recommended for realtime price and availability. In the US, this value is negative.',
    type: Number,
  })
  user_longitude: number;

  @ApiProperty({
    example: '188',
    description: 'Street number of the user.',
    type: String,
  })
  user_street_num: string;

  @ApiProperty({
    example: 'King Street',
    description: 'Street name of the user.',
    type: String,
  })
  user_street_name: string;

  @ApiProperty({
    example: 'San Francisco',
    description: 'City of the user.',
    type: String,
  })
  user_city: string;

  @ApiProperty({
    example: 'CA',
    description: 'State abbreviation of the user.',
    type: String,
  })
  user_state: string;

  @ApiProperty({
    example: '94107',
    description: 'Zipcode of the user.',
    type: String,
  })
  user_zipcode: string;

  @ApiProperty({
    example: 'US',
    description: 'Country of the user. Can be US or CA.',
    type: String,
  })
  user_country: string;

  @ApiProperty({
    example: 'false',
    description: 'Whether to include a description of included customizations.',
    type: Boolean,
  })
  include_default_customization_description: boolean;

  @ApiProperty({
    example: '300',
    description:
      "The desired height to scale the product's image to. If supplied, then image_width will be ignored. The thumbnail_image property in the response will represent the scaled image URL, if supports_image_scaling=true.",
    type: Number,
  })
  image_height: number;

  @ApiProperty({
    example: '300',
    description:
      "The desired width to scale product's image to. If image_height is supplied, then image_width will be ignored. The thumbnail_image property in the response will represent the scaled image URL, if supports_image_scaling=true.",
    type: Number,
  })
  image_width: number;
}
