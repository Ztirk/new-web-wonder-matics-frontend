import { Fragment, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Divider from "../components/Table/Divider";
import { addOEditAddressState } from "../features/addOEdit/addOEditAddressSlice";
import { SendAddress } from "../interface/addressType";
import { getSelector } from "../api/getSelector";
import { MasterCode } from "../interface/mastercodeType";
import { Link, useLocation } from "react-router-dom";
import Selector from "../components/Input/Selector";
import Button from "../components/Button/Button";
import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";

interface Props {
  addNew1OId: string;
  addNew2OEdit: string;
}

export default function AddNewAddress({ addNew1OId, addNew2OEdit }: Props) {
  const [selectorData, setSelectorData] = useState<MasterCode>();

  // Router
  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];

  // Redux
  const dispatch = useDispatch();
  const addOEditAddress: SendAddress = useSelector(addOEditAddressState);

  // useEffect
  useEffect(() => {
    getSelector(setSelectorData, "address");
  }, []);

  const handleClickSave = () => {};

  return (
    <Fragment>
      <Divider title="ข้อมูลที่อยู่" />
      <InputFrame>
        <Selector
          label="ประเภทที่อยู่"
          selectorData={selectorData?.response[0].concat(
            selectorData.response[2]
          )}
          type="multi-selector"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="เลขที่"
          placeholder="เลขที่"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="หมู่ที่"
          placeholder="หมู่ที่"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="ซอย"
          placeholder="ซอย"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="ถนน"
          placeholder="ถนน"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="ตำบล/แขวง"
          placeholder="ตำบล/แขวง"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="อำเภอ/เขต"
          placeholder="อำเภอ/เขต"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="จังหวัด"
          placeholder="จังหวัด"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="รหัสไปรษณีย์"
          placeholder="รหัสไปรษณีย์"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
      </InputFrame>
      {menu !== "address" ? (
        <ButtonRightFrame>
          <Link to=".." relative="path">
            <Button name="บันทึก" onClick={handleClickSave} />
          </Link>
          <Link to=".." relative="path">
            <Button name="ยกเลิก" />
          </Link>
        </ButtonRightFrame>
      ) : (
        <></>
      )}
    </Fragment>
  );
}
