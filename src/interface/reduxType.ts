export interface setContact {
  contact_code_id: number;
  value: string;
}

export interface putPostContact {
  contact_code_id: number;
  value: string;
}

export interface DisplayData {
  customer:
    | [
        {
          RowNum: number;
          customer_id: number;
          customer_name: string;
          email: string;
          telephone: string;
        }
      ]
    | [];
  address:
    | [{ address_id: number; location: string; address_type: string }]
    | [];
  contact:
    | [
        {
          uuid: string;
          contact_id: number;
          value: string;
          contact_type: string;
          owner_name: string;
        }
      ]
    | [];
  person:
    | [
        {
          person_id: number;
          fullname: string;
          mobile: string;
          email: string;
          description: string;
          role: string;
        }
      ]
    | [];
  vehicle: [];
  fleet: [];
}

export interface EditedCustomer {
  update_by: number;
  customer: {
    customer_name: string;
    sales_type_code_id: number;
    customer_type_code_id: number;
  };
  contact: [{ contact_code_id: number; value: string }];
  contactDelete: [contact_id: string];
  addressNew: [
    {
      name: string;
      house_no: string;
      village_no: string;
      alley: string;
      road: string;
      sub_distinct: string;
      district: string;
      province: string;
      postal_code: string;
      address_type_code_id: number;
    }
  ];
  addressExist: [address_id: number];
  addressDelete: [address_id: number];
  personNew: [
    {
      person: {
        nickname: string;
        title_code_id: number;
        firstname: string;
        lastname: string;
        description: string;
      };
      contact: [{ contact_code_id: number; value: string }];
      addressNew: [
        {
          name: string;
          house_no: string;
          village_no: string;
          alley: string;
          road: string;
          sub_distinct: string;
          district: string;
          province: string;
          postal_code: string;
          address_type_code_id: number;
        }
      ];
      addressExist: [address_id: number];
    }
  ];
  personExist: [person_id: number];
  personDelete: [person_id: number];
}

export interface AddNewCustomer {
  create_by: number;
  customer: {
    customer_name: string;
    sales_type_code_id: number;
    customer_type_code_id: number;
  };
  contact: [{ contact_id: number; value: string; contact_type: string }] | [];
  contactDelete: [contact_id: string];
  addressNew: [
    {
      name: string;
      house_no: string;
      village_no: string;
      alley: string;
      road: string;
      sub_distinct: string;
      district: string;
      province: string;
      postal_code: string;
      address_type_code_id: number;
    }
  ];
  addressExist: [address_id: number];
  addressDelete: [address_id: number];
  personNew: [
    {
      person: {
        nickname: string;
        title_code_id: number;
        firstname: string;
        lastname: string;
        description: string;
      };
      contact: [{ contact_code_id: number; value: string }];
      addressNew: [
        {
          name: string;
          house_no: string;
          village_no: string;
          alley: string;
          road: string;
          sub_distinct: string;
          district: string;
          province: string;
          postal_code: string;
          address_type_code_id: number;
        }
      ];
      addressExist: [address_id: number];
    }
  ];
  personExist: [person_id: number];
  personDelete: [person_id: number];
}
export interface AddNewPerson {}

export interface EditPerson {}
