import axios from "axios";

import { VehicleSelector } from "../interface/vehicleType";

export default async function getLicensePlateSelector(
  setLicensePlateSelector: React.Dispatch<
    React.SetStateAction<VehicleSelector | undefined>
  >
) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/select/vehicle`
    );
    setLicensePlateSelector(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}
