import { useEffect, useState } from "react";
import Divider from "../components/Divider";
import Input from "../components/Input";
import Form from "../components/Form";
import Selector from "../components/Selector";
import { MasterCode } from "../interface/mastercodeType";
import { getMasterCode } from "../api/getMasterCode";
import ButtonRightFrame from "../components/ฺButtonRightFrame";
import Button from "../components/Button";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setContact } from "../features/editedReducer";
import { setContactNew } from "../features/addNewReducer";
import { setDisplayContact } from "../features/displayReducer";
import InputFrame from "../components/InputFrame";
import { Contact, putPostContact } from "../interface/reduxType";

export default function Main_AddNew_Contact() {
  const initContactType: MasterCode = {
    message: "",
    status: 0,
    response: [[{ code_id: 0, category: "", class: "", value: "" }]],
  };
  const [contactType, setContactType] = useState<MasterCode>(initContactType);
  const dispatch = useDispatch();

  useEffect(() => {
    getMasterCode(setContactType, "contact", null);
  }, []);

  //
  const handleAddNewContact = () => {
    const selectElem = document.getElementById(
      "ประเภทการติดต่อ"
    ) as HTMLSelectElement;
    const contact_code_id = Number(
      selectElem.options[selectElem.selectedIndex].id
    );
    const contactType =
      selectElem.options[selectElem.selectedIndex].textContent;
    const value = (
      document.getElementById("รายละเอียดการติดต่อ") as HTMLInputElement
    ).value;

    const putPostContact: putPostContact = {
      contact_code_id: contact_code_id,
      value: value,
    };

    const displayContact: Contact = {
      contact_id: "-",
      contact_type: contactType,
      value: value,
      owner_name: "-",
    };
    console.log(contactType);

    dispatch(setDisplayContact(displayContact));
    dispatch(setContact(putPostContact));
    dispatch(setContactNew(putPostContact));
  };

  return (
    <>
      <Divider title="ข้อมูลการติดต่อ" />
      <InputFrame>
        <Selector
          selectorData={contactType}
          label={"ประเภทการติดต่อ"}
          defaultValue={"เลือกประเภทการติดต่อ"}
          defaultId={""}
          number={0}
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
          <Button name="บันทึก" onClick={handleAddNewContact} />
        </Link>

        <Link to=".." relative="path">
          <Button name="ยกเลิก" />
        </Link>
      </ButtonRightFrame>
    </>
  );
}
