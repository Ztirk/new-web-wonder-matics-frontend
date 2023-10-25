import axios from "axios";
import { Customer, CustomerMasterCodeType } from "../interface/customerType";
import { MasterCode } from "../interface/mastercodeType";

// Get ข้อมูลในส่วนของหน้า Main
export async function fetchData(
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
      const res = await axios.get(`http://10.0.102.63:3001/${module}?page=1`, {
        method: "GET",
      });
      setData(res.data);
    } else if (!filter.length) {
      if (!page?.length) page = "1";
      const res = await axios.get(
        `http://10.0.102.63:3001/${module}?page=${page}`,
        {
          method: "GET",
        }
      );
      setData(res.data);
    } else if (filter.length > 0) {
      if (!page?.length) page = "1";
      const res = await axios.get(
        `http://10.0.102.63:3001/${module}?page=${page}&filter=${filter}`,
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

