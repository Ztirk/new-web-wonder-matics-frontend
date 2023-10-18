import { Fragment, useEffect, useState } from "react";
import Divider from "../components/Divider";
import InputFrame from "../components/InputFrame";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonLeftFrame from "../components/ButtonLeftFrame";
import Selector from "../components/Selector";
import Table from "../components/Table";
import ButtonRightFrame from "../components/ฺButtonRightFrame";
import { CustomerIndividual } from "../interface/dataType";
import { fetchCustomerTypes } from "../api/getData";
import { getPopUpData } from "../api/getPopUpData";
import { postNewCustomer } from "../api/postNewCustomer";
import { PopUpComponent } from "../interface/componentType";
import AddExistPopup from "../components/AddExistPopup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Thead from "../components/Thead";
import Tbody from "../components/Tbody";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewState,
  setAddressExist,
  setCustomer,
  setPersonExist,
} from "../features/addNewReducer";
import { MasterCode } from "../interface/mastercodeType";
import {
  displayState,
  setDisplayAddress,
  setDisplayPerson,
} from "../features/displayReducer";
import Tr from "../components/Tr";
import Th from "../components/Th";
import Td from "../components/Td";
import { Person } from "../interface/personType";
import Option from "../components/Option";
import { Address } from "../interface/reduxType";

