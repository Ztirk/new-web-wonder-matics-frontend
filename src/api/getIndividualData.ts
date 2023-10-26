import axios from "axios";

export async function fetchIndividualData(
  id: string,
  setDataIndividal: React.Dispatch<React.SetStateAction<IndividualData>>,
  module: string,
  setLoading: React.Dispatch<React.SetStateAction<Boolean>>
): Promise<void> {
  setLoading(true);
  try {
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
