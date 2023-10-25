import { configureStore } from "@reduxjs/toolkit";
import editCustomerSlice from "./features/editCustomerSlice";
import addNewCustomerSlice from "./features/addNewCustomerSlice";
import displaySlice from "./features/displaySlice";
import popUpAddExistSlice from "./features/popUpAddExistSlice";

export default configureStore({
  reducer: {
    edited: editCustomerSlice,
    addNew: addNewCustomerSlice,
    display: displaySlice,
    popUpAddExist: popUpAddExistSlice,
  },
});