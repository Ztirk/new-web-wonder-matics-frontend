import { configureStore } from "@reduxjs/toolkit";
import actionByState from "./actionBySlice";
import popUpAddExistSlice from "./popUpAddExistSlice";
import displaySlice from "./displaySlice";
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
import addOEditDocumentSlice from "./addOEdit/addOEditDocumentSlice";
import addOEditCardSlice from "./addOEdit/addOEditCardSlice";
import fileSlice from "./fileSlice";
import errorPopUpSlice from "./errorPopUpSlice";
import togglePropsPopUpSlice from "./togglePropsPopUpSlice";

export default configureStore({
  reducer: {
    errorPopUp: errorPopUpSlice,
    togglePropsPopUp: togglePropsPopUpSlice,
    popUpAddExist: popUpAddExistSlice,
    actionBy: actionByState,
    memo: memoSlice,
    addNewOAddExist: addNewOAddExistSlice,
    delete: deleteSlice,
    files: fileSlice,
    addOEditCustomer: addOEditCustomerSlice,
    addOEditPerson: addOEditPersonSlice,
    addOEditAddress: addOEditAddressSlice,
    addOEditContact: addOEditContactSlice,
    addOEditVehicle: addOEditVehicleState,
    addOEditFleet: addOEditFleetSlice,
    addOEditDevice: addOEditDeviceSlice,
    addOEditDeviceSerial: addOEditDeviceSerialSlice,
    addOEditCard: addOEditCardSlice,
    addOEditDocument: addOEditDocumentSlice,
    display: displaySlice,
  },
});
