export interface ResponseDto<T> {
  status: boolean;
  statusCode?: number;
  message: string;
  error?: string;
  data?: T | T[];
  nextPage?: number;
}
