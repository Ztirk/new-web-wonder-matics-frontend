import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Divider from "../components/Table/Divider";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { MasterCode } from "../interface/mastercodeType";
import {
  addOEditDocumentState,
  setDocumentAddressId,
  setDocumentCodeId,
  setDocumentCustomerId,
  setDocumentName,
  setDocumentPersonId,
  setDocumentVehicleId,
} from "../features/addOEdit/addOEditDocumentSlice";
import { getSelector } from "../api/getSelector";
import Selector from "../components/Input/Selector";
import Button from "../components/Button/Button";
import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";
import { SendDocument } from "../interface/documentType";
import { addNewFile, filesState } from "../features/fileSlice";
import { setDocumentCodeNew } from "../features/addNewOAddExistSlice";
import { setDisplayDocumentIntereact } from "../features/displaySlice";
import { CustomerSelector, SendCustomer } from "../interface/customerType";
import { addOEditCustomerState } from "../features/addOEdit/addOEditCustomerSlice";
import {
  errorPopUpState,
  setErrorPopUpState,
} from "../features/errorPopUpSlice";
import { ErrorPopUpType } from "../interface/componentType";
import { PersonSelector } from "../interface/personType";
import { AddressSelector } from "../interface/addressType";
import { VehicleSelector } from "../interface/vehicleType";
import getPersonSelector from "../api/getPersonSelector";
import getCustomerSelector from "../api/getCustomerSelector";
import getLocationSelector from "../api/getLocationSelector";
import getLicensePlateSelector from "../api/getLicensePlateSelector";

