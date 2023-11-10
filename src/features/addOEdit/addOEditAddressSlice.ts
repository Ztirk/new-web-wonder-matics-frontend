import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SendAddress } from "../../interface/addressType";

const initialState: SendAddress = {
  address: {
    address_id: 0,
    address_type: [],
    address_typeDelete: [],
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
  reducers: {},
});

export const {} = addOEditAddressSlice.actions;

export const addOEditAddressState = (state) => state.addOEditAddress;

export default addOEditAddressSlice.reducer;
