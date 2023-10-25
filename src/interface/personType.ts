import { ApiStatus } from "./customerType";

export interface Person extends ApiStatus {
  response: {
    count_data: number;
    person: [
      {
        RowNum: number;
        person_id: number;
        fullname: string;
        mobile: string;
        email: string;
        description: string;
        role: string;
      }
    ];
  };

  count_data: number;
}

export interface IndividualPerson extends ApiStatus {
  response: {
    person: [
      {
        person_id: number;
        firstname: string;
        lastname: string;
        nickname: string;
        title_code_id: string;
        title_type: string;
        description: string;
        role: [
          {
            role_code_id: number;
            role_type: string;
          }
        ];
      }
    ];
    customer: [
      {
        customer_id: string;
        customer_name: string;
        telephone: string;
        email: string;
      }
    ];
    contact: [
      {
        contact_id: number;
        value: string;
        contact_type: string;
      }
    ];
    address: [
      {
        address_id: number;
        location: string;
        address_type: string;
      }
    ];
  };
}
