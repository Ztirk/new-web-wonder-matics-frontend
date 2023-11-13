import { ApiStatus } from "./apiStatus";

export interface SendCustomer {
  customer: {
    customer_id: number | string;
    customer_name: string;
    customer_type_code_id: number | null;
    sales_type_code_id: number | null;
  };
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
export interface CustomerDisplay {
  customer: CustomerIterate[] | [];
}

export interface StoringIndividualCustomer {
  customer_id: number;
  customer_name: string;
  customer_type: string;
  customer_type_code_id: string;
  sales_type: string;
  sales_type_code_id: string;
}

export interface Customer extends ApiStatus {
  response: {
    count_data: number;
    customer: CustomerIterate[] | [];
  };
}

export interface IndividualCustomer extends ApiStatus {
  response: {
    customer: StoringIndividualCustomer;
  };
}
