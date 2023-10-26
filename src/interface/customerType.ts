import { ApiStatus } from "./apiStatus";

export interface Data extends ApiStatus {
  response: {
    count_data: number;
    customer: [
      {
        RowNum: number;
        customer_id: number;
        customer_name: string;
        customer_type_code_id: number;
        email: string;
        sales_type_code_id: number;
        telephone: string;
      }
    ];
  };
}
