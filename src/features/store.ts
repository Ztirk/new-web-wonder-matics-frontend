import { configureStore } from "@reduxjs/toolkit";
import createBySlice from "./createBySlice";
import popUpAddExistSlice from "./popUpAddExistSlice";
import displaySlice from "./displaySlice";
import updateBySlice from "./updateBySlice";
import addNewOAddExistSlice from "./addNewOAddExistSlice";
import addOEditCustomerSlice from "./addOEdit/addOEditCustomerSlice";
import memoSlice from "./memoSlice";
import addOEditPersonSlice from "./addOEdit/addOEditPersonSlice";
import addOEditAddressSlice from "./addOEdit/addOEditAddressSlice";
import addOEditContactSlice from "./addOEdit/addOEditContactSlice";
import addOEditFleetSlice from "./addOEdit/addOEditFleetSlice";
import addOEditDeviceSerialSlice from "./addOEdit/addOEditDeviceSerialSlice";
import addOEditDeviceSlice from "./addOEdit/addOEditDeviceSlice";

export default configureStore({
  reducer: {
    createBy: createBySlice,
    popUpAddExist: popUpAddExistSlice,
    display: displaySlice,
    updateBy: updateBySlice,
    addNewOAddExist: addNewOAddExistSlice,
    memo: memoSlice,
    addOEditCustomer: addOEditCustomerSlice,
    addOEditPerson: addOEditPersonSlice,
    addOEditAddress: addOEditAddressSlice,
    addOEditContact: addOEditContactSlice,
    addOEditFleet: addOEditFleetSlice,
    addOEditDevice: addOEditDeviceSlice,
    addOEditDeviceSerial: addOEditDeviceSerialSlice,
  },
});
