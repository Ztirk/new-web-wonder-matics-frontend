import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendDeviceSerial } from "../../interface/deviceSerialType";

const initialState: SendDeviceSerial = {
  deviceSerial: {
    device_serial_id: 0,
    serial_id: "",
    device_type_code_id: null,
    dvr_id: "",
    imei_serial: "",
  },
};

const addOEditDeviceSerialSlice = createSlice({
  name: "addOEditDeviceSerial",
  initialState,
  reducers: {
    setDeviceSerialId(state, action: PayloadAction<number | string>) {
      state.deviceSerial.device_serial_id = action.payload;
    },
    setSerialId(state, action: PayloadAction<string>) {
      state.deviceSerial.serial_id = action.payload;
    },
    setDeviceTypeCodeId(state, action: PayloadAction<number>) {
      state.deviceSerial.device_type_code_id = action.payload
        ? action.payload
        : null;
    },
    setDvrId(state, action: PayloadAction<string>) {
      state.deviceSerial.dvr_id = action.payload;
    },
    setImeiSerial(state, action: PayloadAction<string>) {
      state.deviceSerial.imei_serial = action.payload;
    },
    setDefaultDeviceSerial(state) {
      state.deviceSerial = {
        device_serial_id: 0,
        serial_id: "",
        device_type_code_id: null,
        dvr_id: "",
        imei_serial: "",
      };
    },
  },
});

export const {
  setDefaultDeviceSerial,
  setDeviceSerialId,
  setDeviceTypeCodeId,
  setDvrId,
  setImeiSerial,
  setSerialId,
} = addOEditDeviceSerialSlice.actions;

export const addOEditDeviceSerialState = (state) => state.addOEditDeviceSerial;

export default addOEditDeviceSerialSlice.reducer;
