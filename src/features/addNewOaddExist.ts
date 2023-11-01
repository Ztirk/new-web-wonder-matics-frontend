import { createSlice } from "@reduxjs/toolkit";

const initialState = {
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
  reducers: {},
});

export const {} = addNewSlice.actions;

export const addNewOaddExistState = (state) => state.addNew;

export default addNewOAddExistSlice.reducer;
