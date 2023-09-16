import { ApiProperty } from '@nestjs/swagger';

export class StoreSearchRequest {
  @ApiProperty({
    description:
      "The search query. Try leaving this empty to browse what's available!",
    required: false,
  })
  query: string;

  @ApiProperty({
    description: 'The latitude of the user.',
    required: true,
    default: '37.7786357',
  })
  latitude: string;

  @ApiProperty({
    description:
      'The longitude of the user. In the US, this value is negative.',
    required: true,
    default: '-122.3918135',
  })
  longitude: string;

  @ApiProperty({
    description:
      'The type of stores to search from. Can be restaurant, grocery, or empty string for both.',
    required: false,
  })
  store_type: string;

  @ApiProperty({
    description:
      "The maximum amount, in Dollars, that the user has specified they'd like to spend on this meal. Required for applying a sort.",
    required: false,
  })
  budget: string;

  @ApiProperty({
    description:
      'Street number of the user. Required if fetch_quotes=true and pickup=true.',
    required: false,
  })
  user_street_num: string;

  @ApiProperty({
    description:
      'Street name of the user. Required if fetch_quotes=true and pickup=true.',
    required: false,
  })
  user_street_name: string;

  @ApiProperty({
    description:
      'City of the user. Required if fetch_quotes=true and pickup=true.',
    required: false,
  })
  user_city: string;

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
      'If true, filter stores to only those that offer pickup. If false, filter to only stores with delivery.',
    required: false,
  })
  pickup: string;

  @ApiProperty({
    description:
      'Whether or not to fetch realtime delivery/pickup quotes. Note that this being true greatly increases response time. Note that if this is true and the query is also empty then store hours will not be in the response.',
    required: false,
  })
  fetch_quotes: string;

  @ApiProperty({
    description: 'Timeout to apply if fetch_quotes = true, in seconds.',
    required: false,
  })
  timeout: string;

  @ApiProperty({
    description:
      'ex: 2 (which would signal $$). Cost for the average meal. This can represent 1 ($) for the cheapest stores or 4 ($$$$) for the most expensive stores.',
    required: false,
  })
  dollar_signs: string;

  @ApiProperty({
    description: 'The cuisine to filter stores by.',
    required: false,
  })
  cuisine: string;

  @ApiProperty({
    description: 'ex: 4.6. The minimum rating allowed.',
    required: false,
  })
  minimum_rating: string;

  @ApiProperty({
    description:
      'ex: 0. The page to fetch, to retrieve more results. This is returned as next_page in the response.',
    required: false,
  })
  page: string;

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
      'The sort type. Can be cheapest, fastest, rating, distance or the default relevance.',
    required: false,
  })
  sort: string;

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
    description:
      'Whether to focus search on store name or item name. Can be item, store, or left empty for both.',
    required: false,
  })
  search_focus: string;

  @ApiProperty({
    description:
      'Whether to return one default quote_id for the best quote and menu or to return all quote_ids.',
    required: false,
  })
  default_quote: string;

  @ApiProperty({
    description: 'Whether to autocomplete the query.',
    required: false,
  })
  autocomplete: string;

  @ApiProperty({
    description: 'Whether to include store hours in utc time.',
    required: false,
  })
  include_utc_hours: string;
}
