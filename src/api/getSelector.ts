import axios from "axios";
import { CustomerMasterCodeType } from "../interface/dataType";

export async function getSelector(
  setSelectorData: React.Dispatch<React.SetStateAction<CustomerMasterCodeType>>,
  menu: string
): Promise<void> {
  try {
    if (menu == "customer") {
      const res = await axios.get(
        `${
          import.meta.env.VITE_ERP_BASE_URL
        }/master_code?category=customer&class=sales_type&category=customer&class=customer_type`
      );
      setSelectorData(res.data);
    } else if (menu == "person") {
      const res = await axios.get(
        `${
          import.meta.env.VITE_ERP_BASE_URL
        }/master_code?category=person&class=title&category=role&class=null`
      );
      setSelectorData(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}
