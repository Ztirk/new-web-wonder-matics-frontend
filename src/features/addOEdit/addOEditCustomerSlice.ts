import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendCustomer } from "../../interface/customerType";

const initialState: SendCustomer = {
  customer: {
    customer_id: 0,
    customer_name: "",
    customer_type_code_id: null,
    sales_type_code_id: null,
  },
};

const addOEditCustomerSlice = createSlice({
  name: "addOEditCustomer",
  initialState,
  reducers: {
    setCustomerId: (state, action: PayloadAction<number>) => {
      state.customer.customer_id = action.payload;
    },

    setCustomerName: (state, action: PayloadAction<string>) => {
      state.customer.customer_name = action.payload;
    },

    setCustomerTypeCodeId: (state, action: PayloadAction<number>) => {
      state.customer.customer_type_code_id = action.payload
        ? action.payload
        : null;
    },

    setSalesTypeCodeId: (state, action: PayloadAction<number>) => {
      state.customer.sales_type_code_id = action.payload
        ? action.payload
        : null;
    },

    setAddOEditCustomerDefault: (state) => {
      state.customer = {
        customer_id: 0,
        customer_name: "",
        customer_type_code_id: 0,
        sales_type_code_id: 0,
      };
    },
  },
});

export const {
  setCustomerId,
  setCustomerName,
  setCustomerTypeCodeId,
  setSalesTypeCodeId,
  setAddOEditCustomerDefault,
} = addOEditCustomerSlice.actions;

export const addOEditCustomerState = (state) => state.addOEditCustomer;

export default addOEditCustomerSlice.reducer;
