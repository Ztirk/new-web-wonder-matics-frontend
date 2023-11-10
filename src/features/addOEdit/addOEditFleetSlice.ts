import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendFleet } from "../../interface/fleetType";

const initialState: SendFleet = {
  fleet: {
    fleet_id: 0,
    fleet_name: "",
    parent_fleet_id: null,
  },
};

const addOEditFleetSlice = createSlice({
  name: "addOEditFleet",
  initialState,
  reducers: {},
});

export const {} = addOEditFleetSlice.actions;

export const addOEditFleetState = (state) => state.addOEditFleet;

export default addOEditFleetSlice.reducer;
