import { ApiStatus } from "./apiStatus";

export interface SendDocument {
  document: {
    document_id: number | string;
    document_code_id: number | null;
    document_name: string;
    customer_id: number | null;
    person_id: number | null;
    address_id: number | null;
    vehicle_id: number | null;
    owner_type_code_id: number | null;
  };
}

export interface Document extends ApiStatus {
  response: {
    document:
      | {
          RowNum: number | null;
          document_id: number;
          document_type: string;
          document_name: string;
          owner_name: string;
        }[]
      | [];
    count_data: number;
  };
}

export interface IndividualDocument extends ApiStatus {
  response: {
    document: {
      document_id: number;
      document_code_id: number;
      document_name: string;
      create_date: string;
      owner_type: string;
      owner_name: string;
    };
  };
}
