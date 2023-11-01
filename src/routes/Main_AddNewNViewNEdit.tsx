import { Fragment, useEffect, useRef, useState } from "react";
import Divider from "../components/Divider";
import InputFrame from "../components/InputFrame";
import Input from "../components/Input";
import Button from "../components/Button";
import ButtonLeftFrame from "../components/ButtonLeftFrame";
import Selector from "../components/Selector";
import Table from "../components/Table";
import ButtonRightFrame from "../components/ฺButtonRightFrame";
import { getSelector } from "../api/getSelector";
import { getPopUpData } from "../api/getPopUpData";
import { postNewData } from "../api/postNewData";
import AddExistPopup from "../components/AddExistPopup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Thead from "../components/Thead";
import Tbody from "../components/Tbody";
import { useDispatch, useSelector } from "react-redux";
import { MasterCode } from "../interface/mastercodeType";
import Tr from "../components/Tr";
import Th from "../components/Th";
import Td from "../components/Td";
import Option from "../components/Option";
import { Address, DisplayData } from "../interface/reduxType";
import { popUpAddExistState } from "../features/popUpAddExistSlice";
import { displayState } from "../features/displaySlice";
import { getIndividualData } from "../api/getIndividualData";
import { IndividualData } from "../interface/dataType";
import { CustomerIterate, CustomerShape } from "../interface/customerType";
import { FleetIterate, IndividualFleetShape } from "../interface/fleetType";
import { PersonIterate } from "../interface/personType";
import { ContactIterate } from "../interface/contactType";
import { AddressIterate } from "../interface/addressType";
import { VehicleIterate } from "../interface/vehicleType";
import AddNewCustomer from "./AddNewCustomer";

