import axios from "axios";
import React from "react";

export async function getModelSelector(
  setBrandSelector: React.Dispatch<React.SetStateAction<>>
) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_ERP_BASE_URL}/vehicle/brand`);
    setBrandSelector(res.data);
  } catch (err) {
    console.log(err);
  }
}

export async function getBrandSelector(setModelSelector: React.Dispatch<React.SetStateAction<>>, obj) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_ERP_BASE_URL}/vehicle/model?brand=${}`)
    setModelSelector(res.data)
  } catch (err) {
    console.log(err)
  }
}
