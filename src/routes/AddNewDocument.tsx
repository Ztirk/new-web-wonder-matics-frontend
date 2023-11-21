import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Divider from "../components/Table/Divider";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { MasterCode } from "../interface/mastercodeType";
import { SendCard } from "../interface/cardType";
import {
  addOEditDocumentState,
  setDocumentCodeId,
} from "../features/addOEdit/addOEditDocumentSlice";
import { getSelector } from "../api/getSelector";
import Selector from "../components/Input/Selector";
import Button from "../components/Button/Button";
import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";
import { SendDocument } from "../interface/documentType";
import { filesState, setFiles } from "../features/fileSlice";
import { setDocumentCodeNew } from "../features/addNewOAddExistSlice";
import { setDisplayDocumentIntereact } from "../features/displaySlice";
import { SendCustomer } from "../interface/customerType";
import { addOEditCustomerState } from "../features/addOEdit/addOEditCustomerSlice";

interface Props {
  addNew1OId: string;
  addNew2OEdit: string;
}

export default function AddNewDocument({ addNew1OId, addNew2OEdit }: Props) {
  const [selectorData, setSelectorData] = useState<MasterCode>();

  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];

  const dispatch = useDispatch();
  const addOEditDocument: SendDocument = useSelector(addOEditDocumentState);
  const addOEditCustomer: SendCustomer = useSelector(addOEditCustomerState);
  const files: FormData = useSelector(filesState);
  const [file, setFile] = useState<FileList[0] | null>(null);

  // useEffect
  useEffect(() => {
    getSelector(setSelectorData, "document");
  }, []);

  const handleClickSave = () => {
    if (addOEditDocument.document.document_code_id) {
      dispatch(setDocumentCodeNew(addOEditDocument.document.document_code_id));
    }
    dispatch(
      setDisplayDocumentIntereact({
        document_id: uuidv4(),
        document_name: file ? file.name : "",
        document_type: selectorData
          ? selectorData.response[0].find(
              (data) =>
                data.code_id == addOEditDocument.document.document_code_id
            ).value
          : "",
        owner_name: addOEditCustomer.customer.customer_name,
        RowNum: null,
      })
    );
    dispatch(setFiles(file));
  };
  return (
    <Fragment>
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
              : undefined
          }
        />
        <Input label="ชื่อเอกสาร" type="file" setFile={setFile} />
        <Input label="วันที่อัปโหลด" type="date" />
      </InputFrame>
      {menu !== "document" ? (
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
