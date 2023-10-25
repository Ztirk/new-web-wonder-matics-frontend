export async function getMasterCode(
  setState: React.Dispatch<React.SetStateAction<MasterCode>>,
  category: string,
  className: string | null
): Promise<void> {
  try {
    const res = await fetch(
      `http://10.0.102.63:3001/master_code?category=${category}&class=${className}`,
      {
        method: "GET",
      }
    );
    const json = await res.json();
    setState(json);
  } catch (err) {
    console.log("hello");
  }
}
