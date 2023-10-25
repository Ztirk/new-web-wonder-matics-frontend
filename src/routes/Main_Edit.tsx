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
import { getSelector } from "../api/getSelector";
import { getPopUpData } from "../api/getPopUpData";
import { putEditedData } from "../api/putData";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
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
  setEditAddressDeleteInCustomer,
  setEditAddressExistInCustomer,
  setEditContactDeleteInCustomer,
  setEditCustomer,
  setEditPersonDeleteInCustomer,
  setEditPersonExistInCustomer,
} from "../features/editCustomerSlice";
import Loading from "../components/Loading";
import { Address, Person } from "../interface/reduxType";
import {
  displayState,
  setDisplayAddress,
  setDisplayPerson,
} from "../features/displaySlice";
import { fetchIndividualData } from "../api/getIndividualData";

export default function Main_Edit() {
  const [dataIndividual, setDataIndividal] = useState<IndividualData>();
  const [selectorData, setSelectorData] = useState<CustomerMasterCodeType>();
  const [loading, setLoading] = useState<boolean>(false);

  const defaultToggleAddExist = {
    backdrop: false,
    type: "",
  };

  const [toggleAddExist, setToggleAddExist] = useState<PopUpComponent>(
    defaultToggleAddExist
  );

  useEffect(() => {
    fetchIndividualData(id, setDataIndividal, module, setLoading);
    getSelector(setSelectorData);
  }, []);

  useEffect(() => {
    if (!toggleAddExist.backdrop) {
      navigate("");
    }
  }, [toggleAddExist.backdrop]);

  // React-Router
  const [popUpLoading, setPopUpLoading] = useState<boolean>(false);
  const [popUpData, setPopUpData] = useState<IndividualData>();

  const navigate = useNavigate();
  const location = useLocation();
  const segment = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const id = segment[1];
  const module = segment[0];

  useEffect(() => {
    if (location.search) {
      getPopUpData(setPopUpData, setPopUpLoading);
    }
  }, [location]);

  // Redux
  const editedData = useSelector(editedState);
  const displayData = useSelector(displayState);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(editedData);
    if (editedData.customer && editedData.customer.customer_type_code_id) {
      putEditedData(editedData, id);
    }
  }, [editedData]);

  useEffect(() => {
    console.log(displayData);
  }, [displayData]);

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
      dispatch(setEditCustomer(customer));
    }
  };

  // เมื่อกดบันทึก PopUp เพิ่มที่มีของข้อมูลบุคคล จะทำการ save ข้อมูลที่เลือก บน global state ของตัวที่จะ อัพเดทลงหลังบ้าน และเก็บข้อมูลเพื่อแสดงผลบน Virtual Dom
  const handleConfirmSelectedPersonData = () => {
    const add_exist_person_id: string[] = [];
    const personData: Person[] = [];
    const selectedPersonElem = document.querySelectorAll("#selected-person-id");

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
    dispatch(setEditPersonExistInCustomer(add_exist_person_id));

    handleToggleAddExistCancel();
  };

  const handleConfirmSelectedAddressData = () => {
    const add_exist_address_id: string[] = [];
    const addressData: Address[] = [];
    const selectedAddressElem = document.querySelectorAll(
      "#selected-address-id"
    );
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
    dispatch(setEditAddressExistInCustomer(add_exist_address_id));

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

    dispatch(setEditPersonDeleteInCustomer(person_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  const handleDeleteAddress: (e: React.MouseEvent<HTMLLIElement>) => void = (
    e
  ) => {
    const address_id = e.currentTarget.id;

    dispatch(setEditAddressDeleteInCustomer(address_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  const handleDeleteContact: (e: React.MouseEvent<HTMLLIElement>) => void = (
    e
  ) => {
    const contact_id = e.currentTarget.id;

    dispatch(setEditContactDeleteInCustomer(contact_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  return (
    <Fragment>
      {!loading ? (
        <Fragment>
          <AddExistPopup popUpData={popUpData} popUpLoading={popUpLoading} />
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
              defaultId={
                dataIndividual?.response.customer.customer_type_code_id
              }
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
            <Button name="เพิ่มที่มี" type="person" onClick={() => {}} />
          </ButtonLeftFrame>
          <Table>
            <Fragment>
              {/* ชื่อ Column ของตารางคน */}
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
                ) : displayData.person.length > 0 ? (
                  <Tr type="thead">
                    <Fragment>
                      {Object.keys(displayData.person[0]).map((columnName) => (
                        <Th key={columnName}>{columnName}</Th>
                      ))}
                      <Th>ตัวเลือก</Th>
                    </Fragment>
                  </Tr>
                ) : (
                  <></>
                )}
              </Thead>

              {/* คน */}
              <Tbody>
                {dataIndividual &&
                dataIndividual.response.person &&
                dataIndividual.response.person.length ? (
                  dataIndividual.response.person.map((data) => (
                    <Tr type="tbody" key={data.person_id}>
                      <Td>{data.RowNum}</Td>
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
                {displayData.person.length > 0 ? (
                  displayData.person.map((data) => (
                    <Tr type="tbody" key={data.person_id}>
                      <Td>-</Td>
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

          {/* ติดต่อ */}
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
                ) : displayData.contact.length > 0 ? (
                  <Tr type="thead">
                    <Fragment>
                      {Object.keys(displayData.contact[0]).map((columnName) => (
                        <Th key={columnName}>{columnName}</Th>
                      ))}
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
                      <Td>{data.RowNum}</Td>
                      <Td>{data.contact_id}</Td>
                      <Td>{data.value}</Td>
                      <Td>{data.contact_type}</Td>
                      <Td>{data.owner_name}</Td>
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
                {displayData.contact.length > 0 ? (
                  displayData.contact.map((data) => (
                    <Tr type="tbody" key={data.contact_id}>
                      <Td>{data.contact_id}</Td>
                      <Td>{data.value}</Td>
                      <Td>{data.contact_type}</Td>
                      <Td>{data.owner_name}</Td>
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

          {/* ที่อยู่ */}
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
            <Fragment>
              <Thead>
                <Tr type="thead">
                  {dataIndividual &&
                  dataIndividual.response.address &&
                  dataIndividual.response.address.length ? (
                    <Fragment>
                      {Object.keys(dataIndividual.response.address[0]).map(
                        (columnName) => (
                          <Fragment>
                            <Th key={columnName}>{columnName}</Th>
                          </Fragment>
                        )
                      )}
                      <Th>ตัวเลือก</Th>
                    </Fragment>
                  ) : displayData.address.length > 0 ? (
                    <Fragment>
                      {Object.keys(displayData.address[0]).map((columnName) => (
                        <Fragment>
                          <Th key={columnName}>{columnName}</Th>
                        </Fragment>
                      ))}
                      <Th>ตัวเลือก</Th>
                    </Fragment>
                  ) : (
                    <></>
                  )}
                </Tr>
              </Thead>
              <Tbody id="address-tbody">
                {dataIndividual &&
                dataIndividual.response.address &&
                dataIndividual.response.address.length ? (
                  dataIndividual.response.address.map((data) => (
                    <Tr type="tbody" key={data.address_id}>
                      <Td>{data.RowNum}</Td>
                      <Td>{data.address_id}</Td>
                      <Td>{data.location}</Td>
                      <Td>{data.address_type}</Td>
                      <Option
                        type="edit"
                        id={data.address_id}
                        onDelete={handleDeleteAddress}
                      ></Option>
                    </Tr>
                  ))
                ) : (
                  <></>
                )}
                {displayData.address.length > 0 ? (
                  displayData.address.map((data: Address) => (
                    <Tr type="tbody" key={data.address_id}>
                      <Td>{data.RowNum}</Td>
                      <Td>{data.address_id}</Td>
                      <Td>{data.location}</Td>
                      <Td>{data.address_type}</Td>
                      <Option
                        type="edit"
                        id={data.address_id}
                        onDelete={handleDeleteAddress}
                      ></Option>
                    </Tr>
                  ))
                ) : (
                  <></>
                )}
              </Tbody>
            </Fragment>
          </Table>
          <ButtonRightFrame>
            <Button name="บันทึก" onClick={handleConfirmEditedData} />

            <Link to="/customer">
              <Button name="ยกเลิก" />
            </Link>
          </ButtonRightFrame>
        </Fragment>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
}
