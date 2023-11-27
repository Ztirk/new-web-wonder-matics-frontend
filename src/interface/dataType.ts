import { Address, IndividualAddress } from "./addressType";
import { Card, IndividualCard } from "./cardType";
import { Contact, IndividualContact } from "./contactType";
import { Customer, IndividualCustomer } from "./customerType";
import { DeviceSerial, IndividualDeviceSerial } from "./deviceSerialType";
import { Device, IndividualDevice } from "./deviceType";
import { IndividualDocument, Document } from "./documentType";
import { Fleet, IndividualFleet } from "./fleetType";
import { IndividualPerson, Person } from "./personType";
import { Installation } from "./reduxType";
import { IndividualVehicle, Vehicle } from "./vehicleType";

export type Data = Customer &
  Person &
  Address &
  Contact &
  Vehicle &
  Fleet &
  Device &
  DeviceSerial &
  Card &
  Document &
  Installation;

export type IndividualData = IndividualCustomer &
  IndividualPerson &
  IndividualAddress &
  IndividualContact &
  IndividualVehicle &
  IndividualFleet &
  IndividualDevice &
  IndividualDeviceSerial &
  IndividualCard &
  IndividualDocument &
  Data;
