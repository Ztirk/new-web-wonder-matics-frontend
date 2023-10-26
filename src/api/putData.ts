import axios from "axios";
import { EditedData } from "../interface/dataType";

export async function putEditedData(data: EditedData, id: string) {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_ERP_BASE_URL}/customer/${id}`,
      data,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.data);

    if (res.status == 201) {
      window.location.href = "/customer";
    }
  } catch (err) {
    console.log(err);
  }
}
