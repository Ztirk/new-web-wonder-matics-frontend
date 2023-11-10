import { Address, IndividualAddress } from "./addressType";
import { Contact, IndividualContact } from "./contactType";
import { Customer, IndividualCustomer } from "./customerType";
import { DeviceSerial, IndividualDeviceSerial } from "./deviceSerialType";
import { Device, IndividualDevice } from "./deviceType";
import { Fleet, IndividualFleet } from "./fleetType";
import { IndividualPerson, Person } from "./personType";
import { IndividualVehicle, Vehicle } from "./vehicleType";

export type Data =
  | Customer
  | Person
  | Address
  | Contact
  | Vehicle
  | Fleet
  | Device
  | DeviceSerial;

export type IndividualData = IndividualCustomer &
  IndividualPerson &
  IndividualAddress &
  IndividualContact &
  IndividualVehicle &
  IndividualFleet &
  IndividualDevice &
  IndividualDeviceSerial &
  Customer &
  Person &
  Address &
  Contact &
  Vehicle &
  Fleet &
  Device &
  DeviceSerial;
