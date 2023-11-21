import axios from "axios";
import { Data } from "../interface/dataType";

export async function getPopUpData(
  setIndividualDataData: React.Dispatch<React.SetStateAction<Data | undefined>>,
  setPopUpLoading: React.Dispatch<React.SetStateAction<boolean>>,
  menu: string,
  search: string
) {
  try {
    setPopUpLoading(true);
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/${menu}?filter=${search}`,
      {
        method: "GET",
      }
    );
    setIndividualDataData(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  } finally {
    setPopUpLoading(false);
  }
}
