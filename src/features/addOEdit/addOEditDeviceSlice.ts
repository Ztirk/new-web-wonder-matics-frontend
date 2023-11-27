import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendDevice } from "../../interface/deviceType";

const initialState: SendDevice = {
  device: {
    device_id: 0,
    veh_id: null,
    device_serial_id: 0,
    create_date: "",
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
  reducers: {
    setDeviceId(state, action: PayloadAction<number>) {
      state.device.device_id = action.payload;
    },
    setVehId(state, actions: PayloadAction<number>) {
      state.device.veh_id = actions.payload;
    },
    setDeviceSerialId(state, actions: PayloadAction<number>) {
      state.device.device_serial_id = actions.payload;
    },

    setConfigName(state, actions: PayloadAction<string>) {
      state.deviceConfig.config_name = actions.payload;
    },
    setGatewayPort(state, actions: PayloadAction<string>) {
      state.deviceConfig.gateway_port = actions.payload;
    },
    setIpAddress(state, action: PayloadAction<string>) {
      state.deviceConfig.ip_address = action.payload;
    },
    setMobileNumber(state, actions: PayloadAction<string>) {
      state.deviceConfig.mobile_number = actions.payload;
    },
    setNetwork(state, actions: PayloadAction<string>) {
      state.deviceConfig.network = actions.payload;
    },
    setPassword(state, actions: PayloadAction<string>) {
      state.deviceConfig.password = actions.payload;
    },
    setSimSerial(state, actions: PayloadAction<string>) {
      state.deviceConfig.sim_serial = actions.payload;
    },
    setSimTypeCodeId(state, action: PayloadAction<number>) {
      state.deviceConfig.sim_type_code_id = action.payload
        ? action.payload
        : null;
    },
    setSmsMessageCenter(state, action: PayloadAction<string>) {
      state.deviceConfig.sms_message_center = action.payload;
    },
    setSmsServerNumber(state, action: PayloadAction<string>) {
      state.deviceConfig.sms_server_number = action.payload;
    },
    setSoftwareVersion(state, action: PayloadAction<string>) {
      state.deviceConfig.software_version = action.payload;
    },
    setUsername(state, action: PayloadAction<string>) {
      state.deviceConfig.username = action.payload;
    },
    setDeviceCreateDate(state, action: PayloadAction<string>) {
      state.device.create_date =
        action.payload[action.payload.length - 1] == "Z"
          ? action.payload.slice(0, -1)
          : action.payload;
    },
  },
});

export const {
  setConfigName,
  setDeviceId,
  setDeviceSerialId,
  setGatewayPort,
  setMobileNumber,
  setNetwork,
  setPassword,
  setSimSerial,
  setSimTypeCodeId,
  setSmsMessageCenter,
  setSmsServerNumber,
  setSoftwareVersion,
  setUsername,
  setVehId,
  setIpAddress,
  setDeviceCreateDate,
} = addOEditDeviceSlice.actions;

export const addOEditDeviceState = (state) => state.addOEditDevice;

export default addOEditDeviceSlice.reducer;
