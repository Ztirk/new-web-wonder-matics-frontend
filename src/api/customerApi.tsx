import axios from "axios";
import {
  AddNewData,
  Customer,
  IndividualData,
  CustomerMasterCodeType,
  EditedData,
} from "../interface/customerType";
import { MasterCode } from "../interface/mastercodeType";

export async function fetchData(
  setData: React.Dispatch<React.SetStateAction<Customer>>,
  module: string
): Promise<void> {
  try {
    const url = new URL(window.location.href);
    let page = url.searchParams.get("page");
    const filter = url.searchParams.get("filter");
    if (filter === null) {
      const res = await axios.get(
        `https://9309-203-144-233-121.ngrok-free.app/${module}?page=1`,
        { method: "GET" }
      );
      setData(res.data);
    } else if (!filter.length) {
      if (!page?.length) page = "1";
      const res = await axios.get(
        `https://9309-203-144-233-121.ngrok-free.app/${module}?page=${page}`,
        { method: "GET" }
      );
      setData(res.data);
    } else if (filter.length > 0) {
      if (!page?.length) page = "1";
      const res = await axios.get(
        `https://9309-203-144-233-121.ngrok-free.app/${module}?page=${page}&filter=${filter}`,
        { method: "GET" }
      );
      setData(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}

export async function fetchIndividualData(
  id: string,
  setDataIndividal: React.Dispatch<React.SetStateAction<IndividualData>>,
  module: string
): Promise<void> {
  try {
    const response = await fetch(
      `https://9309-203-144-233-121.ngrok-free.app/${module}/${id}`
    );
    const json = await response.json();
    setDataIndividal(json);
  } catch (err) {
    console.log(err);
  }
}

export async function fetchCustomerTypes(
  setSelectorData: React.Dispatch<React.SetStateAction<CustomerMasterCodeType>>
): Promise<void> {
  try {
    const responseCustomerType = await fetch(
      `https://9309-203-144-233-121.ngrok-free.app/master_code?category=customer&class=sales_type&category=customer&class=customer_type`
    );
    const jsonCustomerType = await responseCustomerType.json();
    setSelectorData(jsonCustomerType);
  } catch (err) {
    console.log(err);
  }
}

export async function fetchDataByPageNFilter(
  setData: React.Dispatch<React.SetStateAction<Customer>>,
  module: string
) {
  const url = new URL(window.location.href);
  let page = url.searchParams.get("page");
  const filter = url.searchParams.get("filter");
  if (filter == "") {
    if (page == "") {
      fetchData(setData);
    } else if (page !== "") {
      const response = await fetch(
        `https://9309-203-144-233-121.ngrok-free.app/${module}?page=${page}`
      );
      const json = await response.json();
      setData(json);
    }
  } else if (filter !== "") {
    if (page == "") page = "1";
    const response = await fetch(
      `https://9309-203-144-233-121.ngrok-free.app/${module}?page=${page}&filter=${filter}`
    );
    const json = await response.json();
    setData(json);
  }
}

export async function fetchIndividualDataData(
  setIndividualDataData: React.Dispatch<React.SetStateAction<IndividualData>>
) {
  const url = new URL(window.location.href);
  const personFilter = url.searchParams.get("personFilter");
  const addressFilter = url.searchParams.get("addressFilter");

  if (personFilter) {
    const res = await fetch(
      `https://9309-203-144-233-121.ngrok-free.app/person?filter=${personFilter}`,
      {
        method: "GET",
      }
    );
    const json = await res.json();
    setIndividualDataData(json);
  } else if (addressFilter) {
    const res = await fetch(
      `https://9309-203-144-233-121.ngrok-free.app/address?filter=${addressFilter}`,
      {
        method: "GET",
      }
    );
    const json = await res.json();
    setIndividualDataData(json);
  }
}

export async function deleteCustomer(id: string) {
  try {
    const res = await fetch(
      `https://9309-203-144-233-121.ngrok-free.app/customer/${id}`,
      { method: "DELETE" }
    );
    const json = await res.json();
    console.log(json);
    window.location.reload();
  } catch (err) {
    console.log(err);
  }
}

export async function putEditedData(data: EditedData, id: string) {
  try {
    const res = await fetch(
      `https://9309-203-144-233-121.ngrok-free.app/customer/${id}`,
      {
        method: "PUT",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const json = await res.json();
    console.log(json);
    window.location.href = "/customer";
  } catch (err) {
    console.log(err);
  }
}

export async function postNewCustomer(addNewData: AddNewData) {
  try {
    const res = await fetch(
      "https://9309-203-144-233-121.ngrok-free.app/customer",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(addNewData),
      }
    );
    const json = await res.json();
    console.log(json);
    window.location.href = "/customer";
  } catch (err) {
    console.log(err);
  }
}

export async function getMasterCode(
  setState: React.Dispatch<React.SetStateAction<MasterCode>>,
  category: string,
  className: string | null
): Promise<void> {
  try {
    const res = await fetch(
      `https://9309-203-144-233-121.ngrok-free.app/master_code?category=${category}&class=${className}`,
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
