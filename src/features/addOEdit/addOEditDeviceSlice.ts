import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendDevice } from "../../interface/deviceType";

const initialState: SendDevice = {
  device: {
    device_id: 0,
    device_serial_id: 0,
    veh_id: null,
  },
  deviceConfig: {
    config_name: "",
    gateway_port: "",
    ip_address: "",
    mobile_number: "",
    network: "",
    password: "",
    sim_serial: "",
    sim_type_code_id: null,
    sms_message_center: "",
    sms_server_number: "",
    software_version: "",
    username: "",
  },
};

const addOEditDeviceSlice = createSlice({
  name: "addOEditDevice",
  initialState,
  reducers: {},
});

export const {} = addOEditDeviceSlice.actions;

export const addOEditDeviceState = (state) => state.addOEditDevice;

export default addOEditDeviceSlice.reducer;
