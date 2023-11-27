import axios from "axios";
import { MasterCode } from "../interface/mastercodeType";
import { FleetIterate } from "../interface/fleetType";

export async function getSelector(
  setSelectorData: React.Dispatch<React.SetStateAction<MasterCode | undefined>>,
  menu: string
): Promise<void> {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_ERP_BASE_URL}/select/master_code?${
        menu == "customer"
          ? "category=customer&class=sales_type&category=customer&class=customer_type"
          : menu == "person"
          ? "category=person&class=title&category=role&class=null"
          : menu == "address"
          ? "category=address&class=null&category=address&class=person&category=address&class=customer"
          : menu == "contact"
          ? "category=contact&class=null"
          : menu == "vehicle"
          ? "category=vehicle&class=type&category=vehicle&class=registration_type&category=vehicle&class=registration_province&category=vehicle&class=driving_license"
          : menu == "document"
          ? "category=document&class=customer&category=document&class=person&category=document&class=address"
          : menu == "card"
          ? "category=card&class=null"
          : menu == "device-serial"
          ? "category=device&class=type"
          : menu == "device"
          ? ""
          : ""
      }`
    );
    setSelectorData(res.data);
  } catch (err) {
    if (axios.isAxiosError(err)) {
      console.log(err.response?.data);
    }
  }
}
