import { AudienceType } from '../../constants';
import { BusinessType } from '../../constants/insights';

export interface WaitlistRegistration {
  firstName: string;
  lastName?: string;
  email: string;
  phone: string;
  street1?: string;
  city: string; // TODO: enums
  county?: string; // TODO: enums
  state: string; // TODO: enums
  country: 'USA'; // TODO: enums
  audienceType: AudienceType;
  investorDetails: InvestorDetails;
  franchiseDetails: FranchiseDetails;
  driverDetails: null;
  businessDetail: BusinessDetails;
  createdAt: string;
}

export interface InvestorDetails {
  amount: number;
}

export interface FranchiseDetails {
  investmentAmount: InvestmentAmount;
  investmentTimeframe: InvestmentTimeframe;
  areaDetails: AreaDetails;
  existingFranchiseOwnership: ExistingFranchiseOwnership;
}

export interface InvestmentAmount {
  from: number;
  to: number;
}

export interface InvestmentTimeframe {
  begin: number; // counts months
  end: number;
}

export interface AreaDetails {
  firstCountyChoice: string; // TODO: enums
  secondCountyChoice: string; // TODO: enums
  other: string; // same as the county, but on waitlist
}

export interface ExistingFranchiseOwnership {
  currentlyOwns: boolean;
  franchiseId: string;
  notes?: string;
}

export interface BusinessDetails {
  businessType: BusinessType;
}
