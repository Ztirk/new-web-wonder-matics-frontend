import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddNewOAddExist } from "../interface/reduxType";
import { SendPerson } from "../interface/personType";
import { SendCustomer } from "../interface/customerType";
import { SendAddress } from "../interface/addressType";
import { SendVehicle } from "../interface/vehicleType";
import { SendFleet } from "../interface/fleetType";
import { SendContact } from "../interface/contactType";

const initialState: AddNewOAddExist = {
  customerNew: [],
  customerExist: [],
  addressNew: [],
  addressExist: [],
  contact: [],
  personNew: [],
  personExist: [],
  vehicleNew: [],
  vehicleExist: [],
  fleetNew: [],
  fleetExist: [],
};

const addNewOAddExistSlice = createSlice({
  name: "addNewOAddExist",
  initialState,
  reducers: {
    setCustomerNew(state, action: PayloadAction<SendCustomer>) {
      state.customerNew.push(action.payload);
    },
    setCustomerExist(state, action: PayloadAction<number>) {
      state.customerExist.push(action.payload);
    },
    setPersonNew(state, action: PayloadAction<SendPerson>) {
      state.personNew.push(action.payload);
    },
    setPersonExist(state, action: PayloadAction<number>) {
      state.personExist.push(action.payload);
    },
    setAddressNew(state, action: PayloadAction<SendAddress>) {
      state.addressNew.push(action.payload);
    },
    setAddressExist(state, action: PayloadAction<number>) {
      state.addressExist.push(action.payload);
    },
    setVehicleNew(state, action: PayloadAction<SendVehicle>) {
      state.vehicleNew.push(action.payload);
    },
    setVehicleExist(state, action: PayloadAction<number>) {
      state.vehicleExist.push(action.payload);
    },
    setFleetNew(state, action: PayloadAction<SendFleet>) {
      state.fleetNew.push(action.payload);
    },
    setFleetExist(state, action: PayloadAction<number>) {
      state.fleetExist.push(action.payload);
    },
    setContactNew(state, action: PayloadAction<SendContact>) {
      state.contact.push(action.payload);
    },
  },
});

export const {} = addNewOAddExistSlice.actions;

export const addNewOAddExistState = (state) => state.addNewOAddExist;

export default addNewOAddExistSlice.reducer;
