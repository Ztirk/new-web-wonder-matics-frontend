import { Fragment, useEffect, useState } from "react";
import Divider from "../components/Divider";
import InputFrame from "../components/InputFrame";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonLeftFrame from "../components/ButtonLeftFrame";
import Selector from "../components/Selector";
import Table from "../components/Table";
import ButtonRightFrame from "../components/ฺButtonRightFrame";
import { CustomerIndividual } from "../interface/customerType";
import {
  fetchIndividualDataData,
  fetchCustomerTypes,
  postNewCustomer,
} from "../api/customerApi";
import { PopUpComponent } from "../interface/componentType";
import AddExistPopup from "../components/AddExistPopup";
import { Link, useLocation } from "react-router-dom";
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

export default function Main_AddNew() {
  const [selectorData, setSelectorData] = useState<MasterCode>();

  const initAddExist: CustomerIndividual = {
    message: "",
    status: 0,
    response: {
      count_data: 0,
      customer: {
        customer_id: 0,
        customer_name: "",
        customer_type_code_id: 0,
        email: "",
        sales_type_code_id: 0,
        telephone: "",
        sales_type: "",
        customer_type: "",
      },
      person: [
        {
          person_id: 0,
          fullname: "",
          email: "",
          mobile: "",
          description: "",
          role: "",
        },
      ],
      contact: [
        {
          contact_id: 0,
          contact_type: "",
          value: "",
        },
      ],
      address: [
        {
          address_id: 0,
          location: "",
          address_type: "",
        },
      ],
    },
  };
  const [addExistData, setAddExistData] =
    useState<CustomerIndividual>(initAddExist);

  const defaultToggleAddExist: PopUpComponent = {
    backdrop: false,
    type: "",
  };
  const [toggleAddExist, setToggleAddExist] = useState<PopUpComponent>(
    defaultToggleAddExist
  );

  const addNewData = useSelector(addNewState);
  const dispatch = useDispatch();

  const location = useLocation();

  useEffect(() => {
    fetchCustomerTypes(setSelectorData);
  }, []);

  useEffect(() => {
    if (addNewData.customer && addNewData.customer.customer_type_code_id) {
      postNewCustomer(addNewData);
    }
  }, [addNewData]);

  useEffect(() => {
    if (location.search) {
      fetchIndividualDataData(setAddExistData);
    }
  }, [location]);

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
    const tablePersonElem = document.getElementById("person-tbody");
    selectedPersonElem.forEach((_elem, i) => {
      if (selectedPersonElem[i].childNodes[0].childNodes[0].checked == true) {
        const createTrElem = document.createElement("tr");
        createTrElem.className = "h-[66.213px]";
        selectedPersonElem[i].childNodes.forEach((_elem, j) => {
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
        li.addEventListener("click", handleDeleteAddNewData);
        li.className = "cursor-pointer";
        li.textContent = "ลบ";
        ul.append(li);
        nav.append(ul);
        deleteButt.append(nav);
        createTrElem.append(deleteButt);
        tablePersonElem?.append(createTrElem);
      }
    });

    dispatch(setPersonExist(add_exist_person_id));

    const theadPersonTable = document.getElementById("person-thead");

    const theadPersonPopup = document.getElementById("person-thead-popup");
    if (theadPersonTable?.childNodes.length == 0 && theadPersonPopup) {
      const cloneNode = theadPersonPopup.cloneNode(true);
      const thElem = document.createElement("th");

      thElem.className = "border border-slate-300";
      thElem.textContent = "ลบ";

      cloneNode.removeChild(cloneNode.firstChild);
      cloneNode.appendChild(thElem);
      theadPersonTable?.appendChild(cloneNode);
    }

    handleToggleAddExistCancel();
  };

  const handleSelectedAddress = () => {
    const add_exist_address_id: string[] = [];
    const selectedAddressElem = document.querySelectorAll(
      "#selected-address-id"
    );
    const tableAddressElem = document.getElementById("address-tbody");
    selectedAddressElem.forEach((_elem, i) => {
      if (selectedAddressElem[i].childNodes[0].childNodes[0].checked == true) {
        const createTrElem = document.createElement("tr");
        createTrElem.className = "h-[66.213px]";
        selectedAddressElem[i].childNodes.forEach((_elem, j) => {
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
        li.addEventListener("click", handleDeleteAddNewData);
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

    const theadAddressTable = document.getElementById("address-thead");
    const theadAddressPopup = document.getElementById("address-thead-popup");

    if (theadAddressTable?.childNodes.length == 0 && theadAddressPopup) {
      const trForTheadElem = theadAddressPopup.cloneNode(true);
      trForTheadElem.removeChild(trForTheadElem.firstChild);
      const thElem = document.createElement("th");

      thElem.className = "border border-slate-300";
      thElem.textContent = "ลบ";
      trForTheadElem.appendChild(thElem);
      theadAddressTable?.appendChild(trForTheadElem);
    }

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

      {/* เพิ่มข้อมูลคน */}
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

      <Table>
        <Fragment>
          <Thead id="person-thead"></Thead>
          <Tbody id="person-tbody"></Tbody>
        </Fragment>
      </Table>

      {/* เพิ่มข้อมูลผู้ติดต่อ */}
      <Divider title="ข้อมูลผู้ติดต่อ" />
      <ButtonLeftFrame>
        <Link to={`/customer/add-new-customer/add-new-contact`}>
          <Button name="เพิ่มใหม่" />
        </Link>
        <Button name="เพิ่มที่มี" disabled={true} />
      </ButtonLeftFrame>

      <Table type="contact" tbody={false} option="edit" />

      {/* เพิ่มข้อมูลที่อยู่ */}
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

      <Table>
        <Fragment>
          <Thead id="address-thead" />
          <Tbody id="address-tbody" />
        </Fragment>
      </Table>
      <ButtonRightFrame>
        <Button name="บันทึก" onClick={handleAddNewData} type="submit" />
        <Link to={".."} relative="path">
          <Button name="ยกเลิก" />
        </Link>
      </ButtonRightFrame>
    </>
  );
}
