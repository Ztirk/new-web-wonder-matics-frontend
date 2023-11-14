import { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getSelector } from "../api/getSelector";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Divider from "../components/Table/Divider";
import { addOEditAddressState } from "../features/addOEdit/addOEditAddressSlice";
import { SendAddress } from "../interface/addressType";
import { MasterCode } from "../interface/mastercodeType";
import { addOEditFleetState } from "../features/addOEdit/addOEditFleetSlice";
import Selector from "../components/Input/Selector";
import Button from "../components/Button/Button";
import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";
import { Fleet, SendFleet } from "../interface/fleetType";
import getFleet from "../api/getFleet";

interface Props {
  addNew1OId: string;
  addNew2OEdit: string;
}

export default function AddNewFleet({ addNew1OId, addNew2OEdit }: Props) {
  const [fleetSelector, setFleetSelector] = useState<Fleet>();
  // Router
  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];

  // Redux
  const dispatch = useDispatch();
  const addOEditFleet: SendFleet = useSelector(addOEditFleetState);

  // useEffect
  useEffect(() => {
    getFleet(setFleetSelector);
  }, []);

  const handleClickSave = () => {};
  return (
    <Fragment>
      {/* ฟลีต */}
      <Divider title="ข้อมูลฟลีต" />
      <InputFrame>
        <Input
          label="ชื่อฟลีต"
          placeholder="ชื่อฟลีต"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Selector
          label="ชื่อหัวฟลีต"
          type="search-selector"
          fleetSelector={fleetSelector}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
      </InputFrame>
      {menu !== "vehicle" ? (
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
