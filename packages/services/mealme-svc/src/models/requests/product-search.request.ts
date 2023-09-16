import { ApiProperty } from '@nestjs/swagger';
import { StoreProductSortType } from '../constants/store-product-sort.type';
import { StoreType } from '../constants/store.type';

export class ProductSearchRequest {
  @ApiProperty({
    description:
      'The product search query. If empty, this endpoint will let you browse products available for ordering nearby.!',
    required: false,
  })
  query: string;

  @ApiProperty({
    description:
      "Optional. If supplied, query will be ignored, and this endpoint will search for all matching products close to the user's location within the maximum_miles radius. A matching product is one that perfectly matches the same brand (i.e. Safeway) and product (i.e. Almond Breeze Unsweetened Original Almondmilk). Note: product_id is retrieved from /groceries/details/products",
    required: false,
  })
  product_id: string;

  @ApiProperty({
    description: 'The store_id from which to search for products within.',
    required: false,
  })
  store_id: string;

  @ApiProperty({
    description:
      'The store from which to search for products within, across all stores with same name',
    required: false,
  })
  store_name: string;

  @ApiProperty({
    description:
      'The type of stores to search from. Can be grocery, restaurant, or empty string for both.',
    required: false,
  })
  store_type: StoreType;

  @ApiProperty({
    description: 'The ID of the menu from which to search for products within.',
    required: false,
  })
  menu_id: string;

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
    description:
      'If true, filter stores to only those that offer pickup. If false, filter to only stores with delivery.',
    required: false,
  })
  pickup: boolean;

  @ApiProperty({
    description:
      "The maximum amount, in Dollars, that the user has specified they'd like to spend on this meal. Required for applying a sort.",
    required: false,
  })
  budget: number;

  @ApiProperty({
    description:
      'Example: 66538783,031146250103. The UPC codes to search for, delimited by comma. Takes precedence over the other ways you can search, query and product_id.',
    required: false,
  })
  upc_codes: string;

  @ApiProperty({
    description: 'The cuisine to filter products by.',
    required: false,
  })
  cuisine: string;

  @ApiProperty({
    description:
      'Street name of the user. Required if fetch_quotes=true and pickup=true.',
    required: false,
  })
  user_street_num: string;

  @ApiProperty({
    description:
      'City of the user. Required if fetch_quotes=true and pickup=true.',
    required: false,
  })
  user_street_name: string;

  @ApiProperty({
    description:
      'State abbreviation of the user. Required if fetch_quotes=true and pickup=true.',
    required: false,
  })
  user_state: string;

  @ApiProperty({
    description:
      'Zipcode of the user. Required if fetch_quotes=true and pickup=true.',
    required: false,
  })
  user_zipcode: string;

  @ApiProperty({
    description:
      'Country of the user. Can be US or CA. Required if fetch_quotes=true and pickup=true.',
    required: false,
  })
  user_country: string;

  @ApiProperty({
    description:
      'Whether or not to fetch realtime delivery/pickup quotes. Note that this being true greatly increases response time. Note that if this is true and the query is also empty then store hours will not be in the response.',
    required: false,
  })
  fetch_quotes: boolean;

  @ApiProperty({
    description:
      'The sort type. Can be cheapest, fastest, rating, distance or the default relevance.',
    required: false,
  })
  sort: StoreProductSortType;

  @ApiProperty({
    description:
      'Whether to perform a lenient search that returns relevant products that may not exactly match the query text.',
    required: false,
  })
  fuzzy_search: boolean;

  @ApiProperty({
    description: 'Whether or not to return only open restaurants.',
    required: false,
  })
  open: boolean;

  @ApiProperty({
    description: 'ex: 1.5. The maximum distance allowed, in miles.',
    required: false,
  })
  maximum_miles: number;

  @ApiProperty({
    description: 'The minimum latitude for a "Search In This Area".',
    required: false,
  })
  min_lat: number;

  @ApiProperty({
    description: 'The maximum latitude for a "Search In This Area".',
    required: false,
  })
  max_lat: number;

  @ApiProperty({
    description: 'The minimum longitude for a "Search In This Area".',
    required: false,
  })
  min_lon: number;

  @ApiProperty({
    description: 'The maximum longitude for a "Search In This Area".',
    required: false,
  })
  max_lon: number;

  @ApiProperty({
    description:
      'ex: 2 (which would signal $$). Cost for the average meal. This can represent 1 ($) for the cheapest stores or 4 ($$$$) for the most expensive stores.',
    required: false,
  })
  dollar_signs: number;

  @ApiProperty({
    description: 'ex: 4.6. The minimum rating allowed.',
    required: false,
  })
  minimum_rating: number;

  @ApiProperty({
    description: 'Whether to autocomplete the query',
    required: false,
  })
  autocomplete: boolean;

  @ApiProperty({ description: 'ex: 0. The page to fetch', required: false })
  page: number;
}
