import axios from "axios";
import { FleetSelector } from "../interface/fleetType";

export default async function getFleetSelector(
  setFleetSelector: React.Dispatch<React.SetStateAction<FleetSelector | undefined>>
) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/select/fleet`
    );
    setFleetSelector(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}
