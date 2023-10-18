import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  update_by: 0,
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
  update_by: 0,
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

const editedSlice = createSlice({
  name: "edited",
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

    setContact(state, action) {
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
  setContact,
  setAddressExist,
  setDefault,
  setAddressDelete,
  setPersonDelete,
  setContactDelete,
} = editedSlice.actions;

export const editedState = (state) => state.edited;

export default editedSlice.reducer;
