import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MealmeSearchRequestType } from '../models/constants/search-request.type';

@Injectable()
export class UtilsService {
  constructor(private readonly configService: ConfigService) {}

  getTableNameByENV(tableName: string): string {
    return `${tableName}-${this.configService.get<string>('ENVIRONMENT')}`;
  }

  buildHttpQuery(queryParams: MealmeSearchRequestType): string {
    const queryString = Object.keys(queryParams)
      .filter((key) => queryParams[key] !== undefined)
      .map((key) => `${key}=${queryParams[key]}`)
      .join('&');

    if (queryString) {
      return `?${queryString}`;
    } else {
      return queryString;
    }
  }
}
