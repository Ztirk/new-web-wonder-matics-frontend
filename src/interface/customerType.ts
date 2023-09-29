export interface ApiStatus {
  status: 0 | 1;
  message: string | "ok";
}

export interface Customer extends ApiStatus {
  response: {
    count_data: number;
    customer: [
      {
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

export interface IndividualData extends ApiStatus {
  response: {
    count_data: number;
    customer: {
      customer_id: number;
      customer_name: string;
      customer_type_code_id: number;
      email: string;
      sales_type_code_id: number;
      telephone: string;
      sales_type: string;
      customer_type: string;
    };
    person: [
      {
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
        contact_id: number;
        contact_type: string;
        value: string;
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

export interface CustomerMasterCodeType extends ApiStatus {
  response: [
    [
      {
        code_id: number;
        category: string;
        class: string;
        value: string;
      }
    ]
  ];
}

export interface EditedData {
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

export interface AddNewData {
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
