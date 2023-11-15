import axios from "axios";
import { MasterCode } from "../interface/mastercodeType";
import { FleetIterate } from "../interface/fleetType";

export async function getSelector(
  setSelectorData: React.Dispatch<React.SetStateAction<MasterCode | undefined>>,
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
    } else if (menu == "address") {
      const res = await axios.get(
        `${
          import.meta.env.VITE_ERP_BASE_URL
        }/master_code?category=address&class=null&category=address&class=person&category=address&class=customer`
      );
      setSelectorData(res.data);
    } else if (menu == "contact") {
      const res = await axios.get(
        `${
          import.meta.env.VITE_ERP_BASE_URL
        }/master_code?category=contact&class=null`
      );
      setSelectorData(res.data);
    } else if (menu == "vehicle") {
      const res = await axios.get(
        `${
          import.meta.env.VITE_ERP_BASE_URL
        }/master_code?category=vehicle&class=type&category=vehicle&class=registration_type&category=vehicle&class=registration_province&category=vehicle&class=driving_license`
      );
      setSelectorData(res.data);
    }
  } catch (err) {
    console.log(err);
  }
}
