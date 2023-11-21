import axios from "axios";
import { Fleet } from "../interface/fleetType";

export default async function getFleetSelector(
  setFleetSelector: React.Dispatch<React.SetStateAction<Fleet | undefined>>
) {
  try {
    const res = await axios.get(`${import.meta.env.VITE_ERP_BASE_URL}/fleet`);
    setFleetSelector(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}