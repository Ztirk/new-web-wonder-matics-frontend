import { ApiStatus } from "./apiStatus";

export interface AddressShape {
  address: [AddressIterate] | [];
}

export interface AddressIterate {
  RowNum: number;
  address_id: number;
  location: string;
  address_type: string;
}

export interface Address extends ApiStatus {
  response: {
    address: AddressShape;
  };
}

export interface IndividualAddress extends ApiStatus {
  response:
    | {
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
          address_type: [
            { address_type_code_id: number; address_type: string }
          ];
        };
      }
    | Address;
}
