import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DisplayData } from "../interface/reduxType";

const initialState: DisplayData = {
  customerDelete: [],
  personDelete: [],
  addressDelete: [],
  contactDelete: [],
  vehicleDelete: [],
  fleetDelete: [],
};

const deleteSlice = createSlice({
  name: "delete",
  initialState,
  reducers: {
    
  },
});

export const {

} = deleteSlice.actions;

export const deleteState = (state) => state.display;

export default deleteSlice.reducer;