export default function Main_AddNewNViewNEdit() {
  // ReactRouter
  const [popUpLoading, setPopUpLoading] = useState<boolean>(false);

  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  const menu = segments[0];
  const addNewOId = segments[1];
  const edit = segments[2];
  const addNew2 = segments[3];

  // เก็บข้อมูล Selector
  const [selectorData, setSelectorData] = useState<MasterCode>();

  // useRef
  const firstname = useRef<HTMLInputElement>(null);
  const lastname = useRef<HTMLInputElement>(null);
  const title = useRef<HTMLSelectElement>(null);
  const nickname = useRef<HTMLInputElement>(null);
  const role = useRef<HTMLSelectElement>(null);
  const description = useRef<HTMLInputElement>(null);

  // เก็บข้อมูล
  const [addExistData, setAddExistData] = useState<Data>();
  const [individualData, setIndividualData] = useState<IndividualData>();
  const [loading, setLoading] = useState<boolean>(false);

  // โหลดข้อมูล Selector
  useEffect(() => {
    if (location.search) {
      getPopUpData(setAddExistData, setPopUpLoading, menu);
    }

    if (!isNaN(Number(addNewOId))) {
      getIndividualData(addNewOId, setIndividualData, menu, setLoading);
    }

    getSelector(setSelectorData, menu);
  }, [location]);

  // Redux
  const dispatch = useDispatch();
  const displayData: DisplayData = useSelector(displayState);
  const popUpAddExist = useSelector(popUpAddExistState);

  useEffect(() => {
    if (!popUpAddExist.backdrop) {
      setAddExistData();
    }
  }, [popUpAddExist]);

  useEffect(() => {
    console.log(displayData);
  }, [displayData]);

  // เพิ่มข้อมูลใหม่เมื่อใน State ได้กรอกชื่อลูกค้า ลักษณะลูกค้า และประเภทลูกค้า แล้ว
  useEffect(() => {}, []);

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
      // dispatch(setAddNewCustomer(customer));
    }
  };

  const handleDeletePerson = (e: React.MouseEvent<HTMLLIElement>) => {
    const person_id = e.currentTarget.id;

    // dispatch(setAddNewPersonDeleteInCustomer(person_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  const handleDeleteContact = (e: React.MouseEvent<HTMLLIElement>) => {
    const contact_id = e.currentTarget.id;

    // dispatch(setAddNewContactDeleteInCustomer(contact_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  const handleDeleteAddress = (e: React.MouseEvent<HTMLLIElement>) => {
    const address_id = e.currentTarget.id;

    // dispatch(setAddNewAddressDeleteInCustomer(address_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  const handleDeleteVehicle = (e: React.MouseEvent<HTMLLIElement>) => {
    const person_id = e.currentTarget.id;

    // dispatch(setAddNewVehiclDeleteInCustomer(person_id));

    e.currentTarget.parentElement?.parentElement?.parentElement?.parentElement.remove();
  };

  return (
    <>
      <AddExistPopup
        popUpData={addExistData !== undefined ? addExistData : undefined}
        popUpLoading={popUpLoading}
      />
      {menu == "customer" ? (
        <AddNewCustomer
          individualData={individualData}
          edit={edit}
          addNewOId={addNewOId}
          selectorData={selectorData}
        />
      ) : menu == "person" ? (
        <Fragment>
          <Divider title="ข้อมูลบุคคล" />
          <InputFrame>
            <Input
              label="ชื่อ"
              placeholder="ชื่อ"
              type="regular"
              name="ชื่อ"
              ref={firstname}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="นามสกุล"
              placeholder="นามสกุล"
              type="regular"
              ref={lastname}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Selector
              label="คำนำหน้า"
              defaultValue="เลือกคำนำหน้า"
              selectorData={selectorData}
              number={0}
              ref={title}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="ชื่อเล่น"
              placeholder="ชื่อเล่น"
              type="regular"
              ref={nickname}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Selector
              label="ตำแหน่ง"
              defaultValue="เลือกตำแหน่ง"
              selectorData={selectorData}
              number={1}
              ref={role}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="รายละเอียด"
              placeholder="รายละเอียด"
              type="regular"
              ref={description}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
          </InputFrame>
        </Fragment>
      ) : menu == "address" ? (
        <Fragment>
          <Divider title="ข้อมูลที่อยู่" />
          <InputFrame>
            <Selector
              label="ประเภทที่อยู่"
              defaultValue="เลือกประเภทที่อยู่"
              selectorData={selectorData}
              number={0}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="เลขที่"
              placeholder="เลขที่"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="หมู่ที่"
              placeholder="หมู่ที่"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="ซอย"
              placeholder="ซอย"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="ถนน"
              placeholder="ถนน"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="ตำบล/แขวง"
              placeholder="ตำบล/แขวง"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="อำเภอ/เขต"
              placeholder="อำเภอ/เขต"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="จังหวัด"
              placeholder="จังหวัด"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="รหัสไปรษณีย์"
              placeholder="รหัสไปรษณีย์"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
          </InputFrame>
        </Fragment>
      ) : menu == "fleet" ? (
        <Fragment>
          {/* ฟลีต */}
          <Divider title="ข้อมูลฟลีต" />
          <InputFrame>
            <Input
              label="ชื่อฟลีต"
              placeholder="ชื่อฟลีต"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Selector
              label="ชื่อหัวฟลีต"
              defaultValue="เลือกชื่อหัวฟลีต"
              selectorData={selectorData}
              number={0}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
          </InputFrame>
        </Fragment>
      ) : menu == "vehicle" ? (
        <Fragment>
          {/* ยานพาหนะ */}
          <Divider title="ข้อมูลยานพาหนะ" />
          <InputFrame>
            <Selector
              label="ประเภทยานพาหนะ"
              defaultValue="เลือกประเภทยานพาหนะ"
              selectorData={selectorData}
              number={0}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="ทะเบียนรถ"
              placeholder="ทะเบียนรถ"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Selector
              label="หมวดจังหวัด"
              defaultValue="เลือกหมวดจังหวัด"
              selectorData={selectorData}
              number={0}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="เลขตัวถัง"
              placeholder="เลขตัวถัง"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Selector
              label="ยี่ห้อยานยนต์"
              defaultValue="เลือกยี่ห้อยานยนต์"
              selectorData={selectorData}
              number={0}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Selector
              label="รุ่นยานยนต์"
              defaultValue="เลือกรุ่นยานยนต์"
              selectorData={selectorData}
              number={0}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="ลักษณะในการจดทะเบียน"
              placeholder="ลักษณะในการจดทะเบียน"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
              type="regular"
            />
            <Selector
              label="ประเภทใบขับขี่่"
              defaultValue="เลือกประเภทใบขับขี่่"
              selectorData={selectorData}
              number={0}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="จำนวนเพลา"
              placeholder="จำนวนเพลา"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="จำนวนกงล้อ"
              placeholder="จำนวนกงล้อ"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="จำนวนยาง"
              placeholder="จำนวนยาง"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
          </InputFrame>
          <Divider title="ค่ากำหนด" />
          <InputFrame>
            <Input
              label="ความเร็วสูงสุด"
              placeholder="ความเร็วสูงสุด"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="เวลา idel (นาที)"
              placeholder="เวลา idel (นาที)"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="fuel tank number"
              placeholder="fuel tank number"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="fuel tank capacity"
              placeholder="fuel tank capacity"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="max fuel voltage 1"
              placeholder="max fuel voltage 1"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="max fuel voltage 2"
              placeholder="max fuel voltage 2"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
          </InputFrame>
        </Fragment>
      ) : menu == "device" ? (
        <Fragment>
          {/* อุปกรณ์ */}
          <Divider title="ข้อมูลอุปกรณ์" />
          <InputFrame>
            <Input
              label="device_id"
              placeholder="device_id"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="veh_id"
              placeholder="veh_id"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="วันที่เพิ่ม"
              placeholder="วันที่เพิ่ม"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
          </InputFrame>
        </Fragment>
      ) : menu == "device-serial" ? (
        <Fragment>
          <Divider title="ข้อมูลชุดอุปกรณ์" />
          <InputFrame>
            <Input
              label="device_serial"
              placeholder="device_serial"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="IMEI"
              placeholder="IMEI"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Selector
              label="ประเภทกล่อง"
              defaultValue="เลือกประเภทกล่อง"
              selectorData={selectorData}
              number={0}
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
            <Input
              label="วันที่เพิ่ม"
              placeholder="วันที่เพิ่ม"
              type="regular"
              disabled={!isNaN(Number(addNewOId)) ? true : true}
            />
          </InputFrame>
        </Fragment>
      ) : (
        <></>
      )}

      {/* ลูกค้า */}

      {menu == "person" || menu == "vehicle" || menu == "fleet" ? (
        <Fragment>
          <Divider title="ข้อมูลลูกค้า" />
          {edit || isNaN(Number(addNewOId)) ? (
            <ButtonLeftFrame>
              <Button name="เพิ่มใหม่" />
              <Button
                name="เพิ่มที่มี"
                type="customer"
                onClick={() => {
                  // dispatch(setPopUpAddExistCustomer());
                }}
              />
            </ButtonLeftFrame>
          ) : (
            <></>
          )}
        </Fragment>
      ) : (
        <></>
      )}

      {individualData &&
      "customer" in individualData.response &&
      Array.isArray(individualData.response.customer) &&
      individualData.response.customer.length > 0 ? (
        <Table>
          <Thead>
            <Tr type="thead">
              {Object.keys(individualData?.response.customer[0]).map(
                (columnName, i) => (
                  <Th key={i}>{columnName}</Th>
                )
              )}
              <Th>ตัวเลือก</Th>
            </Tr>
          </Thead>
          <Tbody>
            {individualData.response.customer.map((data: CustomerIterate) => (
              <Tr type="tbody" key={data.customer_id}>
                <Td>{data.RowNum}</Td>
                <Td>{data.customer_id}</Td>
                <Td>{data.customer_name}</Td>
                <Td>{data.email}</Td>
                <Td>{data.telephone}</Td>
                <Option
                  type="edit"
                  id={data.customer_id}
                  onDelete={handleDeleteContact}
                ></Option>
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <></>
      )}

      {displayData.customer.length ? (
        <Table>
          <Fragment>
            <Thead id="customer-thead">
              <Tr type="thead">
                {Object.keys(displayData.customer[0]).map((columnName) => (
                  <Th key={columnName}>{columnName}</Th>
                ))}

                <Th>ตัวเลือก</Th>
              </Tr>
            </Thead>
            <Tbody id="customer-tbody">
              {displayData.customer.map((data) => (
                <Tr type="tbody" key={data.customer_id}>
                  <Td>{data.RowNum}</Td>
                  <Td>{data.customer_id}</Td>
                  <Td>{data.customer_name}</Td>
                  <Td>{data.telephone}</Td>
                  <Td>{data.email}</Td>
                  <Option
                    type="edit"
                    id={data.customer_id}
                    onDelete={handleDeletePerson}
                  />
                </Tr>
              ))}
            </Tbody>
          </Fragment>
        </Table>
      ) : (
        <></>
      )}
      {/* บุคคล */}

      {menu == "customer" ||
      menu == "fleet" ||
      menu == "vehicle" ||
      menu == "fleet" ? (
        <Fragment>
          <Divider title="ข้อมูลบุคคล" />
          {edit || isNaN(Number(addNewOId)) ? (
            <ButtonLeftFrame>
              <Button name="เพิ่มใหม่" />
              <Button
                name="เพิ่มที่มี"
                type="person"
                onClick={() => {
                  // dispatch(setPopUpAddExistPerson());
                }}
              />
            </ButtonLeftFrame>
          ) : (
            <></>
          )}
        </Fragment>
      ) : (
        <></>
      )}

      {individualData &&
      "person" in individualData.response &&
      Array.isArray(individualData.response.person) &&
      individualData.response.person.length > 0 ? (
        <Table>
          <Thead>
            <Tr type="thead">
              {Object.keys(individualData?.response.person[0]).map(
                (columnName, i) => (
                  <Th key={i}>{columnName}</Th>
                )
              )}
              <Th>ตัวเลือก</Th>
            </Tr>
          </Thead>
          <Tbody>
            {individualData.response.person.map((data) => (
              <Tr type="tbody" key={data.person_id}>
                <Td>{data.RowNum}</Td>
                <Td>{data.person_id}</Td>
                <Td>{data.fullname}</Td>
                <Td>{data.mobile}</Td>
                <Td>{data.email}</Td>
                <Td>{data.description}</Td>
                <Td>{data.role}</Td>
                <Option
                  type="edit"
                  id={data.uuid}
                  onDelete={handleDeleteContact}
                />
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <></>
      )}

      {displayData.person.length ? (
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
              {displayData.person.map((data: PersonIterate) => (
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

      {/* ติดต่อ */}

      {menu == "customer" ? (
        <Fragment>
          <Divider title="ข้อมูลผู้ติดต่อ" />
          {edit || isNaN(Number(addNewOId)) ? (
            <ButtonLeftFrame>
              <Link
                to={
                  edit == "edit"
                    ? `/customer/${addNewOId}/edit/add-new-contact`
                    : `/customer/add-new-customer/add-new-contact`
                }
              >
                <Button name="เพิ่มใหม่" />
              </Link>
              <Button name="เพิ่มที่มี" />
            </ButtonLeftFrame>
          ) : (
            <></>
          )}
        </Fragment>
      ) : (
        <></>
      )}

      {individualData &&
      "contact" in individualData.response &&
      Array.isArray(individualData.response.contact) &&
      individualData.response.contact.length > 0 ? (
        <Table>
          <Thead>
            <Tr type="thead">
              {Object.keys(individualData?.response.contact[0]).map(
                (columnName, i) => (
                  <Th key={i}>{columnName}</Th>
                )
              )}
              <Th>ตัวเลือก</Th>
            </Tr>
          </Thead>
          <Tbody>
            {individualData.response.contact.map((data: ContactIterate) => (
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
                />
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <></>
      )}

      {displayData.contact.length ? (
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

      {/* ที่อยู่ */}
      {menu == "customer" ? (
        <Fragment>
          <Divider title="ข้อมูลที่อยู่" />
          {edit || isNaN(Number(addNewOId)) ? (
            <ButtonLeftFrame>
              <Button name="เพิ่มใหม่" />
              <Button
                name="เพิ่มที่มี"
                type="address"
                onClick={() => {
                  // dispatch(setPopUpAddExistAddress());
                }}
              />
            </ButtonLeftFrame>
          ) : (
            <></>
          )}
        </Fragment>
      ) : (
        <></>
      )}

      {individualData &&
      "address" in individualData.response &&
      Array.isArray(individualData.response.address) &&
      individualData.response.address.length > 0 ? (
        <Table>
          <Thead>
            <Tr type="thead">
              {Object.keys(individualData?.response.address[0]).map(
                (columnName, i) => (
                  <Fragment>
                    <Th key={i}>{columnName}</Th>
                  </Fragment>
                )
              )}
              <Th>ตัวเลือก</Th>
            </Tr>
          </Thead>
          <Tbody>
            {individualData.response.address.map((data: AddressIterate) => (
              <Tr type="tbody" key={data.address_id}>
                <Td>{data.RowNum}</Td>
                <Td>{data.address_id}</Td>
                <Td>{data.address_type}</Td>
                <Td>{data.location}</Td>
                <Option
                  type="edit"
                  id={data.contact_id}
                  onDelete={handleDeleteContact}
                />
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <></>
      )}

      {displayData.address.length ? (
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

      {/* ฟลีต */}

      {menu == "customer" ? (
        <Fragment>
          <Divider title="ข้อมูลฟลีต" />
          {edit || isNaN(Number(addNewOId)) ? (
            <ButtonLeftFrame>
              <Button name="เพิ่มใหม่" />
              <Button
                name="เพิ่มที่มี"
                type="address"
                onClick={() => {
                  // dispatch(setPopUpAddExistAddress());
                }}
              />
            </ButtonLeftFrame>
          ) : (
            <></>
          )}
        </Fragment>
      ) : (
        <></>
      )}

      {individualData &&
      "fleet" in individualData.response &&
      Array.isArray(individualData.response.fleet) &&
      individualData.response.fleet.length > 0 ? (
        <Table>
          <Thead>
            <Tr type="thead">
              {Object.keys(individualData?.response.fleet[0]).map(
                (columnName, i) => (
                  <Fragment>
                    <Th key={i}>{columnName}</Th>
                  </Fragment>
                )
              )}
              <Th>ตัวเลือก</Th>
            </Tr>
          </Thead>
          <Tbody>
            {individualData.response.fleet.map((data: FleetIterate) => (
              <Tr type="tbody" key={data.fleet_id}>
                <Td>{data.RowNum}</Td>
                <Td>{data.fleet_id}</Td>
                <Td>{data.fleet_name}</Td>
                <Td>{data.vehicle_count}</Td>
                <Option
                  type="edit"
                  id={data.contact_id}
                  onDelete={handleDeleteContact}
                />
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <></>
      )}

      {displayData.fleet.length ? (
        <Table>
          <Fragment>
            <Thead id="address-thead">
              <Tr type="thead">
                {Object.keys(displayData.fleet[0]).map((columnName) => (
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
      {/* ยานพาหนะ */}

      {menu == "customer" || menu == "person" || menu == "fleet" ? (
        <Fragment>
          <Divider title="ข้อมูลยานพาหนะ" />

          {edit || isNaN(Number(addNewOId)) ? (
            <ButtonLeftFrame>
              <Button name="เพิ่มใหม่" />
              <Button
                name="เพิ่มที่มี"
                type="address"
                onClick={() => {
                  // dispatch(setPopUpAddExistAddress());
                }}
              />
            </ButtonLeftFrame>
          ) : (
            <></>
          )}
        </Fragment>
      ) : (
        <></>
      )}

      {individualData &&
      "vehicle" in individualData.response &&
      Array.isArray(individualData.response.vehicle) &&
      individualData.response.vehicle.length > 0 ? (
        <Table>
          <Thead>
            <Tr type="thead">
              {Object.keys(individualData?.response.vehicle[0]).map(
                (columnName, i) => (
                  <Fragment>
                    <Th key={i}>{columnName}</Th>
                  </Fragment>
                )
              )}
              <Th>ตัวเลือก</Th>
            </Tr>
          </Thead>
          <Tbody>
            {individualData.response.vehicle.map((data: VehicleIterate) => (
              <Tr type="tbody" key={data.vehicle_id}>
                <Td>{data.RowNum}</Td>
                <Td>{data.vehicle_id}</Td>
                <Td>{data.license_plate}</Td>
                <Td>{data.frame_no}</Td>
                <Td>{data.vehicle_type}</Td>
                <Td>{data.model_type}</Td>
                <Option
                  type="edit"
                  id={data.contact_id}
                  onDelete={handleDeleteContact}
                />
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <></>
      )}

      {displayData.fleet.length > 0 ? (
        <Table>
          <Fragment>
            <Thead id="address-thead">
              <Tr type="thead">
                {Object.keys(displayData.vehicle[0]).map((columnName) => (
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
