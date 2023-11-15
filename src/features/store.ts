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
import deleteSlice from "./deleteSlice";
import addOEditVehicleState from "./addOEdit/addOEditVehicleSlice";

export default configureStore({
  reducer: {
    popUpAddExist: popUpAddExistSlice,
    createBy: createBySlice,
    updateBy: updateBySlice,
    display: displaySlice,
    memo: memoSlice,
    addOEditCustomer: addOEditCustomerSlice,
    addOEditPerson: addOEditPersonSlice,
    addOEditAddress: addOEditAddressSlice,
    addOEditContact: addOEditContactSlice,
    addOEditVehicle: addOEditVehicleState,
    addOEditFleet: addOEditFleetSlice,
    addOEditDevice: addOEditDeviceSlice,
    addOEditDeviceSerial: addOEditDeviceSerialSlice,
    addNewOAddExist: addNewOAddExistSlice,
    delete: deleteSlice,
  },
});
