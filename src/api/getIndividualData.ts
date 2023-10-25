export async function fetchIndividualData(
  id: string,
  setDataIndividal: React.Dispatch<React.SetStateAction<IndividualData>>,
  module: string,
  setLoading: React.Dispatch<React.SetStateAction<Boolean>>
): Promise<void> {
  setLoading(true);
  try {
    const response = await fetch(`http://10.0.102.63:3001/${module}/${id}`);
    const json = await response.json();
    setDataIndividal(json);
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}
