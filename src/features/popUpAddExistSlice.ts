import { createSlice } from "@reduxjs/toolkit";

const initialState: Addexist = {
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

    setPopUpAddExistFleet(state) {
      state.backdrop = true;
      state.type = "fleet";
    },

    setPopUpAddExistVehicle(state) {
      state.backdrop = true;
      state.type = "vehicle";
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
  setPopUpAddExistFleet,
  setPopUpAddExistVehicle,
} = popUpAddExistSlice.actions;

export const popUpAddExistState = (state) => state.popUpAddExist;

export default popUpAddExistSlice.reducer;
