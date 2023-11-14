import { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getSelector } from "../api/getSelector";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Divider from "../components/Table/Divider";
import { MasterCode } from "../interface/mastercodeType";
import Selector from "../components/Input/Selector";
import { addOEditVehicleState } from "../features/addOEdit/addOEditVehicleSlice";
import { SendVehicle } from "../interface/vehicleType";
import Button from "../components/Button/Button";
import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";

interface Props {
  addNew1OId: string;
  addNew2OEdit: string;
}

export default function AddNewVehicle({ addNew1OId, addNew2OEdit }: Props) {
  const [selectorData, setSelectorData] = useState<MasterCode>();
  // Router
  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];

  // Redux
  const dispatch = useDispatch();
  const addOEditVehicle: SendVehicle = useSelector(addOEditVehicleState);

  // useEffect
  useEffect(() => {
    getSelector(setSelectorData, "vehicle");
  }, []);

  const handleClickSave = () => {};
  return (
    <Fragment>
      {/* ยานพาหนะ */}
      <Divider title="ข้อมูลยานพาหนะ" />
      <InputFrame>
        <Selector
          label="ประเภทยานพาหนะ"
          defaultValue="เลือกประเภทยานพาหนะ"
          selectorData={selectorData?.response[0]}
          number={0}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="ทะเบียนรถ"
          placeholder="ทะเบียนรถ"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Selector
          label="หมวดจังหวัด"
          defaultValue="เลือกหมวดจังหวัด"
          selectorData={selectorData?.response[1]}
          number={0}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="เลขตัวถัง"
          placeholder="เลขตัวถัง"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Selector
          label="ยี่ห้อยานยนต์"
          defaultValue="เลือกยี่ห้อยานยนต์"
          selectorData={selectorData?.response[1]}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Selector
          label="รุ่นยานยนต์"
          defaultValue="เลือกรุ่นยานยนต์"
          selectorData={selectorData?.response[1]}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="ลักษณะในการจดทะเบียน"
          placeholder="ลักษณะในการจดทะเบียน"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          type="regular"
        />
        <Selector
          label="ประเภทใบขับขี่่"
          defaultValue="เลือกประเภทใบขับขี่่"
          selectorData={selectorData?.response[2]}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="จำนวนเพลา"
          placeholder="จำนวนเพลา"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="จำนวนกงล้อ"
          placeholder="จำนวนกงล้อ"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="จำนวนยาง"
          placeholder="จำนวนยาง"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
      </InputFrame>
      <Divider title="ค่ากำหนด" />
      <InputFrame>
        <Input
          label="ความเร็วสูงสุด"
          placeholder="ความเร็วสูงสุด"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="เวลา idel (นาที)"
          placeholder="เวลา idel (นาที)"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="fuel tank number"
          placeholder="fuel tank number"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="fuel tank capacity"
          placeholder="fuel tank capacity"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="max fuel voltage 1"
          placeholder="max fuel voltage 1"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="max fuel voltage 2"
          placeholder="max fuel voltage 2"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
      </InputFrame>
      {menu !== "vehicle" ? (
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
