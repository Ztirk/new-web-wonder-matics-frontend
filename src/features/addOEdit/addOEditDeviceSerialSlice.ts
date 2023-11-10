import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendDeviceSerial } from "../../interface/deviceSerialType";

const initialState: SendDeviceSerial = {
  deviceSerial: {
    device_serial_id: 0,
    device_type_code_id: null,
    dvr_id: "",
    imei_serial: "",
  },
};

const addOEditDeviceSerialSlice = createSlice({
  name: "addOEditDeviceSerial",
  initialState,
  reducers: {},
});

export const {} = addOEditDeviceSerialSlice.actions;

export const addOEditDeviceSerialState = (state) => state.addOEditDeviceSerial;

export default addOEditDeviceSerialSlice.reducer;
