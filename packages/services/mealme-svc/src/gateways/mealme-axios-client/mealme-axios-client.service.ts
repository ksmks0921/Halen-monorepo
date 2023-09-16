import { HttpService } from '@nestjs/axios';
import { HttpException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { BaseLoggerService } from '../../services/base-logger/base-logger.service';
import { DynamodbClientService } from '../../services/dynamodb-client/dynamodb-client.service';
import { MealmePostRequestType } from '../../models/constants/post-request.type';
import { MealmeSearchRequestType } from '../../models/constants/search-request.type';
import { MealmeApiRequest } from '../../models/requests/mealme-api.request';
import { UtilsService } from '../../utils/utils.service';

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

  // GET
  async get<T>(path: string, query: MealmeSearchRequestType): Promise<T> {
    let fullUrl = `${this.mealMeBasePathUrl}${path}`;

    if (query) {
      fullUrl += this.utilService.buildHttpQuery(query);
    }

    return await this.httpService.axiosRef
      .get(fullUrl, {
        headers: {
          'Id-Token': this.mealMeIdToken,
          Accept: 'application/json',
        },
      })
      .then(async (response) => {
        return response.data;
      })
      .catch(async (error) => {
        this.logger.error(
          `Error in axios get : ${fullUrl} : ${JSON.stringify(
            error.response.data,
          )}`,
          '',
        );
        throw new HttpException(
          error.response?.data?.error,
          error.response?.status,
        );
      });
  }

  // POST
  async post<T>(path: string, body: MealmePostRequestType): Promise<T> {
    const fullUrl = `${this.mealMeBasePathUrl}${path}`;

    return await this.httpService.axiosRef
      .post(fullUrl, body, {
        headers: {
          'Id-Token': this.mealMeIdToken,
          Accept: 'application/json',
        },
      })
      .then(async (response) => {
        return response.data;
      })
      .catch(async (error) => {
        this.logger.error(
          `Error in axios post : ${fullUrl} : ${JSON.stringify(
            body,
          )} : ${JSON.stringify(error.response.data)}`,
          '',
        );
        throw new HttpException(
          error.response?.data?.error,
          error.response?.status,
        );
      });
  }

  private async insertAuditRecord(
    fullUrl: string,
    responseStatus: string,
    errorMessage: string,
  ) {
    const requestApi: MealmeApiRequest = new MealmeApiRequest();
    requestApi.apiName = 'Mealme';
    requestApi.requestAt = new Date().toISOString();
    requestApi.requestUrl = fullUrl;
    requestApi.requestMethod = 'GET';
    requestApi.responseAt = new Date().toISOString();
    requestApi.responseStatus = responseStatus;
    requestApi.errorMessage = errorMessage;
    await this.dynamoDBClient.writeDataToDynamoDB({
      TableName: this.utilService.getTableNameByENV('apiAuditTable'),
      Item: requestApi,
    });
    return requestApi;
  }
}
