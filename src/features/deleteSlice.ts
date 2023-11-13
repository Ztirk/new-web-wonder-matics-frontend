import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Delete } from "../interface/reduxType";

const initialState: Delete = {
  customerDelete: [],
  personDelete: [],
  addressDelete: [],
  vehicleDelete: [],
  fleetDelete: [],
  contactDelete: [],
};

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    setCustomerDelete(state, action: PayloadAction<number>) {
      state.customerDelete.push(action.payload);
    },
    setPersonDelete(state, action: PayloadAction<number>) {
      state.personDelete.push(action.payload);
    },
    setAddressDelete(state, action: PayloadAction<number>) {
      state.addressDelete.push(action.payload);
    },
    setVehicleDelete(state, action: PayloadAction<number>) {
      state.vehicleDelete.push(action.payload);
    },
    setFleetDelete(state, action: PayloadAction<number>) {
      state.fleetDelete.push(action.payload);
    },
    setContactDelete(state, action: PayloadAction<number>) {
      state.contactDelete.push(action.payload);
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
} = deleteSlice.actions;

export const deleteState = (state) => state.delete;

export default deleteSlice.reducer;
