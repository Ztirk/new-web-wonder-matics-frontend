import axios from "axios";
import React from "react";
import {
  DistrictSelector,
  PickedAddress,
  ProvinceSelector,
  SendAddress,
  SubDistrictSelector,
} from "../interface/addressType";

export async function getProvinceSelector(
  setProvinceSelector: React.Dispatch<
    React.SetStateAction<ProvinceSelector | undefined>
  >
) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/select/address/province`
    );
    setProvinceSelector(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}

export async function getDistrictSelector(
  setDistrictSelector: React.Dispatch<
    React.SetStateAction<DistrictSelector | undefined>
  >,
  addOEditAddress: SendAddress
) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/select/address/district?province=${
        addOEditAddress.address.province
      }`
    );
    setDistrictSelector(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}

export async function getSubDistrictSelector(
  setSubDistrictSelector: React.Dispatch<
    React.SetStateAction<SubDistrictSelector | undefined>
  >,
  addOEditAddress: SendAddress
) {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_ERP_BASE_URL
      }/select/address/sub_district?province=${
        addOEditAddress.address.province
      }&district=${addOEditAddress.address.district}`
    );
    setSubDistrictSelector(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}
