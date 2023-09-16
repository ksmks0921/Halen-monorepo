import { v4 as uuid } from 'uuid';

export class MealmeApiRequest {
  id: string = uuid();
  apiName: string;
  requestUrl: string;
  requestMethod: string;
  requestAt: string;
  responseStatus: string;
  responseAt: string;
  errorMessage: string;
}
