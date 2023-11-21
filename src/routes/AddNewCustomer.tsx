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
import { errorPopUpState } from "../features/errorPopUpSlice";
import { ErrorPopUp } from "../interface/componentType";
import { SendCustomer } from "../interface/customerType";

interface Props {
  addNew2OEdit?: string;
  addNew1OId: string | number;
}

export default function AddNewCustomer({ addNew2OEdit, addNew1OId }: Props) {
  const addOEditCustomer: SendCustomer = useSelector(addOEditCustomerState);
  const [selectorData, setSelectorData] = useState<MasterCode>();

  // Redux
  const dispatch = useDispatch();
  const errorPopUp: ErrorPopUp = useSelector(errorPopUpState);

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
          required={
            errorPopUp.active && !addOEditCustomer.customer.customer_name
          }
        />
        <Selector
          label="ลักษณะลูกค้า*"
          selectorData={selectorData?.response[1]}
          type={"selector"}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          required={
            errorPopUp.active &&
            !addOEditCustomer.customer.customer_type_code_id
          }
        />
        <Selector
          label="ประเภทลูกค้า*"
          selectorData={selectorData?.response[0]}
          type={"selector"}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          required={
            errorPopUp.active && !addOEditCustomer.customer.sales_type_code_id
          }
        />
      </InputFrame>
    </Fragment>
  );
}
