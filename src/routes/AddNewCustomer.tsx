import { Fragment } from "react";
import Selector from "../components/Selector";
import Divider from "../components/Divider";
import Input from "../components/Input";
import InputFrame from "../components/InputFrame";
import { IndividualData } from "../interface/dataType";
import { MasterCode } from "../interface/mastercodeType";

interface Props extends ChildNode {
  individualData?: IndividualData;
  edit?: string;
  addNewOId: string | number;
  selectorData: MasterCode;
}

export default function AddNewCustomer({
  individualData,
  edit,
  selectorData,
  addNewOId,
}: Props) {
  return (
    <Fragment>
      <Divider title="ข้อมูลลูกค้า" />
      <InputFrame>
        <Input
          label="ชื่อลูกค้า"
          placeholder="ชื่อลูกค้า"
          defaultValue={
            individualData &&
            "customer" in individualData.response &&
            !Array.isArray(individualData.response.customer)
              ? individualData.response.customer.customer_name
              : ""
          }
          type="regular"
          name="ชื่อลูกค้า"
          disabled={!edit && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Selector
          label="ลักษณะลูกค้า"
          defaultValue={
            individualData &&
            "customer" in individualData.response &&
            !Array.isArray(individualData.response.customer)
              ? individualData.response.customer.customer_type
              : "เลือกลักษณะลูกค้า"
          }
          selectorData={selectorData}
          number={1}
          name="ลักษณะลูกค้า"
          disabled={!edit && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Selector
          label="ประเภทลูกค้า"
          defaultValue={
            individualData &&
            "customer" in individualData.response &&
            !Array.isArray(individualData.response.customer)
              ? individualData.response.customer.sales_type
              : "เลือกประเภทลูกค้า"
          }
          selectorData={selectorData}
          number={0}
          name="ประเภทลูกค้า"
          disabled={!edit && !isNaN(Number(addNewOId)) ? true : false}
        />
      </InputFrame>
    </Fragment>
  );
}
