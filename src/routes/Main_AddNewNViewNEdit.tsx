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
import {
  popUpAddExistState,
  setPopUpAddExistAddress,
  setPopUpAddExistFleet,
  setPopUpAddExistPerson,
  setPopUpAddExistVehicle,
} from "../features/popUpAddExistSlice";
import {
  displayState,
  setDisplayAddressDelete,
  setDisplayAddressFetch,
  setDisplayContactDelete,
  setDisplayContactFetch,
  setDisplayCustomerDelete,
  setDisplayCustomerFetch,
  setDisplayDocumentFetch,
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
  setDefaultCustomer,
  setSalesTypeCodeId,
} from "../features/addOEdit/addOEditCustomerSlice";
import {
  addOEditPersonState,
  setDefaultPerson,
  setDescription,
  setFirstName,
  setLastName,
  setNickName,
  setPersonId,
  setRole,
  setTitleCodeId,
} from "../features/addOEdit/addOEditPersonSlice";
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
  memoCustomerId,
  memoFleetId,
  memoPersonId,
  memoState,
  memoVehicleId,
} from "../features/memoSlice";
import {
  addOEditContactState,
  setDefaultContact,
} from "../features/addOEdit/addOEditContactSlice";
import {
  addOEditAddressState,
  setAddressId,
  setAddressType,
  setAlley,
  setDefaultAddress,
  setDistrict,
  setHouseNo,
  setName,
  setPostalCode,
  setProvince,
  setRoad,
  setSubDistrict,
  setVillageNo,
} from "../features/addOEdit/addOEditAddressSlice";
import {
  addOEditFleetState,
  setDefaultFleet,
  setFleetId,
  setFleetName,
  setParentFleetId,
} from "../features/addOEdit/addOEditFleetSlice";
import {
  addOEditVehicleState,
  setDefaultVehicle,
  setFrameNo,
  setLicensePlate,
  setVehicleId,
  setVehicleModelId,
} from "../features/addOEdit/addOEditVehicleSlice";
import { SendDevice } from "../interface/deviceType";
import {
  addOEditDeviceSerialState,
  setDefaultDeviceSerial,
} from "../features/addOEdit/addOEditDeviceSerialSlice";
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
import { updateByState } from "../features/updateBySlice";
import { actionByState, createByState } from "../features/actionBySlice";
import { putEditedData } from "../api/putData";
import AddNewDocument from "./AddNewDocument";
import AddNewCard from "./AddNewCard";
import { SendCard } from "../interface/cardType";
import {
  addOEditCardState,
  setDefaultCard,
} from "../features/addOEdit/addOEditCardSlice";
import { SendDocument } from "../interface/documentType";
import {
  addOEditDocumentState,
  setDefaultDocument,
} from "../features/addOEdit/addOEditDocumentSlice";
import { filesState } from "../features/fileSlice";
import { ToggleProps } from "../interface/componentType";
import TogglePopup from "../components/PopUp/TogglePopup";
import ErrorPopUp from "../components/PopUp/errorPopUp";
import {
  setTogglePropsDefault,
  setTogglePropsState,
} from "../features/togglePropsPopUpSlice";
import { setErrorPopUpState } from "../features/errorPopUpSlice";
import { getFile } from "../api/getFile";

