import { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { getSelector } from "../api/getSelector";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Divider from "../components/Table/Divider";
import { MasterCode } from "../interface/mastercodeType";
import Selector from "../components/Input/Selector";
import {
  addOEditVehicleState,
  setFrameNo,
  setLicensePlate,
  setNumberOfAxles,
  setNumberOfTires,
  setNumberOfWheels,
} from "../features/addOEdit/addOEditVehicleSlice";
import { SendVehicle } from "../interface/vehicleType";
import Button from "../components/Button/Button";
import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";

interface Props {
  addNew1OId: string;
  addNew2OEdit: string;
}

export default function AddNewVehicle({ addNew1OId, addNew2OEdit }: Props) {
  const [selectorData, setSelectorData] = useState<MasterCode>();
  const [brandSelector, setBrandSelector] = useState<>();
  const [modelSelector, setModelSelector] = useState<>();
  const [pickedBrandModel, setPickedBrandModel] = useState<>();

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

  useEffect(() => {}, [addOEditVehicle.vehicle.]);
  useEffect(() => {}, []);
  return (
    <Fragment>
      {/* ยานพาหนะ */}
      <Divider title="ข้อมูลยานพาหนะ" />
      <InputFrame>
        <Selector
          label="ประเภทยานพาหนะ*"
          type="selector"
          selectorData={selectorData?.response[0]}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="ทะเบียนรถ*"
          placeholder="ทะเบียนรถ"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setLicensePlate(e.currentTarget.value));
          }}
        />
        <Selector
          label="หมวดจังหวัด*"
          type="selector"
          selectorData={selectorData?.response[2]}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="เลขตัวถัง*"
          placeholder="เลขตัวถัง"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setFrameNo(e.currentTarget.value));
          }}
        />
        <Selector
          label="ยี่ห้อยานยนต์*"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Selector
          label="รุ่นยานยนต์*"
          type="selector"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Selector
          label="ลักษณะในการจดทะเบียน*"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          type="selector"
          selectorData={selectorData?.response[3]}
        />
        <Selector
          label="ประเภทใบขับขี่่*"
          type="selector"
          selectorData={selectorData?.response[1]}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
        <Input
          label="จำนวนเพลา*"
          placeholder="จำนวนเพลา"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNumberOfAxles(Number(e.currentTarget.value)));
          }}
        />
        <Input
          label="จำนวนกงล้อ*"
          placeholder="จำนวนกงล้อ"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNumberOfWheels(Number(e.currentTarget.value)));
          }}
        />
        <Input
          label="จำนวนยาง*"
          placeholder="จำนวนยาง"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNumberOfTires(Number(e.currentTarget.value)));
          }}
        />
      </InputFrame>
      {menu !== "vehicle" ? (
        <>
          <ButtonRightFrame>
            <Link to=".." relative="path">
              <Button name="บันทึก" onClick={handleClickSave} />
            </Link>
            <Link to=".." relative="path">
              <Button name="ยกเลิก" />
            </Link>
          </ButtonRightFrame>
        </>
      ) : (
        <>
          <Divider title="ค่ากำหนด" />
          <InputFrame>
            <Input
              label="ความเร็วสูงสุด*"
              placeholder="ความเร็วสูงสุด"
              type="regular"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch();
              }}
            />
            <Input
              label="เวลา idel (นาที)*"
              placeholder="เวลา idel (นาที)"
              type="regular"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch();
              }}
            />
            <Input
              label="fuel tank number*"
              placeholder="fuel tank number"
              type="regular"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch();
              }}
            />
            <Input
              label="fuel tank capacity*"
              placeholder="fuel tank capacity"
              type="regular"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch();
              }}
            />
            <Input
              label="max fuel voltage 1*"
              placeholder="max fuel voltage 1"
              type="regular"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch();
              }}
            />
            <Input
              label="max fuel voltage 2*"
              placeholder="max fuel voltage 2"
              type="regular"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch();
              }}
            />
          </InputFrame>
        </>
      )}
    </Fragment>
  );
}
