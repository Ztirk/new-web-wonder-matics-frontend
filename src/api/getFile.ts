import axios from "axios";

export async function getFile(id: number) {
  try {
    console.log(id);
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/document/download/${id}`,
      {
        headers: {
          Accept: "application/json",
        },
      }
    );

    const fileName = res.data.response.document.document_name;

    // Use Blob directly, no need for Buffer
    const blobData = new Blob([res.data.response.document.value]);

    const url = window.URL.createObjectURL(blobData);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", fileName);
    document.body.appendChild(link);
    link.click();
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err);
    } else {
      console.log(err);
    }
  }
}
