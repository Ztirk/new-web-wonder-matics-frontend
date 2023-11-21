import { ApiStatus } from "./apiStatus";

export interface ProvinceSelector extends ApiStatus {
  response: {
    provinces: { province_th: string }[];
  };
}
export interface DistrictSelector extends ApiStatus {
  response: {
    districts: { district_th: string }[];
  };
}
export interface SubDistrictSelector extends ApiStatus {
  response: {
    sub_districts: {
      address_model_id: number;
      sub_district_th: string;
      postal_code: string;
    }[];
  };
}

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
    address_type_code_id: number[];
    address_type_code_idDelete: number[];
  };
}

export interface Address extends ApiStatus {
  response: {
    count_data: number;
    address:
      | {
          RowNum: number | null;
          address_id: number;
          location: string;
          address_type: string;
        }[]
      | [];
  };
}

export interface IndividualAddress extends ApiStatus {
  response: {
    address: {
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
    };
  };
}
