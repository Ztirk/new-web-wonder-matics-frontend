import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DisplayData } from "../interface/reduxType";

const initialState: DisplayData = {
  customer: [],
  person: [],
  contact: [],
  address: [],
  vehicle: [],
  fleet: [],
};

const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setDisplayPerson(state, action: PayloadAction<>) {
      state.person = action.payload;
    },

    setDisplayContact(state, action) {
      state.contact.push(action.payload);
    },

    setDisplayAddress(state, action) {
      state.address = action.payload;
    },

    setDisplayDefault(state) {
      state = defaultState;
    },
  },
});

export const {
  setDisplayAddress,
  setDisplayContact,
  setDisplayDefault,
  setDisplayPerson,
} = displaySlice.actions;

export const displayState = (state) => state.display;

export default displaySlice.reducer;
