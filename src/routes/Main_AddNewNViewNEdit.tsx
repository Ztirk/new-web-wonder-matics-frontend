import { Fragment, useEffect, useRef, useState } from "react";
import Divider from "../components/Table/Divider";
import InputFrame from "../components/Input/InputFrame";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import ButtonLeftFrame from "../components/Button/ButtonLeftFrame";
import Selector from "../components/Input/Selector";
import Table from "../components/Table/Table";
import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";
import { getSelector } from "../api/getSelector";
import { getPopUpData } from "../api/getPopUpData";
import { postNewData } from "../api/postNewData";
import AddExistPopup from "../components/PopUp/AddExistPopup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Thead from "../components/Table/Thead";
import Tbody from "../components/Table/Tbody";
import { useDispatch, useSelector } from "react-redux";
import { MasterCode } from "../interface/mastercodeType";
import Tr from "../components/Table/Tr";
import Th from "../components/Table/Th";
import Td from "../components/Table/Td";
import Option from "../components/Table/Option";
import {
  AddNewOAddExist,
  Address,
  DisplayData,
  Memo,
} from "../interface/reduxType";
import { popUpAddExistState } from "../features/popUpAddExistSlice";
import {
  displayState,
  setDisplayAddressDelete,
  setDisplayAddressFetch,
  setDisplayContactDelete,
  setDisplayContactFetch,
  setDisplayCustomerDelete,
  setDisplayFleetDelete,
  setDisplayFleetFetch,
  setDisplayPersonDelete,
  setDisplayPersonFetch,
  setDisplayVehicleDelete,
  setDisplayVehicleFetch,
} from "../features/displaySlice";
import { getIndividualData } from "../api/getIndividualData";
import { IndividualData } from "../interface/dataType";
import {
  CustomerIterate,
  IndividualCustomer,
  SendCustomer,
  StoringIndividualCustomer,
} from "../interface/customerType";
import {
  FleetIterate,
  IndividualFleetShape,
  SendFleet,
} from "../interface/fleetType";
import {
  PersonDisplay,
  PersonIterate,
  SendPerson,
  StoringIndividualPerson,
} from "../interface/personType";
import { Contact, ContactIterate, SendContact } from "../interface/contactType";
import { AddressIterate, SendAddress } from "../interface/addressType";
import { SendVehicle, Vehicle, VehicleIterate } from "../interface/vehicleType";
import AddNewCustomer from "./AddNewCustomer";
import {
  addOEditCustomerState,
  setCustomerId,
  setCustomerName,
  setCustomerTypeCodeId,
  setSalesTypeCodeId,
} from "../features/addOEdit/addOEditCustomerSlice";
import { addOEditPersonState } from "../features/addOEdit/addOEditPersonSlice";
import { Delete } from "../interface/reduxType";
import AddNewPerson from "./AddNewPerson";
import AddNewAddress from "./AddNewAddress";
import AddNewFleet from "./AddNewFleet";
import AddNewVehicle from "./AddNewVehicle";
import AddNewDevice from "./AddNewDevice";
import AddNewDeviceSerial from "./AddNewDeviceSerial";
import AddNewContact from "./AddNewContact";
import {
  addNewOAddExistState,
  removeAddressExist,
  removeAddressNew,
  removeContactExist,
  removeContactNew,
  removeCustomerExist,
  removeCustomerNew,
  removeFleetNew,
  removePersonExist,
  removePersonNew,
  removeVehicleExist,
  removeVehicleNew,
} from "../features/addNewOAddExistSlice";
import {
  memoAddressId,
  memoContactId,
  memoFleetId,
  memoPersonId,
  memoRoleId,
  memoState,
  memoVehicleId,
} from "../features/memoSlice";
import { addOEditContactState } from "../features/addOEdit/addOEditContactSlice";
import { addOEditAddressState } from "../features/addOEdit/addOEditAddressSlice";
import { addOEditFleetState } from "../features/addOEdit/addOEditFleetSlice";
import { addOEditVehicleState } from "../features/addOEdit/addOEditVehicleSlice";
import { SendDevice } from "../interface/deviceType";
import { addOEditDeviceSerialState } from "../features/addOEdit/addOEditDeviceSerialSlice";
import { SendDeviceSerial } from "../interface/deviceSerialType";
import { addOEditDeviceState } from "../features/addOEdit/addOEditDeviceSlice";
import {
  deleteState,
  setAddressDelete,
  setContactDelete,
  setCustomerDelete,
  setFleetDelete,
  setPersonDelete,
  setVehicleDelete,
} from "../features/deleteSlice";

