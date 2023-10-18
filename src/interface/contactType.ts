import { ApiStatus } from "./dataType";

export interface Contact extends ApiStatus {
  response: {
    contact: [
      {
        contact_id: number;
        value: string;
        contact_type: string;
        owver_name: string;
      }
    ];
  };
}
