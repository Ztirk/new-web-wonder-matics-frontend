import React, { Fragment, useEffect, useRef, useState } from "react";
import Button from "../components/Button";
import ButtonLeftFrame from "../components/ButtonLeftFrame";
import Divider from "../components/Divider";
import Input from "../components/Input";
import InputFrame from "../components/InputFrame";
import Selector from "../components/Selector";
import Table from "../components/Table";
import ButtonRightFrame from "../components/ฺButtonRightFrame";
import {
  Customer,
  IndividualData,
  CustomerMasterCodeType,
  EditedData,
} from "../interface/customerType";
import {
  fetchIndividualDataData,
  fetchCustomerTypes,
  fetchData,
  fetchIndividualData,
  putEditedData,
} from "../api/customerApi";
import { Link, Outlet, useLocation } from "react-router-dom";
import Tbody from "../components/Tbody";
import Thead from "../components/Thead";
import AddExistPopup from "../components/addExistPopup";
import { PopUpComponent } from "../interface/componentType";
import Th from "../components/Th";
import Tr from "../components/Tr";
import Td from "../components/Td";
import Option from "../components/Option";
import { useDispatch, useSelector } from "react-redux";
import {
  editedState,
  setAddressDelete,
  setAddressExist,
  setContactDelete,
  setCustomer,
  setDefault,
  setPersonDelete,
  setPersonExist,
} from "../features/editedReducer";