export default function Main_AddNewNViewNEdit() {
  // useState
  const [popUpLoading, setPopUpLoading] = useState<boolean>(false);
  const [selectorData, setSelectorData] = useState<MasterCode>();
  const [addExistData, setAddExistData] = useState<Data>();
  const [individualData, setIndividualData] = useState<IndividualData>();
  const [loading, setLoading] = useState<boolean>(false);

  // Router
  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  const menu = segments[0];
  const addNew1OId = segments[1];
  const addNew2OEdit = segments[2];
  const addNew2 = segments[3];

  // Redux
  const dispatch = useDispatch();
  const displayData: DisplayData = useSelector(displayState);
  const popUpAddExist = useSelector(popUpAddExistState);
  const addNewOAddExist: AddNewOAddExist = useSelector(addNewOAddExistState);
  const deleted: Delete = useSelector(deleteState);
  const addOEditCustomer: SendCustomer = useSelector(addOEditCustomerState);
  const addOEditPerson: SendPerson = useSelector(addOEditPersonState);
  const addOEditContact: SendContact = useSelector(addOEditContactState);
  const addOEditAddress: SendAddress = useSelector(addOEditAddressState);
  const addOEditFleet: SendFleet = useSelector(addOEditFleetState);
  const addOEditVehicle: SendVehicle = useSelector(addOEditVehicleState);
  const addOEditDevice: SendDevice = useSelector(addOEditDeviceState);
  const addOEditDeviceSerial: SendDeviceSerial = useSelector(
    addOEditDeviceSerialState
  );
  const memo: Memo = useSelector(memoState);

  // useEffect
  useEffect(() => {
    sessionStorage.setItem("reload", "true");
  });

  useEffect(() => {
    if (location.search) {
      getPopUpData(setAddExistData, setPopUpLoading, menu);
    }

    if (!isNaN(Number(addNew1OId))) {
      setLoading(true);
      getIndividualData(addNew1OId, setIndividualData, menu).then(
        () => {
          setLoading(false);
        },
        (reason) => {
          console.log(reason);
        }
      );
    }

    getSelector(setSelectorData, menu);
  }, [location]);

  useEffect(() => {
    if (individualData) {
      const customerData = individualData.response.customer;
      const personData = individualData.response.person;
      const contactData = individualData.response.contact;
      const addressData = individualData.response.address;
      const fleetData = individualData.response.fleet;
      const vehicleData = individualData.response.vehicle;
      const deviceData = individualData.response.device;
      const deviceSerialData = individualData.response.deviceSerial;
      const deviceConfigData = individualData.response.deviceConfig;

      if (menu == "customer" && !addOEditCustomer.customer.customer_id) {
        dispatch(setCustomerId(Number(addNew1OId)));
        dispatch(setCustomerName(customerData.customer_name));
        dispatch(
          setCustomerTypeCodeId(Number(customerData.customer_type_code_id))
        );
        dispatch(setSalesTypeCodeId(Number(customerData.sales_type_code_id)));
        dispatch(setDisplayPersonFetch(personData));
        dispatch(setDisplayContactFetch(contactData));
        dispatch(setDisplayAddressFetch(addressData));
        dispatch(setDisplayFleetFetch(fleetData));
        dispatch(setDisplayVehicleFetch(vehicleData));
        for (const obj of personData) {
          dispatch(memoPersonId(obj.person_id));
        }

        for (const obj of contactData) {
          dispatch(memoContactId(obj.contact_id));
        }

        for (const obj of addressData) {
          dispatch(memoAddressId(obj.address_id));
        }

        for (const obj of fleetData) {
          dispatch(memoFleetId(obj.fleet_id));
        }

        for (const obj of vehicleData) {
          dispatch(memoVehicleId(obj.vehicle_id));
        }
      } else if (menu == "person" && !addOEditPerson.person.person_id) {
      }
    }
  }, [individualData]);

  useEffect(() => {
    if (!popUpAddExist.backdrop) {
      setAddExistData();
    }
  }, [popUpAddExist]);

  // เพิ่มข้อมูลใหม่เมื่อใน State ได้กรอกชื่อลูกค้า ลักษณะลูกค้า และประเภทลูกค้า แล้ว
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

  const handleDelete: (
    e: React.MouseEvent<HTMLLIElement>,
    type: string
  ) => void = (e, type) => {
    const id = isNaN(Number(e.currentTarget.id))
      ? e.currentTarget.id
      : Number(e.currentTarget.id);

    if (type == "customer") {
      if (typeof id == "number") {
        if (
          memo.customer_id.includes(id) &&
          !deleted.customerDelete.includes(id)
        ) {
          dispatch(setCustomerDelete(Number(id)));
        } else if (addNewOAddExist.customerExist.includes(id)) {
          dispatch(removeCustomerExist(Number(id)));
        }
      } else if (typeof id == "string") {
        for (const obj of addNewOAddExist.customerNew) {
          if (obj.customer.customer_id == id) {
            dispatch(removeCustomerNew(id));
          }
        }
      }

      dispatch(setDisplayCustomerDelete(id));
    } else if (type == "person") {
      if (typeof id == "number") {
        if (memo.person_id.includes(id) && !deleted.personDelete.includes(id)) {
          dispatch(setPersonDelete(Number(id)));
        } else if (addNewOAddExist.personExist.includes(id)) {
          dispatch(removePersonExist(Number(id)));
        }
      } else if (typeof id == "string") {
        for (const obj of addNewOAddExist.personNew) {
          if (obj.person.person_id == id) {
            dispatch(removePersonNew(id));
          }
        }
      }

      dispatch(setDisplayPersonDelete(id));
    } else if (type == "contact") {
      if (typeof id == "number") {
        if (
          memo.contact_id.includes(id) &&
          !deleted.contactDelete.includes(id)
        ) {
          dispatch(setContactDelete(Number(id)));
        } else if (addNewOAddExist.contactExist.includes(id)) {
          dispatch(removeContactExist(Number(id)));
        }
      } else if (typeof id == "string") {
        for (const obj of addNewOAddExist.contactNew) {
          if (obj.contact.contact_id == id) {
            dispatch(removeContactNew(id));
          }
        }
      }
      dispatch(setDisplayContactDelete(id));
    } else if (type == "address") {
      if (typeof id == "number") {
        if (
          memo.address_id.includes(id) &&
          !deleted.addressDelete.includes(id)
        ) {
          dispatch(setAddressDelete(Number(id)));
        } else if (addNewOAddExist.addressExist.includes(id)) {
          dispatch(removeAddressExist(Number(id)));
        }
      } else if (typeof id == "string") {
        for (const obj of addNewOAddExist.addressNew) {
          if (obj.address.address_id == id) {
            dispatch(removeAddressNew(id));
          }
        }
      }

      dispatch(setDisplayAddressDelete(id));
    } else if (type == "fleet") {
      if (typeof id == "number") {
        if (memo.fleet_id.includes(id) && !deleted.fleetDelete.includes(id)) {
          dispatch(setFleetDelete(Number(id)));
        } else if (addNewOAddExist.fleetExist.includes(id)) {
          dispatch(removeContactExist(Number(id)));
        }
      } else if (typeof id == "string") {
        for (const obj of addNewOAddExist.fleetNew) {
          if (obj.fleet.fleet_id == id) {
            dispatch(removeFleetNew(id));
          }
        }
      }

      dispatch(setDisplayFleetDelete(id));
    } else if (type == "vehicle") {
      if (typeof id == "number") {
        if (
          memo.vehicle_id.includes(id) &&
          !deleted.vehicleDelete.includes(id)
        ) {
          dispatch(setVehicleDelete(Number(id)));
        } else if (addNewOAddExist.vehicleExist.includes(id)) {
          dispatch(removeVehicleExist(Number(id)));
        }
      } else if (typeof id == "string") {
        for (const obj of addNewOAddExist.vehicleNew) {
          if (obj.vehicle.vehicle_id == id) {
            dispatch(removeVehicleNew(id));
          }
        }
      }

      dispatch(setDisplayVehicleDelete(id));
    }
  };

  return (
    <>
      <AddExistPopup
        popUpData={addExistData !== undefined ? addExistData : undefined}
        popUpLoading={popUpLoading}
      />

      {menu == "customer" ? (
        <AddNewCustomer addNew2OEdit={addNew2OEdit} addNew1OId={addNew1OId} />
      ) : menu == "person" ? (
        <AddNewPerson addNew2OEdit={addNew2OEdit} addNew1OId={addNew1OId} />
      ) : menu == "address" ? (
        <AddNewAddress addNew2OEdit={addNew2OEdit} addNew1OId={addNew1OId} />
      ) : menu == "fleet" ? (
        <AddNewFleet addNew2OEdit={addNew2OEdit} addNew1OId={addNew1OId} />
      ) : menu == "vehicle" ? (
        <AddNewVehicle addNew2OEdit={addNew2OEdit} addNew1OId={addNew1OId} />
      ) : menu == "device" ? (
        <AddNewDevice addNew2OEdit={addNew2OEdit} addNew1OId={addNew1OId} />
      ) : menu == "device-serial" ? (
        <AddNewDeviceSerial
          addNew2OEdit={addNew2OEdit}
          addNew1OId={addNew1OId}
        />
      ) : menu == "contact" ? (
        <AddNewContact addNew2OEdit={addNew2OEdit} addNew1OId={addNew1OId} />
      ) : (
        <></>
      )}

      {/* ลูกค้า */}

      {menu == "person" || menu == "vehicle" || menu == "fleet" ? (
        <Fragment>
          <Divider title="ข้อมูลลูกค้า" />
          {addNew2OEdit || isNaN(Number(addNew1OId)) ? (
            <ButtonLeftFrame>
              <Link
                to={`/${menu}/${
                  isNaN(Number(addNew1OId))
                    ? `addnew-${menu}/addnew-customer`
                    : `${addNew1OId}/edit/addnew-customer`
                }`}
              >
                <Button name="เพิ่มใหม่" />
              </Link>
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

      {displayData.customer.length ? (
        <Table>
          <Fragment>
            <Thead id="customer-thead">
              <Tr type="thead">
                <Th
                  type="customer"
                  addNew1OId={addNew1OId}
                  addNew2OEdit={addNew2OEdit}
                />
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
                  {!addNew2OEdit && !isNaN(Number(addNew1OId)) ? (
                    <></>
                  ) : (
                    <Option
                      id={data.customer_id}
                      onDelete={(e) => handleDelete(e, "customer")}
                    />
                  )}
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
          {addNew2OEdit || isNaN(Number(addNew1OId)) ? (
            <ButtonLeftFrame>
              <Link
                to={`/${menu}/${
                  isNaN(Number(addNew1OId))
                    ? `addnew-${menu}/addnew-person`
                    : `${addNew1OId}/edit/addnew-person`
                }`}
              >
                <Button name="เพิ่มใหม่" />
              </Link>
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

      {displayData.person.length ? (
        <Table>
          <Fragment>
            <Thead id="person-thead">
              <Tr type="thead">
                <Th
                  type="person"
                  addNew1OId={addNew1OId}
                  addNew2OEdit={addNew2OEdit}
                />
              </Tr>
            </Thead>
            <Tbody id="person-tbody">
              {displayData.person.map((data: PersonIterate, i) => (
                <Tr type="tbody" key={data.person_id}>
                  <Td>{i + 1}</Td>
                  <Td>{data.person_id}</Td>
                  <Td>{data.fullname}</Td>
                  <Td>{data.role}</Td>
                  <Td>{data.mobile}</Td>
                  <Td>{data.email}</Td>
                  <Td>{data.description}</Td>
                  {!addNew2OEdit && !isNaN(Number(addNew1OId)) ? (
                    <></>
                  ) : (
                    <Option
                      id={data.person_id.toString()}
                      onDelete={(e) => handleDelete(e, "person")}
                    ></Option>
                  )}
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
          {addNew2OEdit || isNaN(Number(addNew1OId)) ? (
            <ButtonLeftFrame>
              <Link
                to={`/${menu}/${
                  isNaN(Number(addNew1OId))
                    ? `addnew-${menu}/addnew-contact`
                    : `${addNew1OId}/edit/addnew-contact`
                }`}
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

      {displayData.contact.length ? (
        <Table>
          <Thead>
            <Tr type="thead">
              <Th
                type="contact"
                addNew1OId={addNew1OId}
                addNew2OEdit={addNew2OEdit}
              />
            </Tr>
          </Thead>
          <Tbody>
            {displayData.contact.map((data, i) => (
              <Tr type="tbody" key={data.contact_id}>
                <Td>{i + 1}</Td>
                <Td>{data.contact_id}</Td>
                <Td>{data.contact_type}</Td>
                <Td>{data.value}</Td>
                <Td>{data.owner_name}</Td>
                {!addNew2OEdit && !isNaN(Number(addNew1OId)) ? (
                  <></>
                ) : (
                  <Option
                    id={data.contact_id.toString()}
                    onDelete={(e) => handleDelete(e, "contact")}
                  ></Option>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <></>
      )}

      {/* address */}
      {menu == "customer" ? (
        <Fragment>
          <Divider title="ข้อมูลที่อยู่" />
          {addNew2OEdit || isNaN(Number(addNew1OId)) ? (
            <ButtonLeftFrame>
              <Link
                to={`/${menu}/${
                  isNaN(Number(addNew1OId))
                    ? `addnew-${menu}/addnew-address`
                    : `${addNew1OId}/edit/addnew-address`
                }`}
              >
                <Button name="เพิ่มใหม่" />
              </Link>
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

      {displayData.address.length ? (
        <Table>
          <Fragment>
            <Thead id="address-thead">
              <Tr type="thead">
                <Th
                  type="address"
                  addNew1OId={addNew1OId}
                  addNew2OEdit={addNew2OEdit}
                />
              </Tr>
            </Thead>
            <Tbody id="address-tbody">
              {displayData.address.map((data, i) => (
                <Tr type="tbody" key={data.address_id}>
                  <Td>{i + 1}</Td>
                  <Td>{data.address_id}</Td>
                  <Td>{data.location}</Td>
                  <Td>{data.address_type}</Td>
                  {!addNew2OEdit && !isNaN(Number(addNew1OId)) ? (
                    <></>
                  ) : (
                    <Option
                      id={data.address_id.toString()}
                      onDelete={(e) => handleDelete(e, "address")}
                    ></Option>
                  )}
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
          {addNew2OEdit || isNaN(Number(addNew1OId)) ? (
            <ButtonLeftFrame>
              <Link
                to={`/${menu}/${
                  isNaN(Number(addNew1OId))
                    ? `addnew-${menu}/addnew-fleet`
                    : `${addNew1OId}/edit/addnew-fleet`
                }`}
              >
                <Button name="เพิ่มใหม่" />
              </Link>
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

      {displayData.fleet.length ? (
        <Table>
          <Fragment>
            <Thead id="address-thead">
              <Tr type="thead">
                <Th
                  type="fleet"
                  addNew1OId={addNew1OId}
                  addNew2OEdit={addNew2OEdit}
                />
              </Tr>
            </Thead>
            <Tbody id="address-tbody">
              {displayData.fleet.map((data, i) => (
                <Tr type="tbody" key={data.fleet_id}>
                  <Td>{i + 1}</Td>
                  <Td>{data.fleet_id}</Td>
                  <Td>{data.fleet_name}</Td>
                  <Td>{data.vehicle_count}</Td>
                  {!addNew2OEdit && !isNaN(Number(addNew1OId)) ? (
                    <></>
                  ) : (
                    <Option
                      id={data.fleet_id.toString()}
                      onDelete={(e) => handleDelete(e, "fleet")}
                    ></Option>
                  )}
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

          {addNew2OEdit || isNaN(Number(addNew1OId)) ? (
            <ButtonLeftFrame>
              <Link
                to={`/${menu}/${
                  isNaN(Number(addNew1OId))
                    ? `addnew-${menu}/addnew-vehicle`
                    : `${addNew1OId}/edit/addnew-vehicle`
                }`}
              >
                <Button name="เพิ่มใหม่" />
              </Link>
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

      {displayData.vehicle.length > 0 ? (
        <Table>
          <Fragment>
            <Thead id="address-thead">
              <Tr type="thead">
                <Th
                  type="vehicle"
                  addNew1OId={addNew1OId}
                  addNew2OEdit={addNew2OEdit}
                />
              </Tr>
            </Thead>
            <Tbody id="address-tbody">
              {displayData.vehicle.map((data, i) => (
                <Tr type="tbody" key={data.vehicle_id}>
                  <Td>{i + 1}</Td>
                  <Td>{data.vehicle_id}</Td>
                  <Td>{data.license_plate}</Td>
                  <Td>{data.frame_no}</Td>
                  <Td>{data.vehicle_type}</Td>
                  <Td>{data.model_type}</Td>
                  {!addNew2OEdit && !isNaN(Number(addNew1OId)) ? (
                    <></>
                  ) : (
                    <Option
                      id={data.vehicle_id.toString()}
                      onDelete={(e) => handleDelete(e, "vehicle")}
                    ></Option>
                  )}
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
