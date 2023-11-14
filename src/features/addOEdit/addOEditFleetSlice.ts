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
  reducers: {
    setFleetId(state, actions: PayloadAction<number>) {
      state.fleet.fleet_id = actions.payload;
    },
    setFleetName(state, actions: PayloadAction<string>) {
      state.fleet.fleet_name = actions.payload;
    },
    setParentFleetId(state, actions: PayloadAction<number | null>) {
      state.fleet.parent_fleet_id = actions.payload ? actions.payload : null;
    },
    setDefaultFleet(state) {
      state.fleet = {
        fleet_id: 0,
        fleet_name: "",
        parent_fleet_id: null,
      };
    },
  },
});

export const { setFleetId, setFleetName, setParentFleetId, setDefaultFleet } =
  addOEditFleetSlice.actions;

export const addOEditFleetState = (state) => state.addOEditFleet;

export default addOEditFleetSlice.reducer;
