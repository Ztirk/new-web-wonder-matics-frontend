import React, { useEffect, useState } from "react";
import Divider from "../components/Table/Divider";
import Input from "../components/Input/Input";
import Selector from "../components/Input/Selector";
import { MasterCode } from "../interface/mastercodeType";

import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";
import Button from "../components/Button/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import InputFrame from "../components/Input/InputFrame";
import { v4 as uuidv4 } from "uuid";
import { getSelector } from "../api/getSelector";
import { useSelector } from "react-redux";
import {
  addOEditContactState,
  setDefaultContact,
  setValue,
} from "../features/addOEdit/addOEditContactSlice";
import {
  ContactIterate,
  SendContact,
  SendContactShape,
} from "../interface/contactType";
import { setContactNew } from "../features/addNewOAddExistSlice";
import { SendCustomer } from "../interface/customerType";
import { addOEditCustomerState } from "../features/addOEdit/addOEditCustomerSlice";
import { setDisplayContactInteract } from "../features/displaySlice";
import {
  errorPopUpState,
  setErrorPopUpState,
} from "../features/errorPopUpSlice";
import { ErrorPopUpType } from "../interface/componentType";
import ErrorPopUp from "../components/PopUp/errorPopUp";

interface Props {
  addNew1OId: string | number;
  addNew2OEdit: string;
}

export default function AddNewContact({ addNew2OEdit, addNew1OId }: Props) {
  const [selectorData, setSelectorData] = useState<MasterCode>();

  // Router
  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const addOEditContact: SendContact = useSelector(addOEditContactState);
  const addOEditCustomer: SendCustomer = useSelector(addOEditCustomerState);
  const errorPopUp: ErrorPopUpType = useSelector(errorPopUpState);

  useEffect(() => {
    getSelector(setSelectorData, "contact");
  }, []);

  useEffect(() => {}, []);

  const handleClickSave = () => {
    const contactData = addOEditContact.contact;
    const contact_id = uuidv4();
    const contact_code_id = contactData.contact_code_id;
    const contact_type = selectorData?.response[0].find(
      (data) => data.code_id == contact_code_id
    )?.value;
    const value = contactData.value.trim();

    const newContact: SendContactShape = {
      contact_code_id: contact_code_id,
      contact_id: contact_id,
      value: value,
    };

    const displayContact: ContactIterate = {
      contact_id: contact_id,
      contact_type: contact_type ? contact_type : "",
      owner_name: addOEditCustomer.customer.customer_name,
      RowNum: null,
      value: value,
    };

    if (
      !addOEditContact.contact?.contact_code_id ||
      !addOEditContact.contact.value
    ) {
      dispatch(setErrorPopUpState({ active: true, message: "" }));
    } else {
      dispatch(setContactNew(newContact));
      dispatch(setDisplayContactInteract(displayContact));
      navigate("..", { relative: "path" });
    }
  };

  return (
    <>
      <Divider title="ข้อมูลการติดต่อ" />
      <InputFrame>
        <Selector
          selectorData={selectorData?.response[0]}
          label={"ประเภทการติดต่อ*"}
          type="selector"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          required={
            errorPopUp.active && !addOEditContact.contact?.contact_code_id
          }
        />
        <Input
          label={"รายละเอียดการติดต่อ*"}
          type={"regular"}
          id="รายละเอียดการติดต่อ"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setValue(e.currentTarget.value));
          }}
          required={errorPopUp.active && !addOEditContact.contact?.value}
        />
      </InputFrame>
      {menu == "contact" ? (
        <>
          <Divider title="ข้อมูลเจ้าของ" />
          <InputFrame>
            <Selector
              selectorData={[
                {
                  code_id: -1,
                  category: "personOcustomer",
                  class: null,
                  value: "บุคคล",
                },
                {
                  code_id: -2,
                  category: "personOcustomer",
                  class: null,
                  value: "ลูกค้า",
                },
              ]}
              label={"ประเภทเจ้าของ*"}
              type="selector"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              required={
                errorPopUp.active &&
                !addOEditContact.contact?.customer_id &&
                !addOEditContact.contact?.person_id
              }
            />
            <Selector
              selectorData={selectorData?.response[0]}
              label={"ชื่อเจ้าของ"}
              type="selector"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              required={
                errorPopUp.active && !addOEditContact.contact?.contact_code_id
              }
            />
          </InputFrame>
        </>
      ) : (
        <></>
      )}
      <ButtonRightFrame>
        {menu !== "contact" ? (
          <>
            <Button name="บันทึก" onClick={handleClickSave} />

            <Link to=".." relative="path">
              <Button name="ยกเลิก" />
            </Link>
          </>
        ) : (
          <></>
        )}
      </ButtonRightFrame>
    </>
  );
}
