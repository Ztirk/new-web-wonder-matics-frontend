import axios from "axios";
import { PersonSelector } from "../interface/personType";

export default async function getPersonSelector(
  setPersonSelector: React.Dispatch<
    React.SetStateAction<PersonSelector | undefined>
  >
) {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/select/person`
    );
    setPersonSelector(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}
