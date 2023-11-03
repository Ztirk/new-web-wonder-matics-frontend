import { configureStore } from "@reduxjs/toolkit";
import createBySlice from "./createBySlice";
import popUpAddExistSlice from "./popUpAddExistSlice";
import displaySlice from "./displaySlice";
import updateBySlice from "./updateBySlice";
import addNewOAddExistSlice from "./addNewOAddExistSlice";
import addOEditCustomerSlice from "./addOEditCustomerSlice";
import memoSlice from "./memoSlice";

export default configureStore({
  reducer: {
    createBy: createBySlice,
    popUpAddExist: popUpAddExistSlice,
    display: displaySlice,
    updateBy: updateBySlice,
    addNewOAddExist: addNewOAddExistSlice,
    addOEditCustomer: addOEditCustomerSlice,
    memo: memoSlice,
  },
});
