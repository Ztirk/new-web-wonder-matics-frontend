import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  person: [],
  contact: [],
  address: [],
};

const defaultState = {
  person: [],
  contact: [],
  address: [],
};

const displaySlice = createSlice({
  name: "display",
  initialState,
  reducers: {
    setDisplayPerson(state, action) {
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
