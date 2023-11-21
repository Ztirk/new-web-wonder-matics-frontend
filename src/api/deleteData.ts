import axios from "axios";

export async function deleteData(id: number, module: string) {
  try {
    if (module == "device-serial") {
      module = "deviceSerial";
    }
    const res = await axios.delete(
      `${import.meta.env.VITE_ERP_BASE_URL}/${module}/${id}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log(res.status);
    console.log(res.data);

    if (res.status == 200) {
      window.location.reload();
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}
