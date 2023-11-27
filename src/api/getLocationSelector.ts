import axios from "axios";
import { AddressSelector } from "../interface/addressType";

export default async function getLocationSelector(
  setLocationSelector: React.Dispatch<React.SetStateAction<AddressSelector | undefined>>
) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/select/address`
    );
    setLocationSelector(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}
