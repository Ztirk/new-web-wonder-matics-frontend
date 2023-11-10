import { ApiStatus } from "./apiStatus";
export interface SendAddress {
  address: {
    address_id: number | string;
    name: string;
    house_no: string;
    village_no: string;
    alley: string;
    road: string;
    sub_district: string;
    district: string;
    province: string;
    postal_code: string;
    address_type: number[];
    address_typeDelete: number[];
  };
}
export interface AddressIterate {
  RowNum: number;
  address_id: number;
  location: string;
  address_type: string;
}

export interface AddressDisplay {
  address: AddressIterate[] | [];
}

export interface StoringIndividualAddress {
  name: string;
  house_no: string;
  village_no: string;
  alley: string;
  road: string;
  sub_district: string;
  district: string;
  province: string;
  postal_code: string;
  address_type: [{ address_type_code_id: number; address_type: string }];
}

export interface Address extends ApiStatus {
  response: {
    count_data: number;
    address: AddressIterate[] | [];
  };
}

export interface IndividualAddress extends ApiStatus {
  response: {
    address: StoringIndividualAddress;
  };
}
