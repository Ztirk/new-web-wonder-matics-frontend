import { useState, useEffect, Fragment } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { getSelector } from "../api/getSelector";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Divider from "../components/Table/Divider";
import { addOEditDeviceState } from "../features/addOEdit/addOEditDeviceSlice";
import { SendDevice } from "../interface/deviceType";
import { MasterCode } from "../interface/mastercodeType";
import { addOEditDeviceSerialState } from "../features/addOEdit/addOEditDeviceSerialSlice";
import { SendDeviceSerial } from "../interface/deviceSerialType";
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

  // useEffect
  useEffect(() => {
    // getSelector(setSelectorData, "device-serial");
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
        />
        <Input
          label="IMEI"
          placeholder="IMEI"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Selector
          label="ประเภทกล่อง"
          defaultValue="เลือกประเภทกล่อง"
          selectorData={selectorData}
          number={0}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="วันที่เพิ่ม"
          placeholder="วันที่เพิ่ม"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
      </InputFrame>
    </Fragment>
  );
}
