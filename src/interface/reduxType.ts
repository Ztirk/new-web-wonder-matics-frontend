import { AddressDisplay, SendAddress, SendAddressShape } from "./addressType";
import { ContactDisplay, SendContact, SendContactShape } from "./contactType";
import { CustomerDisplay, SendCustomer } from "./customerType";
import { DeviceSerialDisplay } from "./deviceSerialType";
import { DeviceDisplay } from "./deviceType";
import { FleetDisplay, SendFleet, SendFleetShape } from "./fleetType";
import { PersonDisplay, SendPerson } from "./personType";
import { SendVehicle, SendVehicleShape, VehicleDisplay } from "./vehicleType";

export interface setContact {
  contact_code_id: number;
  value: string;
}

export interface putPostContact {
  contact_code_id: number;
  value: string;
}

export type DisplayData = CustomerDisplay &
  PersonDisplay &
  AddressDisplay &
  ContactDisplay &
  VehicleDisplay &
  FleetDisplay &
  DeviceSerialDisplay &
  DeviceDisplay;

export interface AddNewOAddExist {
  customerNew: SendCustomer[];
  customerExist: number[];
  addressNew: SendAddressShape[];
  addressExist: number[];
  contactNew: SendContactShape[];
  contactExist: number[];
  personNew: SendPerson[];
  personExist: number[];
  vehicleNew: SendVehicleShape[];
  vehicleExist: number[];
  fleetNew: SendFleetShape[];
  fleetExist: number[];
}

export interface Delete {
  customerDelete: number[];
  personDelete: number[];
  addressDelete: number[];
  contactDelete: number[];
  vehicleDelete: number[];
  fleetDelete: number[];
}

export interface Memo {
  customer_id: number[];
  person_id: number[];
  role_id: number[];
  role_code_id: number[];
  address_id: number[];
  address_type_id: number[];
  address_type_code_id: number[];
  fleet_id: number[];
  vehicle_id: number[];
  device_id: number[];
  device_serial_id: number[];
  contact_id: number[];
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
