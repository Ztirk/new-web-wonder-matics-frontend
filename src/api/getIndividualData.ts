import axios from "axios";

export async function getIndividualData(
  id: string,
  setDataIndividal: React.Dispatch<React.SetStateAction<IndividualData>>,
  module: string,
  setLoading: React.Dispatch<React.SetStateAction<Boolean>>
): Promise<void> {
  setLoading(true);
  try {
    if (module == "device-serial") {
      module = "deviceSerial";
    }
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/${module}/${id}`
    );
    setDataIndividal(res.data);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}
