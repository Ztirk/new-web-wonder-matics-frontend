import { ApiStatus } from "./apiStatus";

export interface SendContactNew {
  contactNew: {
    contact_code_id: number;
    value: string;
  }[];
}
export interface SendContact {
  contact: {
    contact_id: number | string;
    contact_code_id: number | null;
    value: string;
    customer_id: number | null;
    person_id: number | null;
    owner_type_code_id: number | null;
  };
}

export interface Contact extends ApiStatus {
  response: {
    contact:
      | {
          RowNum: number | null;
          contact_id: number;
          contact_type: string;
          value: string;
          owner_name: string;
        }[]
      | [];
    count_data: number;
  };
}

export interface IndividualContact extends ApiStatus {
  response: {
    contact: {
      contact_id: number;
      value: string;
      contact_code_id: number;
      contact_type: string;
      owner_name: string;
      owner_type: string;
      person_id: number | null;
      customer_id: number | null;
    };
  };
}
