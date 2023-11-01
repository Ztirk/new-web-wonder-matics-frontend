import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: {
    customer_name: "",
    customer_type_code_id: 0,
    sales_type_code_id: 0,
  },
};

const addNewOEditCustomerSlice = createSlice({
  name: "addNewOEditCustomer",
  initialState,
  reducers: {},
});

export const {} = addNewSlice.actions;

export const addNewOEditCustomerState = (state) => state.addNew;

export default addNewOEditCustomerSlice.reducer;
