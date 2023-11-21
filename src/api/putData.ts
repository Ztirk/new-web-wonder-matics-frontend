import axios from "axios";

export async function putEditedData(data, id: number) {
  try {
    const res = await axios.put(
      `${import.meta.env.VITE_ERP_BASE_URL}/customer/${id}`,
      data,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (res.status == 200) {
      window.location.href = "/customer";
    } else {
      console.log(res);
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}
