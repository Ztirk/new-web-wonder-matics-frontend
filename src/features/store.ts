import { configureStore } from "@reduxjs/toolkit";
import editCustomerSlice from "./editCustomerSlice";
import addNewCustomerSlice from "./addNewCustomerSlice";
import displaySlice from "./displaySlice";
import popUpAddExistSlice from "./popUpAddExistSlice";

export default configureStore({
  reducer: {
    edited: editCustomerSlice,
    addNew: addNewCustomerSlice,
    display: displaySlice,
    popUpAddExist: popUpAddExistSlice,
  },
});
