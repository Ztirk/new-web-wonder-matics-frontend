import { Fragment, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Divider from "../components/Table/Divider";
import { SendDevice } from "../interface/deviceType";
import { addOEditDeviceState } from "../features/addOEdit/addOEditDeviceSlice";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getSelector } from "../api/getSelector";
import { MasterCode } from "../interface/mastercodeType";
import Selector from "../components/Input/Selector";
import { ErrorPopUpType } from "../interface/componentType";
import { errorPopUpState } from "../features/errorPopUpSlice";

interface Props {
  addNew1OId?: string;
  addNew2OEdit?: string;
}

export default function AddNewDevice({ addNew1OId, addNew2OEdit }: Props) {
  const [selectorData, setSelectorData] = useState<MasterCode>();

  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const addOEditDevice: SendDevice = useSelector(addOEditDeviceState);
  const errorPopUp: ErrorPopUpType = useSelector(errorPopUpState);

  // useEffect
  useEffect(() => {
    getSelector(setSelectorData, "device");
  }, []);

  const handleClickSave = () => {};
  return (
    <Fragment>
      {/* อุปกรณ์ */}
      <Divider title="ข้อมูลอุปกรณ์" />
      <InputFrame>
        <Input
          label="device_id*"
          placeholder="device_id"
          type="number"
          disabled
          defaultValue={addOEditDevice.device.device_id}
        />
        <Input
          label="veh_id (เก่า)"
          placeholder="veh_id (เก่า)"
          type="number"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          defaultValue={addOEditDevice.device.veh_id ?? ""}
        />
        <Selector
          label="serial_id*"
          placeholder="serial_id"
          type="selector"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="วันที่เพิ่ม"
          placeholder="วันที่เพิ่ม"
          type="date-time"
          disabled
          defaultValue={addOEditDevice.device.create_date}
        />
      </InputFrame>

      {/* ค่ากำหนด */}
      <Divider title="ค่ากำหนด" />
      <InputFrame></InputFrame>
    </Fragment>
  );
}
