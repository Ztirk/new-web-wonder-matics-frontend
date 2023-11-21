import { Fragment, useEffect, useRef, useState } from "react";
import Divider from "../components/Table/Divider";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Selector from "../components/Input/Selector";
import { getSelector } from "../api/getSelector";
import { Link, useLocation } from "react-router-dom";
import { MasterCode } from "../interface/mastercodeType";
import { useSelector } from "react-redux";
import {
  addOEditPersonState,
  setDescription,
  setEmail,
  setFirstName,
  setLastName,
  setLine,
  setMobile,
  setNickName,
} from "../features/addOEdit/addOEditPersonSlice";
import { PersonIterate, SendPerson } from "../interface/personType";
import Button from "../components/Button/Button";
import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";
import { v4 as uuidv4 } from "uuid";
import { useDispatch } from "react-redux";
import { setDisplayPersonInteract } from "../features/displaySlice";
import { setPersonNew } from "../features/addNewOAddExistSlice";
import { Contact, ContactInMain, SendContact } from "../interface/contactType";

interface Props {
  addNew1OId?: string;
  addNew2OEdit?: string;
}

export default function AddNewPerson({ addNew1OId, addNew2OEdit }: Props) {
  // useState
  const [selectorData, setSelectorData] = useState<MasterCode>();

  // Router
  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];

  // Redux
  const dispatch = useDispatch();
  const addOEditPerson: SendPerson = useSelector(addOEditPersonState);

  // useEffect
  useEffect(() => {
    getSelector(setSelectorData, "person");
  }, []);

  const handleClickSave: () => void = () => {
    const personData = addOEditPerson.person;
    const person_id = uuidv4();
    const firstname = personData.firstname.trim();
    const lastname = personData.lastname.trim();
    const nickname = personData.nickname.trim();
    const title_code_id = personData.title_code_id;
    const title_type = selectorData?.response[0].find(
      (data) => data.code_id == title_code_id
    )?.value;
    const description = personData.description.trim();
    const role = personData.role;
    const roleDelete = personData.roleDelete;
    const displayRole = selectorData?.response[1]
      .reduce((acc, data) => {
        if (addOEditPerson.person.role.includes(data.code_id)) {
          return acc + ", " + data.value;
        }
        return acc;
      }, "")
      .slice(2);

    const mobile = {
      contact_code_id: 2,
      value: personData.mobile,
    };
    const email = {
      contact_code_id: 3,
      value: personData.email,
    };
    const line = {
      contact_code_id: 5,
      value: personData.email,
    };

    const contact = [];

    if (mobile.value) {
      contact.push(mobile);
    }
    if (email.value) {
      contact.push(email);
    }
    if (mobile.value) {
      contact.push(mobile);
    }

    const displayPersonData: PersonIterate = {
      person_id: person_id,
      RowNum: null,
      fullname: title_type + " " + firstname + " " + lastname,
      email: email.value,
      mobile: mobile.value,
      description: description,
      role: displayRole ? displayRole : "",
    };

    const sendPersonData: SendPerson & ContactInMain = {
      person: {
        description: description,
        firstname: firstname,
        lastname: lastname,
        nickname: nickname,
        person_id: person_id,
        role: role,
        roleDelete: roleDelete,
        title_code_id: title_code_id,
        mobile: mobile.value,
        email: email.value,
        line: line.value,
      },
      contactNew: contact,
    };

    dispatch(setPersonNew(sendPersonData));
    dispatch(setDisplayPersonInteract(displayPersonData));
  };

  return (
    <Fragment>
      <Divider title="ข้อมูลบุคคล" />
      <InputFrame>
        <Input
          label="ชื่อ*"
          placeholder="ชื่อ"
          type="regular"
          name="ชื่อ"
          defaultValue={addOEditPerson.person.firstname}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setFirstName(e.currentTarget.value));
          }}
        />
        <Input
          label="นามสกุล*"
          placeholder="นามสกุล"
          type="regular"
          defaultValue={addOEditPerson.person.lastname}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setLastName(e.currentTarget.value));
          }}
        />
        <Selector
          label="คำนำหน้า*"
          type="selector"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          selectorData={selectorData?.response[0]}
        />
        <Input
          label="ชื่อเล่น"
          placeholder="ชื่อเล่น"
          type="regular"
          defaultValue={addOEditPerson.person.nickname}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNickName(e.currentTarget.value));
          }}
        />
        <Selector
          label="ตำแหน่ง*"
          type="multi-selector"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          selectorData={selectorData?.response[1]}
        />
        <Input
          label="รายละเอียด"
          placeholder="รายละเอียด"
          type="regular"
          defaultValue={addOEditPerson.person.description}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setDescription(e.currentTarget.value));
          }}
        />
        {menu !== "person" ? (
          <>
            <Input
              label="มือถือ"
              placeholder="มือถือ"
              type="regular"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setMobile(e.currentTarget.value));
              }}
            />
            <Input
              label="อีเมล์"
              placeholder="อีเมล์"
              type="regular"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setEmail(e.currentTarget.value));
              }}
            />
            <Input
              label="ไลน์"
              placeholder="ไลน์"
              type="regular"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setLine(e.currentTarget.value));
              }}
            />
          </>
        ) : (
          <></>
        )}
      </InputFrame>
      {menu !== "person" ? (
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
