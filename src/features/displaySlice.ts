import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DisplayData } from "../interface/reduxType";
import { PersonIterate } from "../interface/personType";
import { ContactIterate } from "../interface/contactType";
import { AddressIterate } from "../interface/addressType";
import { CustomerIterate } from "../interface/customerType";
import { FleetIterate } from "../interface/fleetType";
import { VehicleIterate } from "../interface/vehicleType";
import { DeviceIterate } from "../interface/deviceType";

const initialState: DisplayData = {
  customer: [],
  person: [],
  contact: [],
  address: [],
  vehicle: [],
  fleet: [],
  device: [],
  deviceSerial: [],
};

const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setDisplayPersonFetch: (state, action: PayloadAction<PersonIterate[]>) => {
      state.person = action.payload;
    },

    setDisplayPersonInteract(state, action: PayloadAction<PersonIterate>) {
      state.person.push(action.payload);
    },

    setDisplayPersonDelete(state, action: PayloadAction<number>) {
      state.person = state.person.filter(
        (data) => data.person_id !== action.payload
      );
    },

    setDisplayContactFetch(state, action: PayloadAction<ContactIterate[]>) {
      state.contact = action.payload;
    },
    setDisplayContactInteract(state, action: PayloadAction<ContactIterate>) {
      state.contact.push(action.payload);
    },

    setDisplayContactDelete(state, action: PayloadAction<number>) {
      state.contact = state.contact.filter(
        (data) => data.contact_id !== action.payload
      );
    },

    setDisplayAddressFetch(state, action: PayloadAction<AddressIterate[]>) {
      state.address = action.payload;
    },

    setDisplayAddressInteract(state, action: PayloadAction<AddressIterate>) {
      state.address.push(action.payload);
    },

    setDisplayAddressDelete(state, action: PayloadAction<number>) {
      state.address.filter((data) => data.address_id !== action.payload);
    },

    setDisplayCustomerFetch(state, action: PayloadAction<CustomerIterate[]>) {
      state.customer = action.payload;
    },

    setDisplayCustomerInteract(state, action: PayloadAction<CustomerIterate>) {
      state.customer.push(action.payload);
    },

    setDisplayCustomerDelete(state, action: PayloadAction<number>) {
      state.customer = state.customer.filter(
        (data) => data.customer_id !== action.payload
      );
    },

    setDisplayFleetFetch(state, action: PayloadAction<FleetIterate[]>) {
      state.fleet = action.payload;
    },

    setDisplayFleetInteract(state, action: PayloadAction<FleetIterate>) {
      state.fleet.push(action.payload);
    },

    setDisplayFleetDelete(state, action: PayloadAction<number>) {
      state.fleet = state.fleet.filter(
        (data) => data.fleet_id !== action.payload
      );
    },
    setDisplayVehicleFetch(state, action: PayloadAction<VehicleIterate[]>) {
      state.vehicle = action.payload;
    },

    setDisplayVehicleInteract(state, action: PayloadAction<VehicleIterate>) {
      state.vehicle.push(action.payload);
    },

    setDisplayVehicleDelete(state, action: PayloadAction<number>) {
      state.vehicle = state.vehicle.filter(
        (data) => data.vehicle_id !== action.payload
      );
    },

    setDisplayDeviceFetch(state, action: PayloadAction<DeviceIterate[]>) {
      state.device = action.payload;
    },

    setDisplayDeviceInteract(state, action: PayloadAction<DeviceIterate>) {
      state.device.push(action.payload);
    },

    setDisplayDeviceDelete(state, action: PayloadAction<number>) {
      state.device = state.device.filter(
        (data) => data.device_id !== action.payload
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
} = displaySlice.actions;

export const displayState = (state) => state.display;

export default displaySlice.reducer;
