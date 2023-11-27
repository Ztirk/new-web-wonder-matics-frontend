import axios from "axios";
import { ChildFleets} from "../interface/fleetType";

export default async function getChildFleets(id: number) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/fleet/child/${id}`
    );
    if (res.status == 200) return res.data;
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}
