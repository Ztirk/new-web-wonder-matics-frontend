import axios from "axios";
import React from "react";
import {
  BrandSelector,
  ModelSelector,
  SendVehicle,
} from "../interface/vehicleType";

export async function getBrandSelector(
  setBrandSelector: React.Dispatch<
    React.SetStateAction<BrandSelector | undefined>
  >
) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/select/vehicle/brand`
    );
    setBrandSelector(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}

export async function getModelSelector(
  setModelSelector: React.Dispatch<
    React.SetStateAction<ModelSelector | undefined>
  >,
  addOEditVehicle: SendVehicle
) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/select/vehicle/model?brand=${
        addOEditVehicle.vehicle.brand_name
      }`
    );
    setModelSelector(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}
