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
    popUpAddExist: popUpAddExistSlice,
    actionBy: actionByState,
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
    addOEditCard: addOEditCardSlice,
    addOEditDocument: addOEditDocumentSlice,
    files: fileSlice,
    errorPopUp: errorPopUpSlice,
    togglePropsPopUp: togglePropsPopUpSlice,
  },
});
