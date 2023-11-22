import { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
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
  setModelName,
  setNumberOfAxles,
  setNumberOfTires,
  setNumberOfWheels,
  setVehicleId,
} from "../features/addOEdit/addOEditVehicleSlice";
import {
  BrandSelector,
  ModelSelector,
  SendVehicle,
} from "../interface/vehicleType";
import Button from "../components/Button/Button";
import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";
import { getBrandSelector, getModelSelector } from "../api/getVehicleSelector";
import { v4 as uuidv4 } from "uuid";
import { setVehicleNew } from "../features/addNewOAddExistSlice";
import { setDisplayVehicleInteract } from "../features/displaySlice";
import { ErrorPopUpType } from "../interface/componentType";
import {
  errorPopUpState,
  setErrorPopUpState,
} from "../features/errorPopUpSlice";

interface Props {
  addNew1OId: string;
  addNew2OEdit: string;
}

export default function AddNewVehicle({ addNew1OId, addNew2OEdit }: Props) {
  const [selectorData, setSelectorData] = useState<MasterCode>();
  const [brandSelector, setBrandSelector] = useState<BrandSelector>();
  const [modelSelector, setModelSelector] = useState<ModelSelector>();

  // Router
  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];
  const navigate = useNavigate();

  // Redux
  const dispatch = useDispatch();
  const addOEditVehicle: SendVehicle = useSelector(addOEditVehicleState);
  const errorPopUp: ErrorPopUpType = useSelector(errorPopUpState);

  // useEffect
  useEffect(() => {
    getSelector(setSelectorData, "vehicle");
  }, []);

  useEffect(() => {
    if (
      !addOEditVehicle.vehicle.brand_name &&
      !addOEditVehicle.vehicle.model_name
    ) {
      getBrandSelector(setBrandSelector);
    } else if (
      addOEditVehicle.vehicle.brand_name &&
      !addOEditVehicle.vehicle.model_name
    ) {
      getModelSelector(setModelSelector, addOEditVehicle);
    }
  }, [addOEditVehicle.vehicle.brand_name]);

  useEffect(() => {
    dispatch(setModelName(""));
  }, [addOEditVehicle.vehicle.brand_name]);

  useEffect(() => {
    if (
      addOEditVehicle.vehicle.brand_name &&
      addOEditVehicle.vehicle.model_name
    ) {
      if (modelSelector) {
        for (const obj of modelSelector.response.models) {
          if (obj.model == addOEditVehicle.vehicle.model_name) {
            dispatch(setVehicleId(obj.vehicle_model_id));
          }
        }
      }
    }
  }, [addOEditVehicle.vehicle.model_name]);

  const handleClickSave = () => {
    const vehicleData = addOEditVehicle.vehicle;

    if (
      !vehicleData.vehicle_type_code_id ||
      !vehicleData.driving_license_type_code_id ||
      !vehicleData.frame_no ||
      !vehicleData.license_plate ||
      !vehicleData.model_name ||
      !vehicleData.number_of_axles ||
      !vehicleData.number_of_tires ||
      !vehicleData.number_of_wheels ||
      !vehicleData.registration_province_code_id ||
      !vehicleData.registration_type_code_id ||
      !vehicleData.brand_name
    ) {
      dispatch(setErrorPopUpState({ active: true, message: "" }));
    } else {
      dispatch(setVehicleNew(vehicleData));
      dispatch(
        setDisplayVehicleInteract({
          frame_no: vehicleData.frame_no,
          license_plate: vehicleData.license_plate,
          model_type: vehicleData.brand_name + " " + vehicleData.model_name,
          RowNum: null,
          vehicle_id: uuidv4(),
          vehicle_type:
            selectorData?.response[0].find(
              (data) => data.code_id == vehicleData.vehicle_type_code_id
            )?.value ?? "",
        })
      );
      navigate("..", { relative: "path" });
    }
  };

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
          required={
            errorPopUp.active && !addOEditVehicle.vehicle.vehicle_type_code_id
          }
        />
        <Input
          label="ทะเบียนรถ*"
          placeholder="ทะเบียนรถ"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setLicensePlate(e.currentTarget.value));
          }}
          required={errorPopUp.active && !addOEditVehicle.vehicle.license_plate}
        />
        <Selector
          label="หมวดจังหวัด*"
          type="selector"
          selectorData={selectorData?.response[2]}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          required={
            errorPopUp.active &&
            !addOEditVehicle.vehicle.registration_province_code_id
          }
        />
        <Input
          label="เลขตัวถัง*"
          placeholder="เลขตัวถัง"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setFrameNo(e.currentTarget.value));
          }}
          required={errorPopUp.active && !addOEditVehicle.vehicle.frame_no}
        />
        <Selector
          label="ยี่ห้อยานยนต์*"
          type="selector"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          brandSelector={brandSelector}
          required={errorPopUp.active && !addOEditVehicle.vehicle.brand_name}
        />
        <Selector
          label="รุ่นยานยนต์*"
          type="selector"
          disabled={
            (!addNew2OEdit && !isNaN(Number(addNew1OId))) ||
            !addOEditVehicle.vehicle.brand_name
              ? true
              : false
          }
          modelSelector={modelSelector}
          required={errorPopUp.active && !addOEditVehicle.vehicle.model_name}
        />
        <Selector
          label="ลักษณะในการจดทะเบียน*"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          type="selector"
          selectorData={selectorData?.response[3]}
          required={
            errorPopUp.active &&
            !addOEditVehicle.vehicle.registration_type_code_id
          }
        />
        <Selector
          label="ประเภทใบขับขี่่*"
          type="selector"
          selectorData={selectorData?.response[1]}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          required={
            errorPopUp.active &&
            !addOEditVehicle.vehicle.driving_license_type_code_id
          }
        />
        <Input
          label="จำนวนเพลา*"
          placeholder="จำนวนเพลา"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNumberOfAxles(Number(e.currentTarget.value)));
          }}
          required={
            errorPopUp.active && !addOEditVehicle.vehicle.number_of_axles
          }
        />
        <Input
          label="จำนวนกงล้อ*"
          placeholder="จำนวนกงล้อ"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNumberOfWheels(Number(e.currentTarget.value)));
          }}
          required={
            errorPopUp.active && !addOEditVehicle.vehicle.number_of_wheels
          }
        />
        <Input
          label="จำนวนยาง*"
          placeholder="จำนวนยาง"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNumberOfTires(Number(e.currentTarget.value)));
          }}
          required={
            errorPopUp.active && !addOEditVehicle.vehicle.number_of_tires
          }
        />
      </InputFrame>
      {menu !== "vehicle" ? (
        <>
          <ButtonRightFrame>
            <Button name="บันทึก" onClick={handleClickSave} />

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
