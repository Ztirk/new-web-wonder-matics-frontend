import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Delete, DisplayData } from "../interface/reduxType";

const initialState: Delete = {
  customerDelete: [],
  personDelete: [],
  addressDelete: [],
  vehicleDelete: [],
  fleetDelete: [],
};

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    setCustomerDelete(state, action) {},
    setPersonDelete(state, action) {},
    setAddressDelete(state, action) {},
    setVehicleDelete(state, action) {},
    setFleetDelete(state, action) {},
  },
});

export const {} = deleteSlice.actions;

export const deleteState = (state) => state.delete;

export default deleteSlice.reducer;
