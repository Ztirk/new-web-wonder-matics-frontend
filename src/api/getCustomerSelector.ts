import axios from "axios";
import { CustomerSelector } from "../interface/customerType";

export default async function getCustomerSelector(
  setCustomerSelector: React.Dispatch<React.SetStateAction<CustomerSelector | undefined>>
) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/select/customer`
    );
    setCustomerSelector(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}
