import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseLoggerService } from '../services/base-logger/base-logger.service';
import { DynamodbClientService } from '../services/dynamodb-client/dynamodb-client.service';
import { MealmeSearchRequestType } from '../models/constants/search-request.type';
import { MealmeApiRequest } from '../models/requests/mealme-api.request';
import { UtilsService } from '../utils/utils.service';

@Injectable()
export class MealmeAxiosClientService {
  // These Tokens and API URLs has to move to ENV / Secrets Manager
  mealMeBasePathUrl = '';
  mealMeIdToken = '';
  traceId = '';

  constructor(
    private readonly httpService: HttpService,
    private readonly utilService: UtilsService,
    private readonly configService: ConfigService,
    private readonly dynamoDBClient: DynamodbClientService,
    private readonly logger: BaseLoggerService,
  ) {
    logger.classContext = this.constructor.name;
    this.mealMeBasePathUrl = this.configService.get<string>(
      'MEALME_API_BASE_URL',
    );
    this.mealMeIdToken = this.configService.get<string>('MEALME_API_ID_TOKEN');
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async get(path: string, query: MealmeSearchRequestType): Promise<any> {
    const fullUrl = `${
      this.mealMeBasePathUrl
    }${path}${this.utilService.buildHttpQuery(query)}`;

    const requestApi: MealmeApiRequest = new MealmeApiRequest();
    requestApi.apiName = 'Mealme';
    requestApi.requestAt = new Date().toISOString();
    requestApi.requestUrl = fullUrl;
    requestApi.requestMethod = 'GET';

    return await this.httpService.axiosRef
      .get(fullUrl, {
        headers: {
          'Id-Token': this.mealMeIdToken,
          Accept: 'application/json',
        },
      })
      .then(async (response) => {
        // log 200 success
        requestApi.responseAt = new Date().toISOString();
        requestApi.responseStatus = '200';
        await this.dynamoDBClient.writeDataToDynamoDB({
          TableName: this.utilService.getTableNameByENV('apiAuditTable'),
          Item: requestApi,
        });

        return response.data;
      })
      .catch(async (error) => {
        // log any error response
        requestApi.responseAt = new Date().toDateString();
        requestApi.errorMessage = error.response?.data?.error;
        requestApi.responseStatus = '500';
        this.logger.error(
          `Error in axios get : ${JSON.stringify(requestApi)}`,
          '',
        );
        throw new HttpException(
          error.response?.data?.error,
          error.response?.status,
        );
      });
  }
}
