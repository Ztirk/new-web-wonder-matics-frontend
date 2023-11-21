import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Memo } from "../interface/reduxType";

const initialState: Memo = {
  customer_id: [],
  person_id: [],
  role_code_id: [],
  address_id: [],
  address_type_code_id: [],
  device_id: [],
  device_serial_id: [],
  fleet_id: [],
  vehicle_id: [],
  contact_id: [],
};

const memoSlice = createSlice({
  name: "memo",
  initialState,
  reducers: {
    memoCustomerId(state, action: PayloadAction<number>) {
      state.customer_id.push(action.payload);
    },
    memoPersonId(state, action: PayloadAction<number>) {
      state.person_id.push(action.payload);
    },
    memoRoleId(state, action: PayloadAction<number>) {
      state.role_code_id.push(action.payload);
    },
    memoRoleCodeId(state, action: PayloadAction<number>) {
      state.role_code_id.push(action.payload);
    },
    memoAddressId(state, action: PayloadAction<number>) {
      state.address_id.push(action.payload);
    },
    memoAddressTypeId(state, action: PayloadAction<number>) {
      state.address_type_code_id.push(action.payload);
    },
    memoAddressTypeCodeId(state, action: PayloadAction<number>) {
      state.address_type_code_id.push(action.payload);
    },
    memoDeviceId(state, action: PayloadAction<number>) {
      state.device_id.push(action.payload);
    },
    memoDeviceSerialId(state, action: PayloadAction<number>) {
      state.device_serial_id.push(action.payload);
    },
    memoFleetId(state, action: PayloadAction<number>) {
      state.fleet_id.push(action.payload);
    },
    memoVehicleId(state, action: PayloadAction<number>) {
      state.vehicle_id.push(action.payload);
    },
    memoContactId(state, action: PayloadAction<number>) {
      state.contact_id.push(action.payload);
    },
  },
});

export const {
  memoAddressId,
  memoAddressTypeCodeId,
  memoAddressTypeId,
  memoCustomerId,
  memoDeviceId,
  memoDeviceSerialId,
  memoFleetId,
  memoPersonId,
  memoRoleCodeId,
  memoRoleId,
  memoVehicleId,
  memoContactId,
} = memoSlice.actions;

export const memoState = (state) => state.memo;

export default memoSlice.reducer;
