import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AddNewData } from "../interface/dataType";
import type { RootState } from "../app/store";

const initialState = {
  create_by: 0,
  customer: {
    customer_name: "",
    customer_type_code_id: 0,
    sales_type_code_id: 0,
  },
  addressNew: [],
  addressExist: [],
  addressDelete: [],
  contact: [],
  contactDelete: [],
  personNew: [],
  personExist: [],
  personDelete: [],
  vehicleNew: [],
  vehicleExist: [],
  vehicleDelete: [],
};

const defaultState = {
  create_by: 0,
  customer: {
    customer_name: "",
    customer_type_code_id: 0,
    sales_type_code_id: 0,
  },
  addressNew: [],
  addressExist: [],
  addressDelete: [],
  contact: [],
  contactDelete: [],
  personNew: [],
  personExist: [],
  personDelete: [],
  vehicleNew: [],
  vehicleExist: [],
  vehicleDelete: [],
};

const addNewSlice = createSlice({
  name: "addNew",
  initialState,
  reducers: {
    setCustomer(state, action) {
      state.customer = action.payload;
    },

    setPersonExist(state, action) {
      state.personExist = action.payload;
    },

    setPersonDelete(state, action) {
      state.personDelete.push(action.payload);
    },

    setContactNew(state, action) {
      state.contact.push(action.payload);
    },

    setContactDelete(state, action) {
      state.contactDelete.push(action.payload);
    },

    setAddressExist(state, action) {
      state.addressExist = action.payload;
    },

    setAddressDelete(state, action) {
      state.addressDelete.push(action.payload);
    },

    setDefault(state) {
      state = defaultState;
    },
  },
});

export const {
  setPersonExist,
  setCustomer,
  setContactNew,
  setAddressExist,
  setDefault,
  setAddressDelete,
  setPersonDelete,
  setContactDelete,
} = addNewSlice.actions;

export const addNewState = (state) => state.addNew;

export default addNewSlice.reducer;
