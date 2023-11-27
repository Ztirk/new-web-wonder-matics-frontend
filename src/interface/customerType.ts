import { ApiStatus } from "./apiStatus";

export interface CustomerSelector extends ApiStatus {
  response: { customers: { customer_id: number; customer_name: string }[] };
}

export interface SendCustomer {
  customer: {
    customer_id: number | string;
    customer_name: string;
    customer_type_code_id: number | null;
    sales_type_code_id: number | null;
  };
}

export interface Customer extends ApiStatus {
  response: {
    count_data: number;
    customer:
      | {
          RowNum: number;
          customer_id: number;
          customer_name: string;
          customer_type_code_id: number;
          email: string;
          sales_type_code_id: number;
          telephone: string;
        }[]
      | [];
  };
}

export interface IndividualCustomer extends ApiStatus {
  response: {
    customer: {
      customer_id: number;
      customer_name: string;
      customer_type: string;
      customer_type_code_id: number;
      sales_type: string;
      sales_type_code_id: number;
    };
  };
}
