import { ApiStatus } from "./apiStatus";

export interface BillingLocation extends ApiStatus {
  response: {
    billing_location_id: number;
    name: string;
    location: string;
    tin: string;
    fullname: string;
    mobile: string;
  };
  count_date: number;
}

export interface IndividualBillingLocation extends ApiStatus {}
