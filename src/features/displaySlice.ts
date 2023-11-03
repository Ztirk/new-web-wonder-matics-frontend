import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DisplayData } from "../interface/reduxType";
import { PersonIterate } from "../interface/personType";

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
    setDisplayPersonFetch(state, action: PayloadAction<PersonIterate>) {
      state.person.push(action.payload);
    },

    // setDisplayPersonInteract(state, action) {
    //   state.
    // }

    setDisplayContactFetch(state, action) {
      state.contact.push(action.payload);
    },

    setDisplayAddressFetch(state, action) {
      state.address = action.payload;
    },

    setDisplayDefaultFetch(state) {
      state = defaultState;
    },
  },
});

export const {
  setDisplayAddressFetch,
  setDisplayContactFetch,
  setDisplayDefaultFetch,
  setDisplayPersonFetch,
} = displaySlice.actions;

export const displayState = (state) => state.display;

export default displaySlice.reducer;
