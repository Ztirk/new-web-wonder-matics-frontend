import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getSelector } from "../api/getSelector";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Divider from "../components/Table/Divider";
import { MasterCode } from "../interface/mastercodeType";
import { addOEditDeviceSerialState } from "../features/addOEdit/addOEditDeviceSerialSlice";
import { SendDeviceSerial } from "../interface/deviceSerialType";
import { ErrorPopUpType } from "../interface/componentType";
import { errorPopUpState } from "../features/errorPopUpSlice";
import Selector from "../components/Input/Selector";
interface Props {
  addNew1OId: string;
  addNew2OEdit: string;
}

export default function AddNewDeviceSerial({
  addNew1OId,
  addNew2OEdit,
}: Props) {
  const [selectorData, setSelectorData] = useState<MasterCode>();

  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];

  const dispatch = useDispatch();
  const addOEditDeviceSerial: SendDeviceSerial = useSelector(
    addOEditDeviceSerialState
  );
  const errorPopUp: ErrorPopUpType = useSelector(errorPopUpState);

  // useEffect
  useEffect(() => {
    getSelector(setSelectorData, "device-serial");
  }, []);

  return (
    <Fragment>
      <Divider title="ข้อมูลชุดอุปกรณ์" />
      <InputFrame>
        <Input
          label="device_serial"
          placeholder="device_serial"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          defaultValue={addOEditDeviceSerial.deviceSerial.serial_id}
        />
        <Input
          label="IMEI"
          placeholder="IMEI"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          defaultValue={addOEditDeviceSerial.deviceSerial.imei_serial}
        />
        <Selector
          label="ประเภทกล่อง"
          type="selector"
          selectorData={selectorData?.response[0]}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="วันที่เพิ่ม"
          placeholder="วันที่เพิ่ม"
          type="date-time"
          disabled
          defaultValue={addOEditDeviceSerial.deviceSerial.create_date}
        />
      </InputFrame>
    </Fragment>
  );
}
