import { useEffect, useState } from "react";
import Divider from "../components/Table/Divider";
import Input from "../components/Input/Input";
import Selector from "../components/Input/Selector";
import { MasterCode } from "../interface/mastercodeType";

import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";
import Button from "../components/Button/Button";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputFrame from "../components/Input/InputFrame";
import { Contact, putPostContact } from "../interface/reduxType";
import { v4 as uuidv4 } from "uuid";
import { getSelector } from "../api/getSelector";

export default function AddNewContact() {
  const [selectorData, setSelectorData] = useState<MasterCode>();

  useEffect(() => {
    getSelector(setSelectorData, "contact");
  }, []);

  return (
    <>
      <Divider title="ข้อมูลการติดต่อ" />
      <InputFrame>
        <Selector
          selectorData={selectorData?.response[0]}
          label={"ประเภทการติดต่อ"}
          defaultValue={"เลือกประเภทการติดต่อ"}
          id={"ประเภทการติดต่อ"}
        />
        <Input
          label={"รายละเอียดการติดต่อ"}
          type={"regular"}
          id="รายละเอียดการติดต่อ"
        />
      </InputFrame>
      <ButtonRightFrame>
        <Link to=".." relative="path">
          <Button name="บันทึก" />
        </Link>

        <Link to=".." relative="path">
          <Button name="ยกเลิก" />
        </Link>
      </ButtonRightFrame>
    </>
  );
}
