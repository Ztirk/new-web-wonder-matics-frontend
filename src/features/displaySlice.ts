import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DisplayData } from "../interface/reduxType";
import { Person, PersonIterate } from "../interface/personType";
import { Contact, ContactIterate } from "../interface/contactType";
import { Address, AddressIterate } from "../interface/addressType";
import { Customer, CustomerIterate } from "../interface/customerType";
import { Fleet, FleetIterate } from "../interface/fleetType";
import { Vehicle, VehicleIterate } from "../interface/vehicleType";
import { Device, DeviceIterate } from "../interface/deviceType";
import { Card } from "../interface/cardType";
import { Document } from "../interface/documentType";

const initialState: DisplayData = {
  customer: [],
  person: [],
  contact: [],
  address: [],
  vehicle: [],
  fleet: [],
  device: [],
  deviceSerial: [],
  card: [],
  document: [],
  count_data: 0,
};

const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setDisplayPersonFetch: (
      state,
      action: PayloadAction<Person["response"]["person"]>
    ) => {
      state.person = action.payload;
    },

    setDisplayPersonInteract(
      state,
      action: PayloadAction<Person["response"]["person"][0]>
    ) {
      state.person.push(action.payload);
    },

    setDisplayPersonDelete(state, action: PayloadAction<number | string>) {
      console.log(action.payload);
      state.person = state.person.filter(
        (data) => data.person_id !== action.payload
      );
    },

    setDisplayContactFetch(
      state,
      action: PayloadAction<Contact["response"]["contact"]>
    ) {
      state.contact = action.payload;
    },

    setDisplayContactInteract(
      state,
      action: PayloadAction<Contact["response"]["contact"][0]>
    ) {
      console.log(action.payload);
      state.contact.push(action.payload);
    },

    setDisplayContactDelete(state, action: PayloadAction<number | string>) {
      state.contact = state.contact.filter(
        (data) => data.contact_id !== action.payload
      );
    },

    setDisplayAddressFetch(
      state,
      action: PayloadAction<Address["response"]["address"]>
    ) {
      state.address = action.payload;
    },

    setDisplayAddressInteract(
      state,
      action: PayloadAction<Address["response"]["address"][0]>
    ) {
      state.address.push(action.payload);
    },

    setDisplayAddressDelete(state, action: PayloadAction<number | string>) {
      state.address = state.address.filter(
        (data) => data.address_id !== action.payload
      );
    },

    setDisplayCustomerFetch(
      state,
      action: PayloadAction<Customer["response"]["customer"]>
    ) {
      state.customer = action.payload;
    },

    setDisplayCustomerInteract(
      state,
      action: PayloadAction<Customer["response"]["customer"][0]>
    ) {
      state.customer.push(action.payload);
    },

    setDisplayCustomerDelete(state, action: PayloadAction<number | string>) {
      state.customer = state.customer.filter(
        (data) => data.customer_id !== action.payload
      );
    },

    setDisplayFleetFetch(
      state,
      action: PayloadAction<Fleet["response"]["fleet"]>
    ) {
      state.fleet = action.payload;
    },

    setDisplayFleetInteract(
      state,
      action: PayloadAction<Fleet["response"]["fleet"][0]>
    ) {
      state.fleet.push(action.payload);
    },

    setDisplayFleetDelete(state, action: PayloadAction<number | string>) {
      state.fleet = state.fleet.filter(
        (data) => data.fleet_id !== action.payload
      );
    },
    setDisplayVehicleFetch(
      state,
      action: PayloadAction<Vehicle["response"]["vehicle"]>
    ) {
      state.vehicle = action.payload;
    },

    setDisplayVehicleInteract(
      state,
      action: PayloadAction<Vehicle["response"]["vehicle"][0]>
    ) {
      state.vehicle.push(action.payload);
    },

    setDisplayVehicleDelete(state, action: PayloadAction<number | string>) {
      state.vehicle = state.vehicle.filter(
        (data) => data.vehicle_id !== action.payload
      );
    },

    setDisplayDeviceFetch(
      state,
      action: PayloadAction<Device["response"]["device"]>
    ) {
      state.device = action.payload;
    },

    setDisplayDeviceInteract(
      state,
      action: PayloadAction<Device["response"]["device"][0]>
    ) {
      state.device.push(action.payload);
    },

    setDisplayDeviceDelete(state, action: PayloadAction<number | string>) {
      state.device = state.device.filter(
        (data) => data.device_id !== action.payload
      );
    },

    setDisplayCardFetch(
      state,
      action: PayloadAction<Card["response"]["card"]>
    ) {
      state.card = action.payload;
    },
    setDisplayCardInteract(
      state,
      action: PayloadAction<Card["response"]["card"][0]>
    ) {
      state.card.push(action.payload);
    },
    setDisplayCardDelete(state, action: PayloadAction<number | string>) {
      state.card = state.card.filter((data) => data.card_id !== action.payload);
    },
    setDisplayDocumentFetch(
      state,
      action: PayloadAction<Document["response"]["document"]>
    ) {
      state.document = action.payload;
    },
    setDisplayDocumentIntereact(
      state,
      action: PayloadAction<Document["response"]["document"][0]>
    ) {
      state.document.push(action.payload);
    },
    setDisplayDocumentDelete(state, action: PayloadAction<number | string>) {
      state.document = state.document.filter(
        (data) => data.document_id !== action.payload
      );
    },

    setDisplayDefaultFetch(state) {
      state.address = [];
      state.contact = [];
      state.customer = [];
      state.device = [];
      state.deviceSerial = [];
      state.fleet = [];
      state.person = [];
      state.vehicle = [];
      state.card = [];
      state.document = [];
    },
  },
});

export const {
  setDisplayAddressFetch,
  setDisplayContactFetch,
  setDisplayDefaultFetch,
  setDisplayPersonFetch,
  setDisplayAddressDelete,
  setDisplayAddressInteract,
  setDisplayContactDelete,
  setDisplayContactInteract,
  setDisplayCustomerDelete,
  setDisplayCustomerFetch,
  setDisplayCustomerInteract,
  setDisplayDeviceDelete,
  setDisplayDeviceFetch,
  setDisplayDeviceInteract,
  setDisplayFleetDelete,
  setDisplayFleetFetch,
  setDisplayFleetInteract,
  setDisplayPersonDelete,
  setDisplayPersonInteract,
  setDisplayVehicleDelete,
  setDisplayVehicleFetch,
  setDisplayVehicleInteract,
  setDisplayCardDelete,
  setDisplayCardFetch,
  setDisplayCardInteract,
  setDisplayDocumentDelete,
  setDisplayDocumentFetch,
  setDisplayDocumentIntereact,
} = displaySlice.actions;

export const displayState = (state) => state.display;

export default displaySlice.reducer;
