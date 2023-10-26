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
  fleetExist: [],
  fleetNew: [],
  fleetDelete: [],
};

const editedSlice = createSlice({
  name: "edited",
  initialState,
  reducers: {
    setEditCustomer(state, action) {
      state.customer = action.payload;
    },

    setEditPersonExistInCustomer(state, action) {
      state.personExist = action.payload;
    },

    setEditPersonDeleteInCustomer(state, action) {
      state.personDelete.push(action.payload);
    },

    setEditContactInCustomer(state, action) {
      state.contact.push(action.payload);
    },

    setEditContactDeleteInCustomer(state, action) {
      state.contactDelete.push(action.payload);
    },

    setEditAddressExistInCustomer(state, action) {
      state.addressExist = action.payload;
    },

    setEditAddressDeleteInCustomer(state, action) {
      state.addressDelete.push(action.payload);
    },

    setEditDefaultInCustomer(state) {
      state = defaultState;
    },
  },
});

export const {
  setEditPersonExistInCustomer,
  setEditCustomer,
  setEditContactInCustomer,
  setEditAddressExistInCustomer,
  setEditDefaultInCustomer,
  setEditAddressDeleteInCustomer,
  setEditPersonDeleteInCustomer,
  setEditContactDeleteInCustomer,
} = editedSlice.actions;

export const editedState = (state) => state.edited;

export default editedSlice.reducer;
