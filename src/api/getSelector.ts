import { CustomerMasterCodeType } from "../interface/customerType";

export async function getSelector(
  setSelectorData: React.Dispatch<React.SetStateAction<CustomerMasterCodeType>>,
  menu: string
): Promise<void> {
  try {
    if (menu == "customer") {
      const response = await fetch(
        `http://10.0.102.63:3001/master_code?category=customer&class=sales_type&category=customer&class=customer_type`
      );
      const json = await response.json();
      setSelectorData(json);
    } else if (menu == "person") {
      const response = await fetch(
        `http://10.0.102.63:3001/master_code?/master_code?category=person&class=title&category=role&class=null`
      );
      const json = await response.json();
      setSelectorData(json);
    }
  } catch (err) {
    console.log(err);
  }
}
