import { Fragment, useEffect, useState } from "react";
import Selector from "../components/Selector";
import Divider from "../components/Divider";
import Input from "../components/Input";
import InputFrame from "../components/InputFrame";
import { MasterCode } from "../interface/mastercodeType";
import { useSelector } from "react-redux";
import { addOEditCustomerState } from "../features/addOEditCustomerSlice";
import { getSelector } from "../api/getSelector";

interface Props {
  addNew2OEdit?: string;
  addNew1OId: string | number;
}

export default function AddNewCustomer({ addNew2OEdit, addNew1OId }: Props) {
  const addOEditCustomer = useSelector(addOEditCustomerState);
  const [selectorData, setSelectorData] = useState<MasterCode>();

  useEffect(() => {
    getSelector(setSelectorData, "customer");
  }, []);

  return (
    <Fragment>
      <Divider title="ข้อมูลลูกค้า" />
      <InputFrame>
        <Input
          label="ชื่อลูกค้า*"
          placeholder="ชื่อลูกค้า"
          defaultValue={addOEditCustomer.customer.customer_name}
          type="regular"
          name="ชื่อลูกค้า"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Selector
          label="ลักษณะลูกค้า*"
          selectorData={selectorData?.response[1]}
          type={"selector"}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Selector
          label="ประเภทลูกค้า*"
          selectorData={selectorData?.response[0]}
          type={"selector"}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
      </InputFrame>
    </Fragment>
  );
}