export default function AddNewDocument() {
  const [selectorData, setSelectorData] = useState<MasterCode>();
  const [file, setFile] = useState<FileList[0] | null>(null);
  const [personSelector, setPersonSelector] = useState<PersonSelector>();
  const [customerSelector, setCustomerSelector] = useState<CustomerSelector>();
  const [addressSelector, setAddressSelector] = useState<AddressSelector>();
  const [vehicleSelector, setVehicleSelector] = useState<VehicleSelector>();

  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];
  const addNew1OId = segments[1];
  const addNew2OEdit = segments[2];
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const addOEditDocument: SendDocument = useSelector(addOEditDocumentState);
  const addOEditCustomer: SendCustomer = useSelector(addOEditCustomerState);
  const errorPopUp: ErrorPopUpType = useSelector(errorPopUpState);

  const files: FormData = useSelector(filesState);

  // useEffect
  useEffect(() => {
    getSelector(setSelectorData, "document");
  }, []);

  useEffect(() => {
    getPersonSelector(setPersonSelector);
    getCustomerSelector(setCustomerSelector);
    getLocationSelector(setAddressSelector);
    getLicensePlateSelector(setVehicleSelector);
  }, []);

  const handleClickSave = () => {
    const documentData = addOEditDocument.document;
    if (documentData.document_code_id) {
      dispatch(setDocumentCodeNew(documentData.document_code_id));
    }

    if (menu == "customer") {
      console.log(addNew1OId);
      dispatch(setDocumentCustomerId(Number(addNew1OId)));
    } else if (menu == "vehicle") {
      dispatch(setDocumentVehicleId(Number(addNew1OId)));
    } else if (menu == "person") {
      dispatch(setDocumentPersonId(Number(addNew1OId)));
    } else if (menu == "address") {
      dispatch(setDocumentAddressId(Number(addNew1OId)));
    }

    dispatch(setDocumentName(file?.name));

    if (
      !documentData.document_name &&
      !documentData.document_code_id &&
      (!documentData.address_id ||
        !documentData.customer_id ||
        !documentData.person_id ||
        !documentData.vehicle_id)
    ) {
      dispatch(setErrorPopUpState({ active: true, message: "" }));
    } else {
      dispatch(addNewFile(file));
      // const newForm = new FormData();
      // if (files.has("files")) {
      //   for (const i in files.getAll("files")) {
      //     if (documentData.document_name == files.getAll("files")[i]) {
      //       newForm.append("files", files.getAll("files")[i]);
      //     }
      //   }
      // }

      // if (!newForm.has("files")) {
      //   if (file) {
      //     newForm.append("files", file);
      //     dispatch(addNewFile(newForm));
      //   }
      //   console.log(files.get("files"));
      //   dispatch(
      //     setDisplayDocumentIntereact({
      //       document_id: uuidv4(),
      //       document_name: file ? file.name : "",
      //       document_type: selectorData
      //         ? selectorData.response[0].find(
      //             (data) => data.code_id == documentData.document_code_id
      //           ).value
      //         : "",
      //       owner_name: addOEditCustomer.customer.customer_name,
      //       RowNum: null,
      //     })
      //   );

      //   console.log("hello");

      //   navigate("..", { relative: "path" });
      // }
    }
  };
  return (
    <Fragment>
      {menu == "document" ? (
        <>
          <Divider title="ข้อมูลเจ้าของ" />
          <InputFrame>
            <Selector
              selectorData={[
                {
                  code_id: -1,
                  category: "ownerType",
                  class: null,
                  value: "บุคคล",
                },
                {
                  code_id: -2,
                  category: "ownerType",
                  class: null,
                  value: "ลูกค้า",
                },
                {
                  code_id: -3,
                  category: "ownerType",
                  class: null,
                  value: "ที่อยู่",
                },
                {
                  code_id: -4,
                  category: "ownerType",
                  class: null,
                  value: "ยานพาหนะ",
                },
              ]}
              label={"ประเภทเจ้าของ*"}
              type="selector"
              disabled={!isNaN(Number(addNew1OId)) ? true : false}
              required={
                errorPopUp.active &&
                !addOEditDocument.document.owner_type_code_id
              }
            />
            <Selector
              personSelector={
                addOEditDocument.document.owner_type_code_id == -1
                  ? personSelector
                  : undefined
              }
              customerSelector={
                addOEditDocument.document.owner_type_code_id == -2
                  ? customerSelector
                  : undefined
              }
              addressSelector={
                addOEditDocument.document.owner_type_code_id == -3
                  ? addressSelector
                  : undefined
              }
              vehicleSelector={
                addOEditDocument.document.owner_type_code_id == -4
                  ? vehicleSelector
                  : undefined
              }
              label={"ชื่อเจ้าของ"}
              type="selector"
              disabled={
                !isNaN(Number(addNew1OId)) ||
                !addOEditDocument.document.owner_type_code_id
                  ? true
                  : false
              }
              required={errorPopUp.active}
            />
          </InputFrame>
        </>
      ) : (
        <></>
      )}
      <Divider title="ข้อมูลเอกสาร" />
      <InputFrame>
        <Selector
          label={"ประเภทเอกสาร*"}
          disabled={false}
          type={"selector"}
          selectorData={
            menu == "customer"
              ? selectorData?.response[0]
              : menu == "person"
              ? selectorData?.response[1]
              : menu == "document" &&
                addOEditDocument.document.owner_type_code_id == -1
              ? selectorData?.response[1]
              : menu == "document" &&
                addOEditDocument.document.owner_type_code_id == -2
              ? selectorData?.response[0]
              : menu == "document" &&
                addOEditDocument.document.owner_type_code_id == -3
              ? selectorData?.response[3]
              : menu == "document" &&
                addOEditDocument.document.owner_type_code_id == -4
              ? selectorData?.response[2]
              : undefined
          }
          required={
            errorPopUp.active && !addOEditDocument.document.document_code_id
          }
        />
        <Input
          label="ชื่อเอกสาร*"
          type="file"
          setFile={setFile}
          required={
            errorPopUp.active && !addOEditDocument.document.document_name
          }
        />
        <Input label="วันที่อัปโหลด" type="date" disabled />
      </InputFrame>
      {menu !== "document" ? (
        <ButtonRightFrame>
          <Button name="บันทึก" onClick={handleClickSave} />

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
