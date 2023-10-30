import axios from "axios";
import { Customer } from "../interface/dataType";

// Get ข้อมูลในส่วนของหน้า Main
export async function getData(
  setData: React.Dispatch<React.SetStateAction<Customer>>,
  module: string,
  setLoading: Boolean
): Promise<void> {
  setLoading(true);
  try {
    const url = new URL(window.location.href);
    let page = url.searchParams.get("page");
    const filter = url.searchParams.get("filter");
    if (filter === null) {
      const res = await axios.get(
        `${import.meta.env.VITE_ERP_BASE_URL}/${module}?page=1`,
        {
          method: "GET",
        }
      );
      setData(res.data);
    } else if (!filter.length) {
      if (!page?.length) page = "1";
      const res = await axios.get(
        `${import.meta.env.VITE_ERP_BASE_URL}/${module}?page=${page}`,
        {
          method: "GET",
        }
      );
      setData(res.data);
    } else if (filter.length > 0) {
      if (!page?.length) page = "1";
      const res = await axios.get(
        `${
          import.meta.env.VITE_ERP_BASE_URL
        }/${module}?page=${page}&filter=${filter}`,
        { method: "GET" }
      );
      setData(res.data);
    }
  } catch (err) {
    console.log(err);
  } finally {
    setLoading(false);
  }
}
