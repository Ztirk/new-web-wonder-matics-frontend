import { Fragment, useEffect, useRef, useState } from "react";
import Divider from "../components/Divider";
import InputFrame from "../components/InputFrame";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonLeftFrame from "../components/ButtonLeftFrame";
import Selector from "../components/Selector";
import Table from "../components/Table";
import ButtonRightFrame from "../components/ฺButtonRightFrame";
import { CustomerIndividual } from "../interface/customerType";
import { getSelector } from "../api/getSelector";
import { getPopUpData } from "../api/getPopUpData";
import { postNewData } from "../api/postNewData";
import { PopUpComponent } from "../interface/componentType";
import AddExistPopup from "../components/AddExistPopup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Thead from "../components/Thead";
import Tbody from "../components/Tbody";
import { useDispatch, useSelector } from "react-redux";
import {
  addNewState,
  setAddNewAddressDeleteInCustomer,
  setAddNewContactDeleteInCustomer,
  setAddNewCustomer,
  setAddNewPersonDeleteInCustomer,
} from "../features/addNewCustomerSlice";
import { MasterCode } from "../interface/mastercodeType";
import { displayState } from "../features/displaySlice";
import Tr from "../components/Tr";
import Th from "../components/Th";
import Td from "../components/Td";
import Option from "../components/Option";
import { Address } from "../interface/reduxType";
import {
  popUpAddExistState,
  setPopUpAddExistAddress,
  setPopUpAddExistPerson,
} from "../features/popUpAddExistSlice";

export default function Main_AddNew() {
  // ReactRouter
  const [popUpLoading, setPopUpLoading] = useState<boolean>(false);

  const navigate = useNavigate();
  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  const menu = segments[0];

  // เก็บข้อมูล Selector
  const [selectorData, setSelectorData] = useState<MasterCode>();

  // useRef
  const firstname = useRef();
  const lastname = useRef();
  const title = useRef();
  const nickname = useRef();
  const role = useRef();
  const description = useRef();

  // เก็บข้อมูล
  const [addExistData, setAddExistData] = useState<CustomerIndividual>();

  // โหลดข้อมูล Selector
  useEffect(() => {
    getSelector(setSelectorData, menu);

    if (location.search) {
      getPopUpData(setAddExistData, setPopUpLoading);
    }
  }, [location]);

  // Redux
  const dispatch = useDispatch();
  const addNewData = useSelector(addNewState);
  const displayData = useSelector(displayState);
  const popUpAddExist = useSelector(popUpAddExistState);

  useEffect(() => {
    if (!popUpAddExist.backdrop) {
      navigate("");
    }
  }, [popUpAddExist.backdrop]);

  useEffect(() => {
    console.log(displayData);
  }, [displayData]);

  // เพิ่มข้อมูลใหม่เมื่อใน State ได้กรอกชื่อลูกค้า ลักษณะลูกค้า และประเภทลูกค้า แล้ว
  useEffect(() => {
    console.log(addNewData);
    if (
      addNewData.customer &&
      addNewData.customer.customer_type_code_id &&
      addNewData.customer.sales_type_code_id
    ) {
      postNewData(addNewData);
    }
  }, [addNewData]);

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
      dispatch(setAddNewCustomer(customer));
    }
  };

  const handleDeletePerson = (e: React.MouseEvent<HTMLLIElement>) => {
    const person_id = e.currentTarget.id;

    dispatch(setAddNewPersonDeleteInCustomer(person_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  const handleDeleteContact = (e: React.MouseEvent<HTMLLIElement>) => {
    const contact_id = e.currentTarget.id;

    dispatch(setAddNewContactDeleteInCustomer(contact_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  const handleDeleteAddress = (e: React.MouseEvent<HTMLLIElement>) => {
    const address_id = e.currentTarget.id;

    dispatch(setAddNewAddressDeleteInCustomer(address_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  const handleDeleteVehicle = (e: React.MouseEvent<HTMLLIElement>) => {
    const person_id = e.currentTarget.id;

    dispatch(setAddNewVehiclDeleteInCustomer(person_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  return (
    <>
      <AddExistPopup
        popUpData={addExistData !== undefined ? addExistData : undefined}
        popUpLoading={popUpLoading}
      />
      {menu == "customer" ? (
        <Fragment>
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
        </Fragment>
      ) : menu == "person" ? (
        <Fragment>
          <Divider title="ข้อมูลบุคคล" />
          <InputFrame>
            <Input label="ชื่อ" placeholder="ชื่อ" type="regular" name="ชื่อ" />
            <Input
              label="นามสกุล"
              placeholder="นามสกุล"
              type="regular"
              ref="นามสกุล"
            />
            <Selector
              label="คำนำหน้า"
              defaultValue="เลือกคำนำหน้า"
              selectorData={selectorData}
              number={0}
              ref="ประเภทลูกค้า"
            />
            <Input
              label="ชื่อเล่น"
              placeholder="ชื่อเล่น"
              type="regular"
              ref="ชื่อเล่น"
            />
            <Selector
              label="ตำแหน่ง"
              defaultValue="เลือกตำแหน่ง"
              selectorData={selectorData}
              number={0}
              ref="ประเภทลูกค้า"
            />
            <Input
              label="รายละเอียด"
              placeholder="รายละเอียด"
              type="regular"
              ref="รายละเอียด"
            />
          </InputFrame>
        </Fragment>
      ) : (
        <></>
      )}

      <Divider title="ข้อมูลคน" />
      <ButtonLeftFrame>
        <Button name="เพิ่มใหม่" disabled={true} />
        <Button
          name="เพิ่มที่มี"
          type="person"
          onClick={() => {
            dispatch(setPopUpAddExistPerson());
          }}
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
                    onDelete={handleDeletePerson}
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
                  id={data.uuid}
                  onDelete={handleDeleteContact}
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
          onClick={() => {
            dispatch(setPopUpAddExistAddress());
          }}
        />
      </ButtonLeftFrame>

      {/* ที่อยู่ */}
      {displayData.address.length > 0 ? (
        <Table>
          <Fragment>
            <Thead id="address-thead">
              <Tr type="thead">
                {Object.keys(displayData.address[0]).map((columnName) => (
                  <Td>{columnName}</Td>
                ))}
                <Td>ตัวเลือก</Td>
              </Tr>
            </Thead>
            <Tbody id="address-tbody">
              {displayData.address.map((data: Address) => (
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