export default function Main_Edit() {
  const [dataIndividual, setDataIndividal] = useState<IndividualData>();
  const [selectorData, setSelectorData] = useState<CustomerMasterCodeType>();
  const [popUpData, setPopUpData] = useState<IndividualData>();
  const [domPerson, setDomPerson] = useState<IndividualData>();

  const editedData = useSelector(editedState);
  const dispatch = useDispatch();

  const defaultToggleAddExist = {
    backdrop: false,
    type: "",
  };
  const [toggleAddExist, setToggleAddExist] = useState<PopUpComponent>(
    defaultToggleAddExist
  );

  const location = useLocation();
  const segment = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const id = segment[1];
  const module = segment[0];

  useEffect(() => {
    fetchIndividualData(id, setDataIndividal, module);
    fetchCustomerTypes(setSelectorData);
  }, []);

  useEffect(() => {
    console.log(editedData);
    if (editedData.customer && editedData.customer.customer_type_code_id) {
      putEditedData(editedData, id);
    }
  }, [editedData]);

  useEffect(() => {
    if (location.search) {
      fetchIndividualDataData(setPopUpData);
    }

    if (editedData.personExist.length) {
      handleVerifyDomPerson();
    } else if (editedData.addressExist.length) {
    }
  }, [location]);

  const handleVerifyDomPerson = async () => {
    await fetchIndividualDataData();
    editedData.personExist.forEach((id, i) => {});
  };

  const handleConfirmEditedData: () => void = () => {
    const customer_name = document.querySelectorAll("input")[0].value;
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

  const handleConfirmSelectedPersonData = () => {
    const add_exist_person_id: string[] = [];
    const selectedPersonElem = document.querySelectorAll("#selected-person-id");
    const tablePersonElem = document.getElementById("person-tbody");

    selectedPersonElem.forEach((elem, i) => {
      if (selectedPersonElem[i].childNodes[0].childNodes[0].checked == true) {
        const createTrElem = document.createElement("tr");
        createTrElem.className = "h-[66.213px]";
        selectedPersonElem[i].childNodes.forEach((elem, j) => {
          if (j > 0) {
            const cloneNode =
              selectedPersonElem[i].childNodes[j].cloneNode(true);
            createTrElem.appendChild(cloneNode);
            if (j == 1) {
              add_exist_person_id.push(
                selectedPersonElem[i].childNodes[j].textContent
              );
            }
          }
        });

        const deleteButt = document.createElement("td");
        deleteButt.className = "border border-slate-300 px-3";
        const nav = document.createElement("nav");
        const ul = document.createElement("ul");
        const li = document.createElement("li");
        li.addEventListener("click", handleCreatedDeletePerson);
        li.className = "cursor-pointer";
        li.textContent = "ลบ";
        li.id = selectedPersonElem[i].childNodes[1].textContent;
        ul.append(li);
        nav.append(ul);
        deleteButt.append(nav);
        createTrElem.append(deleteButt);
        tablePersonElem?.append(createTrElem);
      }
    });
    dispatch(setPersonExist(add_exist_person_id));

    handleToggleAddExistCancel();
  };

  const handleConfirmSelectedAddressData = () => {
    const add_exist_address_id: string[] = [];
    const selectedAddressElem = document.querySelectorAll(
      "#selected-address-id"
    );
    const tableAddressElem = document.getElementById("address-tbody");
    selectedAddressElem.forEach((elem, i) => {
      if (selectedAddressElem[i].childNodes[0].childNodes[0].checked == true) {
        const createTrElem = document.createElement("tr");
        createTrElem.className = "h-[66.213px]";
        selectedAddressElem[i].childNodes.forEach((elem, j) => {
          if (j > 0) {
            const cloneNode =
              selectedAddressElem[i].childNodes[j].cloneNode(true);
            createTrElem.appendChild(cloneNode);
            if (j == 1) {
              add_exist_address_id.push(
                selectedAddressElem[i].childNodes[j].textContent
              );
            }
          }
        });

        const deleteButt = document.createElement("td");
        deleteButt.className = "border border-slate-300 px-3";
        const nav = document.createElement("nav");
        const ul = document.createElement("ul");
        const li = document.createElement("li");
        li.addEventListener("click", handleDeleteAddress);
        li.className = "cursor-pointer";
        li.textContent = "ลบ";
        ul.append(li);
        nav.append(ul);
        deleteButt.append(nav);
        createTrElem.append(deleteButt);
        tableAddressElem?.append(createTrElem);
      }
    });
    dispatch(setAddressExist(add_exist_address_id));

    handleToggleAddExistCancel();
  };

  const handleToggleAddExistCancel = () => {
    setToggleAddExist(defaultToggleAddExist);
    setPopUpData();
  };

  const handleSetBackdropPerson = () => {
    setToggleAddExist({ backdrop: true, type: "person" });
  };

  const handleSetBackdropAddress = () => {
    setToggleAddExist({ backdrop: true, type: "address" });
  };

  const handleCreatedDeletePerson = (e) => {
    const id = e.currentTarget.id;

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  const handleDeletePerson: (e: React.MouseEvent<HTMLLIElement>) => void = (
    e
  ) => {
    const person_id = e.currentTarget.id;

    dispatch(setPersonDelete(person_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  const handleDeleteAddress: (e: React.MouseEvent<HTMLLIElement>) => void = (
    e
  ) => {
    const address_id = e.currentTarget.id;

    dispatch(setAddressDelete(address_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  const handleDeleteContact: (e: React.MouseEvent<HTMLLIElement>) => void = (
    e
  ) => {
    const contact_id = e.currentTarget.id;

    dispatch(setContactDelete(contact_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  return (
    <Fragment>
      <AddExistPopup
        popUpData={popUpData}
        onCancel={handleToggleAddExistCancel}
        toggleAddExist={toggleAddExist}
        onConfirm={
          toggleAddExist.type == "person"
            ? handleConfirmSelectedPersonData
            : toggleAddExist.type == "address"
            ? handleConfirmSelectedAddressData
            : ""
        }
      />
      <Divider title="ข้อมูลลูกค้า" />
      <InputFrame>
        <Input
          label="ชื่อลูกค้า"
          placeholder="ชื่อลูกค้า"
          type="regular"
          defaultValue={dataIndividual?.response.customer.customer_name}
        />
        <Selector
          label="ลักษณะลูกค้า"
          defaultValue={dataIndividual?.response.customer.customer_type}
          defaultId={dataIndividual?.response.customer.customer_type_code_id}
          selectorData={selectorData}
          number={1}
        />
        <Selector
          label="ประเภทลูกค้า"
          defaultValue={dataIndividual?.response.customer.sales_type}
          defaultId={dataIndividual?.response.customer.sales_type_code_id}
          selectorData={selectorData}
          number={0}
        />
      </InputFrame>
      {/* เพิ่มข้อมูลคน */}
      <Divider title="ข้อมูลคน" />
      <ButtonLeftFrame>
        <Button name="เพิ่มใหม่" disabled={true} />
        <Button
          name="เพิ่มที่มี"
          type="person"
          onClick={handleSetBackdropPerson}
        />
      </ButtonLeftFrame>
      <Table>
        <Fragment>
          <Thead>
            {dataIndividual &&
            dataIndividual.response.person &&
            dataIndividual.response.person.length ? (
              <Tr type="thead">
                <Fragment>
                  {Object.keys(dataIndividual.response.person[0]).map(
                    (columnName) => (
                      <Th key={columnName}>{columnName}</Th>
                    )
                  )}
                  <Th>ตัวเลือก</Th>
                </Fragment>
              </Tr>
            ) : (
              <></>
            )}
          </Thead>
          <Tbody id="person-tbody">
            {dataIndividual &&
            dataIndividual.response.person &&
            dataIndividual.response.person.length ? (
              dataIndividual.response.person.map((data) => (
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
                    onDelete={handleDeletePerson}
                  ></Option>
                </Tr>
              ))
            ) : (
              <></>
            )}
          </Tbody>
        </Fragment>
      </Table>
      {/* เพิ่มข้อมูลผู้ติดต่อ */}
      <Divider title="ข้อมูลผู้ติดต่อ" />
      <ButtonLeftFrame>
        <Link to={`/customer/${id}/edit/add-new-contact`}>
          <Button name="เพิ่มใหม่" />
        </Link>
        <Button name="เพิ่มที่มี" disabled={true} />
      </ButtonLeftFrame>
      <Table>
        <Fragment>
          <Thead>
            {dataIndividual &&
            dataIndividual.response.contact &&
            dataIndividual.response.contact.length ? (
              <Tr type="thead">
                <Fragment>
                  {Object.keys(dataIndividual.response.contact[0]).map(
                    (columnName) => (
                      <Th key={columnName}>{columnName}</Th>
                    )
                  )}
                  <Th>ตัวเลือก</Th>
                </Fragment>
              </Tr>
            ) : (
              <></>
            )}
          </Thead>
          <Tbody id="contact-tbody">
            {dataIndividual &&
            dataIndividual.response.contact &&
            dataIndividual.response.contact.length ? (
              dataIndividual.response.contact.map((data) => (
                <Tr type="tbody" key={data.contact_id}>
                  <Td>{data.contact_id}</Td>
                  <Td>{data.contact_type}</Td>
                  <Td>{data.value}</Td>
                  <Option
                    type="edit"
                    id={data.contact_id}
                    onDelete={handleDeleteContact}
                  ></Option>
                </Tr>
              ))
            ) : (
              <></>
            )}
          </Tbody>
        </Fragment>
      </Table>
      <Table></Table>
      {/* เพิ่มข้อมูลที่อยู่ */}
      <Divider title="ข้อมูลที่อยู่" />
      <ButtonLeftFrame>
        <Button name="เพิ่มใหม่" disabled={true} />
        <Button
          name="เพิ่มที่มี"
          type="address"
          onClick={handleSetBackdropAddress}
        />
      </ButtonLeftFrame>
      <Table>
        {dataIndividual &&
        dataIndividual.response.address &&
        dataIndividual.response.address.length ? (
          <Fragment>
            <Thead>
              <Tr type="thead">
                {Object.keys(dataIndividual.response.address[0]).map(
                  (columnName) => (
                    <Th key={columnName}>{columnName}</Th>
                  )
                )}
                <Th>ตัวเลือก</Th>
              </Tr>
            </Thead>
            <Tbody id="address-tbody">
              {dataIndividual.response.address.map((data) => (
                <Tr type="tbody" key={data.address_id}>
                  <Td>{data.address_id}</Td>
                  <Td>{data.location}</Td>
                  <Td>{data.address_type}</Td>
                  <Option
                    type="edit"
                    id={data.address_id}
                    onDelete={handleDeleteAddress}
                  ></Option>
                </Tr>
              ))}
            </Tbody>
          </Fragment>
        ) : (
          <></>
        )}
      </Table>
      <ButtonRightFrame>
        <Button name="บันทึก" onClick={handleConfirmEditedData} />

        <Link to="/customer">
          <Button name="ยกเลิก" />
        </Link>
      </ButtonRightFrame>
    </Fragment>
  );
}
