import axios from "axios";

export async function postNewData(addNewData: AddNewData) {
  console.log(addNewData);
  console.log("hello");
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_ERP_BASE_URL}/customer`,
      addNewData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log(res.data);

    if (res.status == 201) {
      window.location.href = "/customer";
    }
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}
