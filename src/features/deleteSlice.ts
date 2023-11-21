import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Delete } from "../interface/reduxType";

const initialState: Delete = {
  customerDelete: [],
  personDelete: [],
  addressDelete: [],
  vehicleDelete: [],
  fleetDelete: [],
  contactDelete: [],
  documentDelete: [],
};

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    setCustomerDelete(state, action: PayloadAction<number>) {
      state.customerDelete.push(action.payload);
    },
    removeCustomerDelete(state, action: PayloadAction<number>) {
      state.customerDelete = state.customerDelete.filter(
        (id) => id !== action.payload
      );
    },
    setPersonDelete(state, action: PayloadAction<number>) {
      state.personDelete.push(action.payload);
    },
    removePersonDelete(state, action: PayloadAction<number>) {
      state.personDelete = state.personDelete.filter(
        (id) => id !== action.payload
      );
    },
    setAddressDelete(state, action: PayloadAction<number>) {
      state.addressDelete.push(action.payload);
    },
    removeAddressDelete(state, action: PayloadAction<number>) {
      state.addressDelete = state.addressDelete.filter(
        (id) => id !== action.payload
      );
    },
    setVehicleDelete(state, action: PayloadAction<number>) {
      state.vehicleDelete.push(action.payload);
    },
    removeVehicleDelete(state, action: PayloadAction<number>) {
      state.vehicleDelete = state.vehicleDelete.filter(
        (id) => id !== action.payload
      );
    },
    setFleetDelete(state, action: PayloadAction<number>) {
      state.fleetDelete.push(action.payload);
    },
    removeFleetDelete(state, action: PayloadAction<number>) {
      state.fleetDelete = state.fleetDelete.filter(
        (id) => id !== action.payload
      );
    },
    setContactDelete(state, action: PayloadAction<number>) {
      state.contactDelete.push(action.payload);
    },
    removeContactDelete(state, action: PayloadAction<number>) {
      state.contactDelete = state.contactDelete.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const {
  setAddressDelete,
  setCustomerDelete,
  setFleetDelete,
  setPersonDelete,
  setVehicleDelete,
  setContactDelete,
  removeAddressDelete,
  removeContactDelete,
  removeCustomerDelete,
  removeFleetDelete,
  removePersonDelete,
  removeVehicleDelete,
} = deleteSlice.actions;

export const deleteState = (state) => state.delete;

export default deleteSlice.reducer;
