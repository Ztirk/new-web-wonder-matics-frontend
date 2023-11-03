import { ApiStatus } from "./apiStatus";

export interface CustomerIterate {
  RowNum: number;
  customer_id: number;
  customer_name: string;
  customer_type_code_id: number;
  email: string;
  sales_type_code_id: number;
  telephone: string;
}

export interface SendCustomer {
  customer: {
    customer_name: string;
    customer_type_code_id: number;
    sales_type_code_id: number;
  };
}

export interface CustomerDisplay {
  customer: CustomerIterate[] | [];
}

export interface Customer extends ApiStatus {
  response: {
    count_data: number;
    customer: CustomerIterate[] | [];
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
