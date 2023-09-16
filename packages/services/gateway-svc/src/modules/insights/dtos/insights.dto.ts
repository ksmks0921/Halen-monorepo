import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, IsMobilePhone } from 'class-validator';

import type {
  BusinessDetails,
  FranchiseDetails,
  WaitlistRegistration,
  AudienceType,
  InvestorDetails,
} from '@halen/shared';

export class WaitlistRegistrationDto implements WaitlistRegistration {
  @IsString() id: string;
  @IsString() firstName: string;
  @IsString() lastName?: string;
  @IsEmail() email: string;
  @IsMobilePhone() phone: string;
  @IsString() street1?: string;
  @IsString() city: string;
  @IsString() county?: string;
  @IsString() state: string;
  country: 'USA';
  audienceType: AudienceType;
  franchiseDetails: FranchiseDetails;
  investorDetails: InvestorDetails;
  @ApiProperty({
    description: 'This always returns null for downward compatibility',
    type: String, // needed to avoid swagger error
  })
  driverDetails: null;
  businessDetail: BusinessDetails;
  @IsString() createdAt: string;
}
