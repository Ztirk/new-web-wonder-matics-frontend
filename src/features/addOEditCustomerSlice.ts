import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendCustomer } from "../interface/customerType";

const initialState: SendCustomer = {
  customer: {
    customer_name: "",
    customer_type_code_id: 0,
    sales_type_code_id: 0,
  },
};

const addOEditCustomerSlice = createSlice({
  name: "addOEditCustomer",
  initialState,
  reducers: {
    setCustomerNameFetch(state, action: PayloadAction<string>) {
      if (!state.customer.customer_name) {
        state.customer.customer_name = action.payload;
      }
    },
    setCustomerNameInteract(state, action: PayloadAction<string>) {
      state.customer.customer_name = action.payload;
    },

    setCustomerTypeCodeIdFetch(state, action: PayloadAction<number>) {
      if (!state.customer.customer_type_code_id) {
        state.customer.customer_type_code_id = action.payload;
      }
    },
    setCustomerTypeCodeIdInteract(state, action: PayloadAction<number>) {
      state.customer.customer_type_code_id = action.payload;
    },

    setSalesTypeCodeIdFetch(state, action: PayloadAction<number>) {
      if (!state.customer.sales_type_code_id) {
        state.customer.sales_type_code_id = action.payload;
      }
    },
    setSalesTypeCodeIdInteract(state, action: PayloadAction<number>) {
      state.customer.sales_type_code_id = action.payload;
    },
  },
});

export const {
  setCustomerNameFetch,
  setCustomerNameInteract,
  setCustomerTypeCodeIdFetch,
  setCustomerTypeCodeIdInteract,
  setSalesTypeCodeIdFetch,
  setSalesTypeCodeIdInteract,
} = addOEditCustomerSlice.actions;

export const addOEditCustomerState = (state) => state.addNew;

export default addOEditCustomerSlice.reducer;
