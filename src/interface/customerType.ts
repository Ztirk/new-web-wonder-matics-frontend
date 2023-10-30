import { ApiStatus } from "./apiStatus";

export interface CustomerShape {
  customer: [CustomerIterate] | [];
}

export interface CustomerIterate {
  RowNum: number;
  customer_id: number;
  customer_name: string;
  customer_type_code_id: number;
  email: string;
  sales_type_code_id: number;
  telephone: string;
}
export interface Customer extends ApiStatus {
  response: {
    count_data: number;
    customer: CustomerShape;
  };
}

export interface IndividualCustomer extends ApiStatus {
  response:
    | {
        customer: {
          customer_id: number;
          customer_name: string;
          customer_type: string;
          customer_type_code_id: string;
          sales_type: string;
          sales_type_code_id: string;
        };
      }
    | Customer;
}
