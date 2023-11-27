import { useEffect, Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Input from "../components/Input/Input";
import InputFrame from "../components/Input/InputFrame";
import Divider from "../components/Table/Divider";
import {
  addOEditFleetState,
  setFleetName,
} from "../features/addOEdit/addOEditFleetSlice";
import Selector from "../components/Input/Selector";
import Button from "../components/Button/Button";
import ButtonRightFrame from "../components/Button/ฺButtonRightFrame";
import {
  Fleet,
  FleetIterate,
  FleetSelector,
  SendFleet,
  SendFleetShape,
} from "../interface/fleetType";
import getFleetSelector from "../api/getFleetSelector";
import { v4 as uuidv4 } from "uuid";
import { setFleetNew } from "../features/addNewOAddExistSlice";
import { setDisplayFleetInteract } from "../features/displaySlice";
import { ErrorPopUpType } from "../interface/componentType";
import {
  errorPopUpState,
  setErrorPopUpState,
} from "../features/errorPopUpSlice";

interface Props {
  addNew1OId: string;
  addNew2OEdit: string;
}

export default function AddNewFleet({ addNew1OId, addNew2OEdit }: Props) {
  const [fleetSelector, setFleetSelector] = useState<FleetSelector>();
  // Router
  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];

  // Redux
  const dispatch = useDispatch();
  const addOEditFleet: SendFleet = useSelector(addOEditFleetState);
  const errorPopUp: ErrorPopUpType = useSelector(errorPopUpState);
  const navigate = useNavigate();

  // useEffect
  useEffect(() => {
    getFleetSelector(setFleetSelector);
  }, []);

  const handleClickSave = () => {
    const fleetData = addOEditFleet.fleet;
    const fleetId = uuidv4();
    const fleetName = fleetData.fleet_name;
    const parentFleetId = fleetData.parent_fleet_id;

    const newFleet: SendFleetShape = {
      fleet_id: fleetId,
      fleet_name: fleetName,
      parent_fleet_id: parentFleetId,
    };

    const displayFleet: FleetIterate = {
      fleet_id: fleetId,
      fleet_name: fleetName,
      RowNum: null,
      vehicle_count: 0,
    };

    if (!addOEditFleet.fleet.fleet_name) {
      dispatch(setErrorPopUpState({ active: true, message: "" }));
    } else {
      dispatch(setFleetNew(newFleet));
      dispatch(setDisplayFleetInteract(displayFleet));
      navigate("..", { relative: "path" });
    }
  };
  return (
    <Fragment>
      {/* ฟลีต */}
      <Divider title="ข้อมูลฟลีต" />
      <InputFrame>
        <Input
          label="ชื่อฟลีต*"
          placeholder="ชื่อฟลีต*"
          type="regular"
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            dispatch(setFleetName(e.currentTarget.value));
          }}
          required={errorPopUp.active && !addOEditFleet.fleet.fleet_name}
          defaultValue={addOEditFleet.fleet.fleet_name}
        />
        <Selector
          label="ชื่อหัวฟลีต"
          type="selector"
          fleetSelector={fleetSelector}
          disabled={!addNew2OEdit && !isNaN(Number(addNew1OId)) ? true : false}
        />
      </InputFrame>
      {menu !== "vehicle" ? (
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
