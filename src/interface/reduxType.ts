import { Address, SendAddress } from "./addressType";
import { Contact, SendContact } from "./contactType";
import { Customer, SendCustomer } from "./customerType";
import { DeviceSerial } from "./deviceSerialType";
import { Device } from "./deviceType";
import { Fleet, SendFleet } from "./fleetType";
import { Person, SendPerson } from "./personType";
import { SendVehicle, Vehicle } from "./vehicleType";
import { Document } from "./documentType";
import { Card } from "./cardType";

export interface ActionBy {
  action_by: number;
}

export type DisplayData = Customer["response"] &
  Person["response"] &
  Address["response"] &
  Contact["response"] &
  Vehicle["response"] &
  Fleet["response"] &
  Device["response"] &
  DeviceSerial["response"] &
  Document["response"] &
  Card["response"];

export interface AddNewOAddExist {
  customerNew: SendCustomer[];
  customerExist: number[];
  addressNew: SendAddress["address"][];
  addressExist: number[];
  contactNew: SendContact["contact"][];
  contactExist: number[];
  personNew: SendPerson["person"][];
  personExist: number[];
  vehicleNew: SendVehicle["vehicle"][];
  vehicleExist: number[];
  fleetNew: SendFleet["fleet"][];
  fleetExist: number[];
  documentCodeNew: number[];
  cardNew: number[];
}

export interface Delete {
  customerDelete: number[];
  personDelete: number[];
  addressDelete: number[];
  contactDelete: number[];
  vehicleDelete: number[];
  fleetDelete: number[];
  documentDelete: number[];
  cardDelete: number[];
}

export interface Memo {
  customer_id: number[];
  person_id: number[];
  role_code_id: number[];
  address_id: number[];
  address_type_code_id: number[];
  fleet_id: number[];
  vehicle_id: number[];
  device_id: number[];
  device_serial_id: number[];
  contact_id: number[];
  document_id: number[];
  card_id: number[];
}

export interface AddExistPopUp {
  backdrop: boolean;
  type:
    | "person"
    | "vehicle"
    | "fleet"
    | "contact"
    | "address"
    | "customer"
    | "contact";
}
