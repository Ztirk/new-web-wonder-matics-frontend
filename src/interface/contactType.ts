import { ApiStatus } from "./apiStatus";

export interface ContactShape {
  contact: [ContactIterate] | [];
}

export interface ContactIterate {
  RowNum: number;
  contact_id: number;
  contact_type: string;
  value: string;
  owner_name: string;
}
export interface Contact extends ApiStatus {
  response: {
    contact: ContactShape;
  };
}

export interface IndividualContact extends ApiStatus {
  response:
    | {
        contact: {
          contact_id: number;
          value: string;
          contact_code_id: number;
          contact_type: string;
          owner_name: string;
          owner_type: string;
        };
      }
    | IndividualContact;
}
