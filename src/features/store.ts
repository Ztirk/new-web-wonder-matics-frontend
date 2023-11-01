import { configureStore } from "@reduxjs/toolkit";
import createBySlice from "./createBySlice";
import popUpAddExistSlice from "./popUpAddExistSlice";
import displaySlice from "./displaySlice";

export default configureStore({
  reducer: {
    createBy: createBySlice,
    popUpAddExist: popUpAddExistSlice,
    display: displaySlice,
  },
});
