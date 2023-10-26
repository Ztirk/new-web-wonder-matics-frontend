import axios from "axios";

export async function getPopUpData(
  setIndividualDataData: React.Dispatch<React.SetStateAction<IndividualData>>,
  setPopUpLoading: React.Dispatch<React.SetStateAction<boolean>>,
  menu: string
) {
  const url = new URL(window.location.href);
  const personFilter = url.searchParams.get("personFilter");
  const addressFilter = url.searchParams.get("addressFilter");
  const customerFilter = url.searchParams.get("customerFilter");
  let filter = `${
    personFilter
      ? personFilter
      : addressFilter
      ? addressFilter
      : customerFilter
      ? customerFilter
      : ""
  }`;

  try {
    setPopUpLoading(true);

    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/${menu}?filter=${filter}`,
      {
        method: "GET",
      }
    );
    setIndividualDataData(res.data);
  } catch (err) {
    console.log(err);
  } finally {
    setPopUpLoading(false);
  }
}
