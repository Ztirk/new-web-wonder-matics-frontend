import { ApiStatus } from "./apiStatus";

export interface SendContactShape {
  contact_id: number | string;
  contact_code_id: number | null;
  value: string;
}

export interface SendContact {
  contact: SendContactShape;
}
export interface ContactIterate {
  RowNum: number | null;
  contact_id: number;
  contact_type: string;
  value: string;
  owner_name: string;
}

export interface StoringIndividualAddress {
  contact_id: number;
  value: string;
  contact_code_id: number;
  contact_type: string;
  owner_name: string;
  owner_type: string;
}
export interface ContactDisplay {
  contact: ContactIterate[] | [];
}

export interface Contact extends ApiStatus {
  response: {
    contact: ContactIterate[];
  };
}

export interface IndividualContact extends ApiStatus {
  response: {
    contact: StoringIndividualAddress;
  };
}
