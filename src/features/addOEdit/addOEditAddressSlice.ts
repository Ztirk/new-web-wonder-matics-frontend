import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendAddress } from "../../interface/addressType";

const initialState: SendAddress = {
  address: {
    address_id: 0,
    address_type_code_id: [],
    address_type_code_idDelete: [],
    alley: "",
    district: "",
    house_no: "",
    name: "",
    postal_code: "",
    province: "",
    road: "",
    sub_district: "",
    village_no: "",
  },
};

const addOEditAddressSlice = createSlice({
  name: "addOEditAddress",
  initialState,
  reducers: {
    setAddressId(state, actions: PayloadAction<number>) {
      state.address.address_id = actions.payload;
    },
    setAddressType(state, actions: PayloadAction<number>) {
      state.address.address_type_code_id.push(actions.payload);
    },
    removeAddressType(state, action: PayloadAction<number>) {
      state.address.address_type_code_id =
        state.address.address_type_code_id.filter(
          (id) => id !== action.payload
        );
    },
    setAddressTypeDelete(state, actions: PayloadAction<number>) {
      state.address.address_type_code_idDelete.push(actions.payload);
    },
    removeAddressTypeDelete(state, action: PayloadAction<number>) {
      state.address.address_type_code_idDelete =
        state.address.address_type_code_idDelete.filter(
          (id) => id !== action.payload
        );
    },
    setAlley(state, actions: PayloadAction<string>) {
      state.address.alley = actions.payload;
    },
    setDistrict(state, action: PayloadAction<string>) {
      state.address.district = action.payload;
    },
    setHouseNo(state, actions: PayloadAction<string>) {
      state.address.house_no = actions.payload;
    },
    setName(state, action: PayloadAction<string>) {
      state.address.name = action.payload;
    },
    setPostalCode(state, action: PayloadAction<string>) {
      state.address.postal_code = action.payload;
    },
    setProvince(state, action: PayloadAction<string>) {
      state.address.province = action.payload;
    },
    setRoad(state, action: PayloadAction<string>) {
      state.address.road = action.payload;
    },
    setSubDistrict(state, action: PayloadAction<string>) {
      state.address.sub_district = action.payload;
    },
    setVillageNo(state, action: PayloadAction<string>) {
      state.address.village_no = action.payload;
    },
    setDefaultAddress(state) {
      state.address = {
        address_id: 0,
        address_type_code_id: [],
        address_type_code_idDelete: [],
        alley: "",
        district: "",
        house_no: "",
        name: "",
        postal_code: "",
        province: "",
        road: "",
        sub_district: "",
        village_no: "",
      };
    },
  },
});

export const {
  setAddressId,
  setAddressType,
  setAddressTypeDelete,
  setAlley,
  setDistrict,
  setHouseNo,
  setName,
  setPostalCode,
  setProvince,
  setRoad,
  setSubDistrict,
  setVillageNo,
  setDefaultAddress,
  removeAddressType,
  removeAddressTypeDelete,
} = addOEditAddressSlice.actions;

export const addOEditAddressState = (state) => state.addOEditAddress;

export default addOEditAddressSlice.reducer;
