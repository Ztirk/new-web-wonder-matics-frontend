import { ApiStatus } from "./apiStatus";

export interface AddExistPopUp extends ApiStatus {
  response: {
    customer?: [
      {
        RowNum: number;
        customer_id: number;
        customer_name: string;
        email: string;
        telephone: string;
      }
    ];

    address?: [{ address_id: number; location: string; address_type: string }];

    contact?:
      | [
          {
            uuid: string;
            contact_id: number;
            value: string;
            contact_type: string;
            owner_name: string;
          }
        ];

    person?:
      | [
          {
            person_id: number;
            fullname: string;
            mobile: string;
            email: string;
            description: string;
            role: string;
          }
        ];

    vehicle?: [];
    fleet?: [];
  };
}
