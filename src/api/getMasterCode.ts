import axios from "axios";

export async function getMasterCode(
  setState: React.Dispatch<React.SetStateAction<MasterCode>>,
  category: string,
  className: string | null
): Promise<void> {
  try {
    const res = await axios.get(
      `${
        import.meta.env.VITE_ERP_BASE_URL
      }/master_code?category=${category}&class=${className}`,
      {
        method: "GET",
      }
    );
    setState(res.data);
  } catch (err) {
    console.log("hello");
  }
}
