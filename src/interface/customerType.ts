import { ApiStatus } from "./apiStatus";

export interface Customer extends ApiStatus {
  response: {
    count_data: number;
    customer:
      | [
          {
            RowNum: number;
            customer_id: number;
            customer_name: string;
            customer_type_code_id: number;
            email: string;
            sales_type_code_id: number;
            telephone: string;
          }
        ]
      | [];
  };
}

export interface IndividualCustomer extends ApiStatus {
  response:
    | {
        customer?: {
          RowNum: number;
          customer_id: number;
          customer_name: string;
          email: string;
          telephone: string;
        };
      }
    | Customer;
}
