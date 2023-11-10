import { Fragment, useEffect, useState } from "react";
import Selector from "../components/Input/Selector";
import Divider from "../components/Table/Divider";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import { MasterCode } from "../interface/mastercodeType";
import { useSelector } from "react-redux";
import {
  addOEditCustomerState,
  setCustomerName,
} from "../features/addOEdit/addOEditCustomerSlice";
import { getSelector } from "../api/getSelector";
import { useDispatch } from "react-redux";

interface Props {
  addNew2OEdit?: string;
  addNew1OId: string | number;
}

export default function AddNewCustomer({ addNew2OEdit, addNew1OId }: Props) {
  const addOEditCustomer = useSelector(addOEditCustomerState);
  const [selectorData, setSelectorData] = useState<MasterCode>();

  // Redux
  const dispatch = useDispatch();

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
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            dispatch(setCustomerName(e.currentTarget.value))
          }
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
