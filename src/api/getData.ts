import axios from "axios";
import {
  AddNewData,
  Customer,
  IndividualData,
  CustomerMasterCodeType,
  EditedData,
} from "../interface/dataType";
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
      const res = await axios.get(`http://10.0.102.87:3001/${module}?page=1`, {
        method: "GET",
      });
      setData(res.data);
    } else if (!filter.length) {
      if (!page?.length) page = "1";
      const res = await axios.get(
        `http://10.0.102.87:3001/${module}?page=${page}`,
        { method: "GET" }
      );
      setData(res.data);
    } else if (filter.length > 0) {
      if (!page?.length) page = "1";
      const res = await axios.get(
        `http://10.0.102.87:3001/${module}?page=${page}&filter=${filter}`,
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

export async function fetchCustomerTypes(
  setSelectorData: React.Dispatch<React.SetStateAction<CustomerMasterCodeType>>
): Promise<void> {
  try {
    const responseCustomerType = await fetch(
      `http://10.0.102.87:3001/master_code?category=customer&class=sales_type&category=customer&class=customer_type`
    );
    const jsonCustomerType = await responseCustomerType.json();
    setSelectorData(jsonCustomerType);
  } catch (err) {
    console.log(err);
  }
}

export async function deleteCustomer(id: string) {
  try {
    const res = await fetch(`http://10.0.102.87:3001/customer/${id}`, {
      method: "DELETE",
    });
    const json = await res.json();
    console.log(json);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}
