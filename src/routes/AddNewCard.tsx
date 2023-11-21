import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Divider from "../components/Table/Divider";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { MasterCode } from "../interface/mastercodeType";
import { SendCard } from "../interface/cardType";
import { addOEditCardState } from "../features/addOEdit/addOEditCardSlice";
import Selector from "../components/Input/Selector";
import { getSelector } from "../api/getSelector";
import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";
import Button from "../components/Button/Button";

interface Props {
  addNew1OId: string;
  addNew2OEdit: string;
}

export default function AddNewCard({ addNew1OId, addNew2OEdit }: Props) {
  const [selectorData, setSelectorData] = useState<MasterCode>();

  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];

  const dispatch = useDispatch();
  const addOEditCard: SendCard = useSelector(addOEditCardState);

  // useEffect
  useEffect(() => {
    getSelector(setSelectorData, "card");
  }, []);

  const handleClickSave = () => {};
  return (
    <Fragment>
      <Divider title="ข้อมูลบัตร" />
      <InputFrame>
        <Selector
          label={"ประเภทบัตร*"}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          type={"selector"}
          selectorData={selectorData?.response[0]}
        />
        <Input label="รายละเอียดบัตร" type="regular" />
      </InputFrame>
      {menu !== "card" ? (
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
