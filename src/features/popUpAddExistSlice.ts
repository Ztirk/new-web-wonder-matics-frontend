import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  backdrop: false,
  type: "",
};

const popUpAddExistSlice = createSlice({
  name: "popUpAddExist",
  initialState,
  reducers: {
    setPopUpAddExistCustomer(state) {
      state.backdrop = true;
      state.type = "customer";
    },

    setPopUpAddExistPerson(state) {
      state.backdrop = true;
      state.type = "person";
    },

    setPopUpAddExistContact(state) {
      state.backdrop = true;
      state.type = "contact";
    },

    setPopUpAddExistAddress(state) {
      state.backdrop = true;
      state.type = "address";
    },

    setPopUpAddExistDefault(state) {
      state.backdrop = false;
      state.type = "";
    },
  },
});

export const {
  setPopUpAddExistAddress,
  setPopUpAddExistContact,
  setPopUpAddExistPerson,
  setPopUpAddExistDefault,
  setPopUpAddExistCustomer,
} = popUpAddExistSlice.actions;

export const popUpAddExistState = (state) => state.popUpAddExist;

export default popUpAddExistSlice.reducer;
