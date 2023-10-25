import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  create_by: 0,
  customer: {
    customer_name: "",
    customer_type_code_id: 0,
    sales_type_code_id: 0,
  },
  addressNew: [],
  addressExist: [],
  contact: [],
  personNew: [],
  personExist: [],
  vehicleNew: [],
  vehicleExist: [],
  fleetNew: [],
  fleetExist: [],
};

const addNewSlice = createSlice({
  name: "addNew",
  initialState,
  reducers: {
    // ลูกค้า
    setAddNewCustomer(state, action) {
      state.customer = action.payload;
    },

    // คน
    setAddNewPersonExistInCustomer(state, action) {
      state.personExist = action.payload;
    },

    setAddNewPersonDeleteInCustomer(state, action) {
      state.personExist = state.personExist.filter(
        (id) => id !== action.payload
      );
    },

    // ผู้ติดต่อ
    setAddNewContactNewInCustomer(state, action) {
      state.contact.push(action.payload);
    },

    setAddNewContactDeleteInCustomer(state, action) {
      state.contact = state.contact.filter(
        (contact) => contact.uuid !== action.payload
      );
    },

    // ที่อยู่
    setAddNewAddressExistInCustomer(state, action) {
      state.addressExist = action.payload;
    },

    setAddNewAddressDeleteInCustomer(state, action) {
      state.addressExist = state.addressExist.filter(
        (id) => id !== action.payload
      );
    },

    // รถ
    setAddNewVehicleExistInCustomer(state, action) {
      state.vehicleExist = action.payload;
    },

    setAddNewVehicleDeleteInCustomer(state, action) {
      state.vehicleExist = state.vehicleExist.filter(
        (id) => id !== action.payload
      );
    },

    // ฟลีต
    setAddNewFleetExistInCustomer(state, action) {
      state.fleetExist = action.payload;
    },

    setAddNewFleetDeleteInCustomer(state, action) {
      state.fleetExist = state.fleetExist.filter((id) => id !== action.payload);
    },

    setAddNewDefaultInCustomer(state) {
      state = defaultState;
    },
  },
});

export const {
  setAddNewPersonExistInCustomer,
  setAddNewCustomer,
  setAddNewContactNewInCustomer,
  setAddNewAddressExistInCustomer,
  setAddNewDefaultInCustomer,
  setAddNewAddressDeleteInCustomer,
  setAddNewPersonDeleteInCustomer,
  setAddNewContactDeleteInCustomer,
  setAddNewFleetDeleteInCustomer,
  setAddNewFleetExistInCustomer,
  setAddNewVehicleDeleteInCustomer,
  setAddNewVehicleExistInCustomer,
} = addNewSlice.actions;

export const addNewState = (state) => state.addNew;

export default addNewSlice.reducer;
