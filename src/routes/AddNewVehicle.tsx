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
  setDIW,
  setDLT,
  setFrameNo,
  setFuelStatus,
  setIdleTime,
  setLicensePlate,
  setMaxEmptyVoltage,
  setMaxEmptyVoltage2,
  setMaxEmptyVoltage3,
  setMaxFuel,
  setMaxFuel2,
  setMaxFuel3,
  setMaxFuelVoltage,
  setMaxFuelVoltage2,
  setMaxFuelVoltage3,
  setMaxSpeed,
  setModelName,
  setNumberOfAxles,
  setNumberOfTires,
  setNumberOfWheels,
  setSCGL,
  setTLS,
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
    }
    if (
      (addOEditVehicle.vehicle.brand_name &&
        !addOEditVehicle.vehicle.model_name) ||
      (addOEditVehicle.vehicle.brand_name && addOEditVehicle.vehicle.model_name)
    ) {
      getModelSelector(setModelSelector, addOEditVehicle);
    }
  }, [addOEditVehicle.vehicle.brand_name]);

  useEffect(() => {
    if (!addOEditVehicle.vehicle.brand_name) dispatch(setModelName(""));
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
          defaultValue={addOEditVehicle.vehicle.license_plate}
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
          defaultValue={addOEditVehicle.vehicle.frame_no}
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
          type="number"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNumberOfAxles(Number(e.currentTarget.value)));
          }}
          required={
            errorPopUp.active && !addOEditVehicle.vehicle.number_of_axles
          }
          defaultValue={addOEditVehicle.vehicle.number_of_axles}
        />
        <Input
          label="จำนวนกงล้อ*"
          placeholder="จำนวนกงล้อ"
          type="number"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNumberOfWheels(Number(e.currentTarget.value)));
          }}
          required={
            errorPopUp.active && !addOEditVehicle.vehicle.number_of_wheels
          }
          defaultValue={addOEditVehicle.vehicle.number_of_wheels}
        />
        <Input
          label="จำนวนยาง*"
          placeholder="จำนวนยาง"
          type="number"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setNumberOfTires(Number(e.currentTarget.value)));
          }}
          required={
            errorPopUp.active && !addOEditVehicle.vehicle.number_of_tires
          }
          defaultValue={addOEditVehicle.vehicle.number_of_tires}
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
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setMaxSpeed(Number(e.currentTarget.value)));
              }}
              defaultValue={addOEditVehicle.vehicleConfig.max_speed}
            />
            <Input
              label="เวลา idle (นาที)*"
              placeholder="เวลา idle (นาที)"
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setIdleTime(Number(e.currentTarget.value)));
              }}
              defaultValue={addOEditVehicle.vehicleConfig.idle_time}
            />
            {/* <Input
              label="fuel tank number*"
              placeholder="fuel tank number"
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch();
              }}
              defaultValue={addOEditVehicle.vehicleConfig.fuel}
            /> */}
            {/* <Input
              label="fuel tank capacity*"
              placeholder="fuel tank capacity"
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch();
              }}
            /> */}
            <Input
              label="max fuel voltage 1*"
              placeholder="max fuel voltage 1"
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setMaxFuelVoltage(Number(e.currentTarget.value)));
              }}
              defaultValue={addOEditVehicle.vehicleConfig.max_fuel_voltage}
            />
            <Input
              label="max fuel voltage 2*"
              placeholder="max fuel voltage 2"
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setMaxFuelVoltage2(Number(e.currentTarget.value)));
              }}
              defaultValue={addOEditVehicle.vehicleConfig.max_fuel_voltage_2}
            />
            <Input
              label="max fuel voltage 3*"
              placeholder="max fuel voltage 3"
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setMaxFuelVoltage3(Number(e.currentTarget.value)));
              }}
              defaultValue={addOEditVehicle.vehicleConfig.max_fuel_voltage_3}
            />
            <Input
              label="max fuel*"
              placeholder="max fuel"
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setMaxFuel(Number(e.currentTarget.value)));
              }}
              defaultValue={addOEditVehicle.vehicleConfig.max_fuel}
            />
            <Input
              label="max fuel 2*"
              placeholder="max fuel 2"
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setMaxFuel2(Number(e.currentTarget.value)));
              }}
              defaultValue={addOEditVehicle.vehicleConfig.max_fuel_2}
            />
            <Input
              label="max fuel 3*"
              placeholder="max fuel 3"
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setMaxFuel3(Number(e.currentTarget.value)));
              }}
              defaultValue={addOEditVehicle.vehicleConfig.max_fuel_3}
            />
            <Input
              label="max empty voltage*"
              placeholder="max empty voltage"
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setMaxEmptyVoltage(Number(e.currentTarget.value)));
              }}
              defaultValue={addOEditVehicle.vehicleConfig.max_empty_voltage}
            />
            <Input
              label="max empty voltage 2*"
              placeholder="max empty voltage 2"
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setMaxEmptyVoltage2(Number(e.currentTarget.value)));
              }}
              defaultValue={addOEditVehicle.vehicleConfig.max_empty_voltage_2}
            />
            <Input
              label="max fuel voltage 3*"
              placeholder="max fuel voltage 3"
              type="number"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setMaxEmptyVoltage3(Number(e.currentTarget.value)));
              }}
              defaultValue={addOEditVehicle.vehicleConfig.max_empty_voltage_3}
            />
            <Input
              label="fuel status*"
              placeholder="fuel status"
              type="checkbox-form"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChecked={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setFuelStatus(e.currentTarget.checked));
              }}
              defaultValue={addOEditVehicle.vehicleConfig.fuel_status}
            />
          </InputFrame>
          <InputFrame>
            <Input
              label="DLT*"
              placeholder="DLT"
              type="checkbox-form"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChecked={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setDLT(e.currentTarget.checked));
              }}
              defaultValue={addOEditVehicle.vehiclePermit.dlt}
            />
            <Input
              label="TLS*"
              placeholder="TLS"
              type="checkbox-form"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChecked={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setTLS(e.currentTarget.checked));
              }}
              defaultValue={addOEditVehicle.vehiclePermit.tls}
            />
            <Input
              label="SCGL*"
              placeholder="SCGL"
              type="checkbox-form"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChecked={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setSCGL(e.currentTarget.checked));
              }}
              defaultValue={addOEditVehicle.vehiclePermit.scgl}
            />
            <Input
              label="DIW*"
              placeholder="DIW"
              type="checkbox-form"
              disabled={
                !addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false
              }
              onChecked={(e: React.ChangeEvent<HTMLInputElement>) => {
                dispatch(setDIW(e.currentTarget.checked));
              }}
              defaultValue={addOEditVehicle.vehiclePermit.diw}
            />
          </InputFrame>
        </>
      )}
    </Fragment>
  );
}
