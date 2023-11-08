import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Memo } from "../interface/reduxType";

const initialState: Memo = {
  customer_id: [],
  person_id: [],
  role_id: [],
  role_code_id: [],
  address_id: [],
  address_type_id: [],
  address_type_code_id: [],
  device_id: [],
  device_serial_id: [],
  fleet_id: [],
  vehicle_id: [],
};

const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    setCustomerId(state, action: PayloadAction<number>) {
      state.customer_id.push(action.payload);
    },
    setPersonId(state, action: PayloadAction<number>) {
      state.person_id.push(action.payload);
    },
    setRoleId(state, action: PayloadAction<number>) {
      state.role_id.push(action.payload);
    },
    setRoleCodeId(state, action: PayloadAction<number>) {
      state.role_code_id.push(action.payload);
    },
    setAddressId(state, action: PayloadAction<number>) {
      state.address_id.push(action.payload);
    },
    setAddressTypeId(state, action: PayloadAction<number>) {
      state.address_type_id.push(action.payload);
    },
    setAddressTypeCodeId(state, action: PayloadAction<number>) {
      state.address_type_code_id.push(action.payload);
    },
    setDeviceId(state, action: PayloadAction<number>) {
      state.device_id.push(action.payload);
    },
    setDeviceSerialId(state, action: PayloadAction<number>) {
      state.device_serial_id.push(action.payload);
    },
    setFleetId(state, action: PayloadAction<number>) {
      state.fleet_id.push(action.payload);
    },
    setVehicleId(state, action: PayloadAction<number>) {
      state.vehicle_id.push(action.payload);
    },
  },
});

export const {} = memoSlice.actions;

export const memoState = (state) => state.memo;

export default memoSlice.reducer;
