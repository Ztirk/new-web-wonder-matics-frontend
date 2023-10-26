import { ApiStatus } from "./apiStatus";

export interface Data extends ApiStatus {
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
}

export interface IndividualData extends ApiStatus {
  response: {
    count_data: number;
    customer:
      | {
          customer_id: number;
          customer_name: string;
          customer_type_code_id: number;
          email: string;
          sales_type_code_id: number;
          telephone: string;
          sales_type: string;
          customer_type: string;
        }
      | [
          {
            RowNum: number;
            customer_id: number;
            customer_name: string;
            telephone: string;
            email: string;
          }
        ];
    person:
      | {
          person_id: number;
          firstname: string;
          lastname: string;
          nickname: string;
          title_code_id: number;
          title_type: string;
          description: string;
        }
      | [
          {
            RowNum: number;
            person_id: number;
            fullname: string;
            email: string;
            mobile: string;
            description: string;
            role: string;
          }
        ];
    contact: [
      {
        RowNum: number;
        contact_id: number;
        contact_type: string;
        value: string;
        owner_name: string;
      }
    ];
    address: [
      {
        RowNum: number;
        address_id: number;
        location: string;
        address_type: string;
      }
    ];
    vehicle: [
      {
        RowNum: number;
        vehicle_id: number;
        license_plate: string;
        frame_no: string;
        vehicle_type: string;
        model: string;
      }
    ];
  };
}