export default function Main_AddNew() {
  // เก็บข้อมูล Selector
  const [selectorData, setSelectorData] = useState<MasterCode>();

  // โหลดข้อมูล Selector
  useEffect(() => {
    fetchCustomerTypes(setSelectorData);
  }, []);

  // เก็บข้อมูล
  const [addExistData, setAddExistData] = useState<CustomerIndividual>();

  const defaultToggleAddExist: PopUpComponent = {
    backdrop: false,
    type: "",
  };
  const [toggleAddExist, setToggleAddExist] = useState<PopUpComponent>(
    defaultToggleAddExist
  );

  useEffect(() => {
    if (!toggleAddExist.backdrop) {
      navigate("");
    }
  }, [toggleAddExist.backdrop]);

  // ReactRouter
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.search) {
      getPopUpData(setAddExistData);
    }
  }, [location]);

  // Redux
  const addNewData = useSelector(addNewState);
  const displayData = useSelector(displayState);

  useEffect(() => {}, [displayData]);

  // เพิ่มข้อมูลใหม่เมื่อใน State ได้กรอกชื่อลูกค้า ลักษณะลูกค้า และประเภทลูกค้า แล้ว
  useEffect(() => {
    console.log(addNewData);
    if (
      addNewData.customer &&
      addNewData.customer.customer_type_code_id &&
      addNewData.customer.sales_type_code_id
    ) {
      postNewCustomer(addNewData);
    }
  }, [addNewData]);

  const handleToggleAddExist: (data: PopUpComponent) => void = (data) => {
    if (data.type == "person") {
      setToggleAddExist({
        type: "person",
        backdrop: true,
      });
    } else if (data.type == "address") {
      setToggleAddExist({
        type: "address",
        backdrop: true,
      });
    }
  };

  const handleSelectedPerson: () => void = () => {
    const add_exist_person_id: string[] = [];
    const selectedPersonElem = document.querySelectorAll("#selected-person-id");
    const personData: Person[] = [];

    selectedPersonElem.forEach((elem, i) => {
      if (selectedPersonElem[i].childNodes[0].childNodes[0].checked == true) {
        const childNodes = elem.childNodes;
        const person: Person = {
          person_id: elem.getAttribute("data-id"),
          fullname: childNodes[3].textContent,
          mobile: childNodes[4].textContent,
          email: childNodes[5].textContent,
          description: childNodes[6].textContent,
          role: childNodes[7].textContent,
        };
        personData.push(person);
        add_exist_person_id.push(elem.getAttribute("data-id"));
      }
    });
    dispatch(setDisplayPerson(personData));
    dispatch(setPersonExist(add_exist_person_id));

    handleToggleAddExistCancel();
  };

  const handleSelectedAddress = () => {
    const add_exist_address_id: string[] = [];
    const selectedAddressElem = document.querySelectorAll(
      "#selected-address-id"
    );
    const addressData: Address[] = [];

    selectedAddressElem.forEach((elem, i) => {
      if (selectedAddressElem[i].childNodes[0].childNodes[0].checked == true) {
        const address: Address = {};
        const childNodes = elem.childNodes;
        address["address_id"] = elem.getAttribute("data-id");
        address["location"] = childNodes[3].textContent;
        address["address_type"] = childNodes[4].textContent;
        addressData.push(address);
        add_exist_address_id.push(elem.getAttribute("data-id"));
      }
    });
    dispatch(setDisplayAddress(addressData));
    dispatch(setAddressExist(add_exist_address_id));

    handleToggleAddExistCancel();
  };

  const handleToggleAddExistCancel: () => void = () => {
    setToggleAddExist(defaultToggleAddExist);
    setAddExistData();
  };

  const handleAddNewData: () => void = () => {
    const customer_name = document.querySelector("input")?.value;
    const customer_type_code_id =
      document.querySelectorAll("select")[0].options[
        document.querySelectorAll("select")[0].selectedIndex
      ].id;
    const sales_type_code_id =
      document.querySelectorAll("select")[1].options[
        document.querySelectorAll("select")[1].selectedIndex
      ].id;
    const customer = {
      customer_name: customer_name,
      customer_type_code_id: customer_type_code_id,
      sales_type_code_id: sales_type_code_id,
    };

    if (!customer_name || !customer_type_code_id || !sales_type_code_id) {
      alert("Fill In The Blank");
    } else {
      dispatch(setCustomer(customer));
    }
  };

  const handleExistAddNewData: () => void = () => {};

  const handleDeleteAddNewData: () => void = () => {};

  return (
    <>
      <AddExistPopup
        toggleAddExist={toggleAddExist}
        onCancel={handleToggleAddExistCancel}
        onConfirm={
          toggleAddExist.type == "person"
            ? handleSelectedPerson
            : toggleAddExist.type == "address"
            ? handleSelectedAddress
            : ""
        }
        popUpData={addExistData !== undefined ? addExistData : undefined}
        setPopUpData={setAddExistData}
      />
      <Divider title="ข้อมูลลูกค้า" />
      <InputFrame>
        <Input
          label="ชื่อลูกค้า"
          placeholder="ชื่อลูกค้า"
          type="regular"
          name="ชื่อลูกค้า"
        />
        <Selector
          label="ลักษณะลูกค้า"
          defaultValue="เลือกลักษณะลูกค้า"
          selectorData={selectorData}
          number={1}
          name="ลักษณะลูกค้า"
        />
        <Selector
          label="ประเภทลูกค้า"
          defaultValue="เลือกประเภทลูกค้า"
          selectorData={selectorData}
          number={0}
          name="ประเภทลูกค้า"
        />
      </InputFrame>

      <Divider title="ข้อมูลคน" />
      <ButtonLeftFrame>
        <Button name="เพิ่มใหม่" disabled={true} />
        <Button
          name="เพิ่มที่มี"
          type="person"
          onClick={() =>
            handleToggleAddExist({
              backdrop: true,
              type: "person",
            })
          }
        />
      </ButtonLeftFrame>

      {/* คน */}
      {displayData.person.length > 0 ? (
        <Table>
          <Fragment>
            <Thead id="person-thead">
              <Tr type="thead">
                {Object.keys(displayData.person[0]).map((columnName) => (
                  <Th key={columnName}>{columnName}</Th>
                ))}
                <Th>ตัวเลือก</Th>
              </Tr>
            </Thead>
            <Tbody id="person-tbody">
              {displayData.person.map((data) => (
                <Tr type="tbody" key={data.person_id}>
                  <Td>{data.person_id}</Td>
                  <Td>{data.fullname}</Td>
                  <Td>{data.email}</Td>
                  <Td>{data.mobile}</Td>
                  <Td>{data.description}</Td>
                  <Td>{data.role}</Td>
                  <Option
                    type="edit"
                    id={data.person_id}
                    // onDelete={handleDeletePerson}
                  ></Option>
                </Tr>
              ))}
            </Tbody>
          </Fragment>
        </Table>
      ) : (
        <></>
      )}

      <Divider title="ข้อมูลผู้ติดต่อ" />
      <ButtonLeftFrame>
        <Link to={`/customer/add-new-customer/add-new-contact`}>
          <Button name="เพิ่มใหม่" />
        </Link>
        <Button name="เพิ่มที่มี" disabled={true} />
      </ButtonLeftFrame>

      {/* ติดต่อ */}
      {displayData.contact.length > 0 ? (
        <Table>
          <Thead>
            <Tr type="thead">
              {Object.keys(displayData.contact[0]).map((columnName) => (
                <Td>{columnName}</Td>
              ))}
              <Td>ตัวเลือก</Td>
            </Tr>
          </Thead>
          <Tbody>
            {displayData.contact.map((data) => (
              <Tr type="tbody" key={data.contact_id}>
                <Td>{data.contact_id}</Td>
                <Td>{data.value}</Td>
                <Td>{data.contact_type}</Td>
                <Td>{data.owner_name}</Td>
                <Option
                  type="edit"
                  id={data.contact_id}
                  // onDelete={handleDeleteContact}
                ></Option>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <></>
      )}

      <Divider title="ข้อมูลที่อยู่" />
      <ButtonLeftFrame>
        <Button name="เพิ่มใหม่" disabled={true} />
        <Button
          name="เพิ่มที่มี"
          type="address"
          onClick={() =>
            handleToggleAddExist({
              backdrop: true,
              type: "address",
            })
          }
        />
      </ButtonLeftFrame>

      {/* ที่อยู่ */}
      {displayData.address.length > 0 ? (
        <Table>
          <Fragment>
            <Thead id="address-thead">
              <Tr type="thead">
                {Object.keys(displayData.contact[0]).map((columnName) => (
                  <Td>{columnName}</Td>
                ))}
                <Td>ตัวเลือก</Td>
              </Tr>
            </Thead>
            <Tbody id="address-tbody">
              {displayData.address.map((data: Address) => (
                <Tr type="tbody" key={data.address_id}>
                  <Td>{data.RowNum}</Td>
                  <Td>{data.address_id}</Td>
                  <Td>{data.location}</Td>
                  <Td>{data.address_type}</Td>
                  <Option
                    type="edit"
                    id={data.address_id}
                    // onDelete={handleDeleteAddress}
                  ></Option>
                </Tr>
              ))}
            </Tbody>
          </Fragment>
        </Table>
      ) : (
        <></>
      )}

      <ButtonRightFrame>
        <Button name="บันทึก" onClick={handleAddNewData} type="submit" />
        <Link to={".."} relative="path">
          <Button name="ยกเลิก" />
        </Link>
      </ButtonRightFrame>
    </>
  );
}
