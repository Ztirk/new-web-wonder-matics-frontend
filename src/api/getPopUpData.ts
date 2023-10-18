export async function getPopUpData(
  setIndividualDataData: React.Dispatch<React.SetStateAction<IndividualData>>,
  setPopUpLoading: React.Dispatch<React.SetStateAction<boolean>>
) {
  const url = new URL(window.location.href);
  const personFilter = url.searchParams.get("personFilter");
  const addressFilter = url.searchParams.get("addressFilter");

  try {
    setPopUpLoading(true);
    if (personFilter) {
      const res = await fetch(
        `http://10.0.102.87:3001/person?filter=${personFilter}`,
        {
          method: "GET",
        }
      );
      const json = await res.json();
      setIndividualDataData(json);
    } else if (addressFilter) {
      const res = await fetch(
        `http://10.0.102.87:3001/address?filter=${addressFilter}`,
        {
          method: "GET",
        }
      );
      const json = await res.json();
      setIndividualDataData(json);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setPopUpLoading(false);
  }
}
