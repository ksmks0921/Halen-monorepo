import { ResponseDto } from '@halen/shared';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Body, Controller, HttpException, Post, Headers } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WaitlistRegistrationDto } from './dtos/insights.dto';
import { InsightsService } from './insights.service';
import { BaseLoggerService } from '../../services/base-logger/base-logger.service';

@ApiTags('Insights')
@Controller('v1/insights')
export class InsightsController {
  constructor(
    private readonly logger: BaseLoggerService,
    private readonly insightsService: InsightsService,
    private readonly httpService: HttpService,
    protected readonly configService: ConfigService
  ) {
    logger.classContext = this.constructor.name;
  }

  @Post()
  async save(@Headers() headers: Headers, @Body() body: WaitlistRegistrationDto): Promise<ResponseDto<void>> {
    this.logger.log(`Save Waitlist Information..: ${JSON.stringify(headers)}`);
    const url = `https://www.google.com/recaptcha/api/siteverify?secret=${this.configService.get<string>(
      'GOOGLE_CAPTCHA_SECRET'
    )}&response=${headers['recaptcha_token']}`;
    return await this.httpService.axiosRef
      .post(url)
      .then(async (response) => {
        if (response.data.success) {
          // save waitlist data
          await this.insightsService.createWaitlist(body);
          this.logger.log('Successfully saved waitlist');
          return {
            status: true,
            message: 'Successfully saved waitlist registration',
          };
        } else {
          this.logger.error(`Error on validating reCapture`, JSON.stringify(response.data));
          throw new Error(`Error on validating reCapture`);
        }
      })
      .catch(async (error) => {
        this.logger.error(`Catch Error on validating reCapture`, JSON.stringify(error));
        throw new HttpException(`Error on validating reCapture`, 500);
      });
  }
}