export default function Main_AddNewNViewNEdit() {
  // useState
  const [popUpLoading, setPopUpLoading] = useState<boolean>(false);
  const [selectorData, setSelectorData] = useState<MasterCode>();
  const [individualData, setIndividualData] = useState<IndividualData>();
  const [loading, setLoading] = useState<boolean>(false);
  const defaultToggleSave = {
    active: false,
    name: "",
    title: "",
    id: 0,
  };
  const [toggleSave, setToggleSave] = useState<ToggleProps>(defaultToggleSave);

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
  const addOEditCard: SendCard = useSelector(addOEditCardState);
  const addOEditDocument: SendDocument = useSelector(addOEditDocumentState);
  const files: FormData = useSelector(filesState);
  const memo: Memo = useSelector(memoState);
  const actionBy = useSelector(actionByState);

  // useEffect
  useEffect(() => {
    sessionStorage.setItem("reload", "true");
  });

  useEffect(() => {
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

    if (menu !== "customer") {
      dispatch(setDefaultCustomer());
    }

    if (menu !== "person") {
      dispatch(setDefaultPerson());
    }

    if (menu !== "fleet") {
      dispatch(setDefaultFleet());
    }

    if (menu !== "contact") {
      dispatch(setDefaultContact());
    }

    if (menu !== "vehicle") {
      dispatch(setDefaultVehicle());
    }

    if (menu !== "address") {
      dispatch(setDefaultAddress());
    }

    if (menu !== "device-serial") {
      dispatch(setDefaultDeviceSerial());
    }

    if (menu !== "document") {
      dispatch(setDefaultDocument());
    }

    if (menu !== "card") {
      dispatch(setDefaultCard());
    }
  }, [location]);

  useEffect(() => {
    if (individualData) {
      const customerData = individualData.response.customer;
      const personData = individualData.response.person;
      const contactData = individualData.response.contact;
      const addressData = individualData.response.address;
      const fleetData = individualData.response.fleet;
      const vehicleData = individualData.response.vehicle;
      const vehicleConfigData = individualData.response.vehicleConfig;
      const vehiclePermitData = individualData.response.vehiclePermit;
      const documentData = individualData.response.document;
      const cardData = individualData.response.card;
      const deviceData = individualData.response.device;
      const deviceConfigData = individualData.response.deviceConfig;
      const deviceSerialData = individualData.response.deviceSerial;

      if (menu == "customer" && !addOEditCustomer.customer.customer_id) {
        dispatch(setCustomerId(customerData.customer_id));
        dispatch(setCustomerName(customerData.customer_name));
        dispatch(setCustomerTypeCodeId(customerData.customer_type_code_id));
        dispatch(setSalesTypeCodeId(customerData.sales_type_code_id));

        dispatch(setDisplayPersonFetch(personData));
        for (const obj of personData) {
          dispatch(memoPersonId(obj.person_id));
        }
        dispatch(setDisplayContactFetch(contactData));
        dispatch(setDisplayAddressFetch(addressData));
        for (const obj of addressData) {
          dispatch(memoAddressId(obj.address_id));
        }
        dispatch(setDisplayFleetFetch(fleetData));
        for (const obj of fleetData) {
          dispatch(memoFleetId(obj.fleet_id));
        }
        dispatch(setDisplayVehicleFetch(vehicleData));
        for (const obj of vehicleData) {
          dispatch(memoVehicleId(obj.vehicle_id));
        }
        dispatch(setDisplayDocumentFetch(documentData));
      } else if (menu == "person" && !addOEditPerson.person.person_id) {
        dispatch(setPersonId(personData.person_id));
        dispatch(setFirstName(personData.firstname));
        dispatch(setLastName(personData.lastname));
        dispatch(setNickName(personData.nickname));
        dispatch(setDescription(personData.description));
        dispatch(setTitleCodeId(personData.title_code_id));

        for (const obj of personData.role) {
          dispatch(setRole(obj.role_code_id));
        }

        dispatch(setDisplayCustomerFetch(customerData));
        for (const obj of customerData) {
          dispatch(memoCustomerId(obj.customer_id));
        }

        dispatch(setDisplayContactFetch(contactData));
        dispatch(setDisplayAddressFetch(addressData));
      } else if (menu == "fleet" && !addOEditFleet.fleet.fleet_id) {
        dispatch(setFleetId(fleetData.fleet_id));
        dispatch(setFleetName(fleetData.fleet_name));
        dispatch(setParentFleetId(fleetData.parent_fleet_id));

        dispatch(setDisplayCustomerFetch(customerData));
        for (const obj of customerData) {
          dispatch(memoCustomerId(obj.customer_id));
        }
        dispatch(setDisplayPersonFetch(personData));
        for (const obj of personData) {
          dispatch(memoPersonId(obj.person_id));
        }
        dispatch(setDisplayVehicleFetch(vehicleData));
        for (const obj of vehicleData) {
          dispatch(memoVehicleId(obj.vehicle_id));
        }
      } else if (menu == "vehicle" && !addOEditVehicle.vehicle.vehicle_id) {
        dispatch(setVehicleId(vehicleData.vehicle_id));
        dispatch(setFrameNo(vehicleData.frame_no));
        dispatch(setLicensePlate(vehicleData.license_plate));
      } else if (menu == "address" && !addOEditAddress.address.address_id) {
        dispatch(setAddressId(Number(addNew1OId)));
        for (const obj of addressData.address_type) {
          dispatch(setAddressType(obj.address_type_code_id));
        }
        dispatch(setName(addressData.name));
        dispatch(setHouseNo(addressData.house_no));
        dispatch(setVillageNo(addressData.village_no));
        dispatch(setAlley(addressData.alley));
        dispatch(setRoad(addressData.road));
        dispatch(setProvince(addressData.province));
        dispatch(setDistrict(addressData.district));
        dispatch(setSubDistrict(addressData.sub_district));
        dispatch(setPostalCode(addressData.postal_code));
      } else if (menu == "contact" && !addOEditContact.contact.contact_id) {
      } else if (menu == "document" && !addOEditDocument.document.document_id) {
      } else if (menu == "card " && !addOEditCard.card.card_id) {
      } else if (menu == "device" && !addOEditDevice.device.device_id) {
        dispatch(setDeviceId);
      } else if (
        menu == "device-serial" &&
        !addOEditDeviceSerial.deviceSerial.device_serial_id
      ) {
      }
    }
  }, [individualData]);

  // เพิ่มข้อมูลใหม่เมื่อใน State ได้กรอกชื่อลูกค้า ลักษณะลูกค้า และประเภทลูกค้า แล้ว
  const handleAddNewData: () => void = () => {
    const customerData = addOEditCustomer.customer;
    const personData = addOEditPerson.person;
    const contactData = addOEditContact.contact;
    const fleetData = addOEditFleet.fleet;
    const addressData = addOEditAddress.address;
    const cardData = addOEditCard.card;
    const documentData = addOEditDocument.document;
    const vehicleData = addOEditVehicle.vehicle;
    const deviceData = addOEditDevice.device;
    const deviceSerialData = addOEditDeviceSerial.deviceSerial;

    const form = new FormData();
    for (const obj of files.getAll("files")) {
      form.append("files", obj);
    }
    const sendData =
      menu == "customer"
        ? { ...addOEditCustomer }
        : menu == "person"
        ? { ...addOEditPerson }
        : menu == "contact"
        ? { ...addOEditContact }
        : menu == "address"
        ? { ...addOEditAddress }
        : menu == "fleet"
        ? { ...addOEditFleet }
        : menu == "vehicle"
        ? { ...addOEditVehicle }
        : menu == "device"
        ? { ...addOEditDevice }
        : menu == "device-serial"
        ? { ...addOEditDeviceSerial }
        : menu == "document"
        ? { ...addOEditDocument }
        : menu == "card"
        ? { ...addOEditCard }
        : {};
    if (addNew2OEdit == "edit") {
      form.append(
        "jsonData",
        JSON.stringify({
          ...actionBy,
          ...addNewOAddExist,
          ...deleted,
          ...sendData,
        })
      );

      if (menu == "customer") {
        if (
          !customerData.customer_name ||
          !customerData.customer_type_code_id ||
          !customerData.sales_type_code_id
        ) {
          dispatch(setTogglePropsDefault());
          dispatch(
            setErrorPopUpState({
              active: true,
              message: "กรุณากรอกข้อมูลให้ครบถ้วนก่อนบันทึก",
            })
          );
        } else {
          putEditedData(form, Number(addNew1OId));
        }
      }
    } else {
      form.append(
        "jsonData",
        JSON.stringify({
          ...actionBy,
          ...addNewOAddExist,
          ...sendData,
        })
      );

      postNewData(form);
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
          if (obj.contact_id == id) {
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
          if (obj.address_id == id) {
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
          if (obj.fleet_id == id) {
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
          if (obj.vehicle_id == id) {
            dispatch(removeVehicleNew(id));
          }
        }
      }

      dispatch(setDisplayVehicleDelete(id));
    } else if (type == "document") {
    }
  };

  const handleSave = () => {
    let name;
    let title;

    const customerData = addOEditCustomer.customer;
    const personData = addOEditPerson.person;
    const contactData = addOEditContact.contact;
    const fleetData = addOEditFleet.fleet;
    const addressData = addOEditAddress.address;
    const cardData = addOEditCard.card;
    const documentData = addOEditDocument.document;
    const vehicleData = addOEditVehicle.vehicle;
    const deviceData = addOEditDevice.device;
    const deviceSerialData = addOEditDeviceSerial.deviceSerial;

    if (customerData.customer_name) {
      name = customerData.customer_name;
      title = "ลูกค้า";
    } else if (
      personData.firstname ||
      personData.lastname ||
      personData.nickname
    ) {
      name = personData.firstname;
      title = "บุคคล";
    } else if (contactData.value) {
      name = contactData.value;
      title = "การติดต่อ";
    } else {
      name = "";
      title = "";
    }

    dispatch(
      setTogglePropsState({
        active: true,
        name: name,
        title: title,
        type: addNew2OEdit ? "change" : "save",
        id: 0,
      })
    );
  };

  return (
    <>
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
      ) : menu == "document" ? (
        <AddNewDocument addNew2OEdit={addNew2OEdit} addNew1OId={addNew1OId} />
      ) : menu == "card" ? (
        <AddNewCard addNew2OEdit={addNew2OEdit} addNew1OId={addNew1OId} />
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
                    ? `add-new-${menu}/add-new-customer`
                    : `${addNew1OId}/edit/add-new-customer`
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
                  {/* <Td>{data.customer_id}</Td> */}
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
                    ? `add-new-${menu}/add-new-person`
                    : `${addNew1OId}/edit/add-new-person`
                }`}
              >
                <Button name="เพิ่มใหม่" />
              </Link>
              <Button
                name="เพิ่มที่มี"
                type="person"
                onClick={() => {
                  dispatch(setPopUpAddExistPerson());
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
              {displayData.person.map((data, i) => (
                <Tr type="tbody" key={data.person_id}>
                  <Td>{i + 1}</Td>
                  {/* <Td>{data.person_id}</Td> */}
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

      {menu == "customer" || menu == "person" ? (
        <Fragment>
          <Divider title="ข้อมูลผู้ติดต่อ" />
          {addNew2OEdit || isNaN(Number(addNew1OId)) ? (
            <ButtonLeftFrame>
              <Link
                to={`/${menu}/${
                  isNaN(Number(addNew1OId))
                    ? `add-new-${menu}/add-new-contact`
                    : `${addNew1OId}/edit/add-new-contact`
                }`}
              >
                <Button name="เพิ่มใหม่" />
              </Link>
              <Button name="เพิ่มที่มี" disabled />
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
                {/* <Td>{data.contact_id}</Td> */}
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

      {/* บัตร */}

      {menu == "person" ? (
        <Fragment>
          <Divider title="ข้อมูลบัตร" />
          {addNew2OEdit || isNaN(Number(addNew1OId)) ? (
            <ButtonLeftFrame>
              <Link
                to={`/${menu}/${
                  isNaN(Number(addNew1OId))
                    ? `add-new-${menu}/add-new-card`
                    : `${addNew1OId}/edit/add-new-card`
                }`}
              >
                <Button name="เพิ่มใหม่" />
              </Link>
              <Button name="เพิ่มที่มี" disabled />
            </ButtonLeftFrame>
          ) : (
            <></>
          )}
        </Fragment>
      ) : (
        <></>
      )}

      {displayData.card.length ? (
        <Table>
          <Thead>
            <Tr type="thead">
              <Th
                type="card"
                addNew1OId={addNew1OId}
                addNew2OEdit={addNew2OEdit}
              />
            </Tr>
          </Thead>
          <Tbody>
            {displayData.card.map((data, i) => (
              <Tr type="tbody" key={data.card_id}>
                <Td>{i + 1}</Td>
                {/* <Td>{data.contact_id}</Td> */}
                <Td>{data.card_type}</Td>
                <Td>{data.value}</Td>
                <Td>{data.owner_name}</Td>
                {!addNew2OEdit && !isNaN(Number(addNew1OId)) ? (
                  <></>
                ) : (
                  <Option
                    id={data.card_id.toString()}
                    onDelete={(e) => handleDelete(e, "card")}
                  ></Option>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <></>
      )}

      {/* เอกสาร */}

      {menu == "customer" || menu == "person" ? (
        <Fragment>
          <Divider title="ข้อมูลเอกสาร" />
          {addNew2OEdit || isNaN(Number(addNew1OId)) ? (
            <ButtonLeftFrame>
              <Link
                to={`/${menu}/${
                  isNaN(Number(addNew1OId))
                    ? `add-new-${menu}/add-new-document`
                    : `${addNew1OId}/edit/add-new-document`
                }`}
              >
                <Button name="เพิ่มใหม่" />
              </Link>
              <Button name="เพิ่มที่มี" disabled />
            </ButtonLeftFrame>
          ) : (
            <></>
          )}
        </Fragment>
      ) : (
        <></>
      )}

      {displayData.document.length ? (
        <Table>
          <Thead>
            <Tr type="thead">
              <Th
                type="document"
                addNew1OId={addNew1OId}
                addNew2OEdit={addNew2OEdit}
              />
            </Tr>
          </Thead>
          <Tbody>
            {displayData.document.map((data, i) => (
              <Tr type="tbody" key={data.document_id}>
                <Td>{i + 1}</Td>
                {/* <Td>{data.contact_id}</Td> */}
                <Td>{data.document_type}</Td>
                <Td onClick={getFile} id={data.document_id}>
                  {data.document_name}
                </Td>
                <Td>{data.owner_name}</Td>
                {!addNew2OEdit && !isNaN(Number(addNew1OId)) ? (
                  <></>
                ) : (
                  <Option
                    id={data.document_id.toString()}
                    onDelete={(e) => handleDelete(e, "document")}
                  ></Option>
                )}
              </Tr>
            ))}
          </Tbody>
        </Table>
      ) : (
        <></>
      )}

      {/* ที่อยู่ */}

      {menu == "customer" || menu == "person" ? (
        <Fragment>
          <Divider title="ข้อมูลที่อยู่" />
          {addNew2OEdit || isNaN(Number(addNew1OId)) ? (
            <ButtonLeftFrame>
              <Link
                to={`/${menu}/${
                  isNaN(Number(addNew1OId))
                    ? `add-new-${menu}/add-new-address`
                    : `${addNew1OId}/edit/add-new-address`
                }`}
              >
                <Button name="เพิ่มใหม่" />
              </Link>
              <Button
                name="เพิ่มที่มี"
                type="address"
                onClick={() => {
                  dispatch(setPopUpAddExistAddress());
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
            <Tbody>
              {displayData.address.map((data, i) => (
                <Tr type="tbody" key={data.address_id}>
                  <Td>{i + 1}</Td>
                  {/* <Td>{data.address_id}</Td> */}
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
                    ? `add-new-${menu}/add-new-fleet`
                    : `${addNew1OId}/edit/add-new-fleet`
                }`}
              >
                <Button name="เพิ่มใหม่" />
              </Link>
              <Button
                name="เพิ่มที่มี"
                type="address"
                onClick={() => {
                  dispatch(setPopUpAddExistFleet());
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
            <Tbody>
              {displayData.fleet.map((data, i) => (
                <Tr type="tbody" key={data.fleet_id}>
                  <Td>{i + 1}</Td>
                  {/* <Td>{data.fleet_id}</Td> */}
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

      {menu == "customer" || menu == "fleet" ? (
        <Fragment>
          <Divider title="ข้อมูลยานพาหนะ" />

          {addNew2OEdit || isNaN(Number(addNew1OId)) ? (
            <ButtonLeftFrame>
              <Link
                to={`/${menu}/${
                  isNaN(Number(addNew1OId))
                    ? `add-new-${menu}/add-new-vehicle`
                    : `${addNew1OId}/edit/add-new-vehicle`
                }`}
              >
                <Button name="เพิ่มใหม่" />
              </Link>
              <Button
                name="เพิ่มที่มี"
                type="address"
                onClick={() => {
                  dispatch(setPopUpAddExistVehicle());
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
            <Thead>
              <Tr type="thead">
                <Th
                  type="vehicle"
                  addNew1OId={addNew1OId}
                  addNew2OEdit={addNew2OEdit}
                />
              </Tr>
            </Thead>
            <Tbody>
              {displayData.vehicle.map((data, i) => (
                <Tr type="tbody" key={data.vehicle_id}>
                  <Td>{i + 1}</Td>
                  {/* <Td>{data.vehicle_id}</Td> */}
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
        {!addNew2OEdit && !isNaN(Number(addNew1OId)) ? (
          <></>
        ) : (
          <Button name="บันทึก" onClick={handleSave} type="submit" />
        )}
        <Link to={`/${menu}`}>
          <Button name="ยกเลิก" />
        </Link>
      </ButtonRightFrame>
      <TogglePopup handleConfirm={handleAddNewData} />
    </>
  );
}
