import { useEffect, useState } from "react";
import Divider from "../components/Divider";
import Input from "../components/Input";
import Form from "../components/Form";
import Selector from "../components/Selector";
import { MasterCode } from "../interface/mastercodeType";
import { getMasterCode } from "../api/getMasterCode";
import ButtonRightFrame from "../components/ฺButtonRightFrame";
import Button from "../components/Button";
import { Link, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setEditContactInCustomer } from "../features/editCustomerSlice";
import { setAddNewContactNewInCustomer } from "../features/addNewCustomerSlice";
import { setDisplayContact } from "../features/displaySlice";
import InputFrame from "../components/InputFrame";
import { Contact, putPostContact } from "../interface/reduxType";
import { v4 as uuidv4 } from "uuid";

export default function Main_AddNew_Contact() {
  const initContactType: MasterCode = {
    message: "",
    status: 0,
    response: [[{ code_id: 0, category: "", class: "", value: "" }]],
  };

  // React-Router
  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  const menu = segments[0];

  // Redux
  const [contactType, setContactType] = useState<MasterCode>(initContactType);
  const dispatch = useDispatch();

  useEffect(() => {
    getMasterCode(setContactType, "contact", null);
  }, []);

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

    const uuid = uuidv4();

    const putPostContact: putPostContact = {
      uuid: uuid,
      contact_code_id: contact_code_id,
      value: value,
    };

    const displayContact: Contact = {
      uuid: uuid,
      contact_id: "-",
      contact_type: contactType,
      value: value,
      owner_name: "-",
    };
    console.log(contactType);

    dispatch(setDisplayContact(displayContact));

    if (menu == "customer") {
      dispatch(setEditContactInCustomer(putPostContact));
      dispatch(setAddNewContactNewInCustomer(putPostContact));
    } else if (menu == "person") {
    } else if (menu == "address") {
    }
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
