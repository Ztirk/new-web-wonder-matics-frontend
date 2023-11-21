import { Fragment } from "react";
import ButtonRightFrame from "../Button/ฺButtonRightFrame";
import Button from "../Button/Button";
import Divider from "../Table/Divider";
import { ToggleProps } from "../../interface/componentType";
import { useSelector } from "react-redux";
import {
  setTogglePropsDefault,
  togglePropsPopUpState,
} from "../../features/togglePropsPopUpSlice";
import { useDispatch } from "react-redux";

interface Props {
  handleConfirm: () => void;
}

export default function TogglePopup({ handleConfirm }: Props) {
  const toggleProps: ToggleProps = useSelector(togglePropsPopUpState);
  const dispatch = useDispatch();

  return (
    <Fragment>
      {toggleProps.active ? (
        <Fragment>
          <div
            className="absolute left-0 top-0 bg-black w-full h-full z-30 opacity-50 "
            onClick={() => {
              dispatch(setTogglePropsDefault());
            }}
          ></div>
          <div className="px-5 py-3 absolute z-40 bg-white w-[500px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col gap-5">
            <h1 className="text-[18px]">
              {toggleProps.type == "delete" ? (
                <>ลบข้อมูล</>
              ) : toggleProps.type == "save" ? (
                <>เพิ่มข้อมูล</>
              ) : toggleProps.type == "change" ? (
                <>เปลี่ยนแปลงข้อมูล</>
              ) : (
                <></>
              )}{" "}
              <span className="font-bold">{toggleProps.title}</span>
            </h1>
            <Divider title="" />
            <p className="">
              {toggleProps.type == "delete"
                ? "คุณต้องการลบ"
                : toggleProps.type == "save"
                ? "คุณต้องการเพิ่ม"
                : toggleProps.type == "change"
                ? "คุณต้องการเปลี่ยนแปลง"
                : ""}
              <span className="font-bold"> {toggleProps.name} </span>
              {toggleProps.type == "delete"
                ? `ออกจากรายการข้อมูล`
                : toggleProps.type == "save"
                ? "ไปยังรายการข้อมูล"
                : toggleProps.type == "change"
                ? "ในรายการข้อมูล"
                : ""}
              <span className="font-bold"> {toggleProps.title} </span>
              {" หรือไม่"}
            </p>
            <ButtonRightFrame>
              <Button name="ยืนยัน" onClick={handleConfirm} />
              <Button
                name="ยกเลิก"
                onClick={() => dispatch(setTogglePropsDefault())}
              />
            </ButtonRightFrame>
          </div>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
}
