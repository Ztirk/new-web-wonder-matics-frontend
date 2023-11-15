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
      `${import.meta.env.VITE_ERP_BASE_URL}/address/province`
    );
    setProvinceSelector(res.data);
  } catch (err) {
    console.log(err);
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
      `${import.meta.env.VITE_ERP_BASE_URL}/address/district?province=${
        addOEditAddress.address.province
      }`
    );
    setDistrictSelector(res.data);
  } catch (err) {
    console.log(err);
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
      `${import.meta.env.VITE_ERP_BASE_URL}/address/sub_district?province=${
        addOEditAddress.address.province
      }&district=${addOEditAddress.address.district}`
    );
    setSubDistrictSelector(res.data);
  } catch (err) {
    console.log(err);
  }
}
