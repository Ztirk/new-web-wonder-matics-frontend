import { Fragment } from "react";
import { ToggleDelete } from "../interface/componentType";
import ButtonRightFrame from "./ฺButtonRightFrame";
import Button from "./Button";
import Divider from "./Divider";

interface Props {
  defaultToggleDelete: () => void;
  toggleDelete: ToggleDelete;
  handleCancel: () => void;
  handleConfirm: () => void;
}

export default function DeletePopUp({
  handleCancel,
  toggleDelete,
  handleConfirm,
}: Props) {
  return (
    <Fragment>
      {toggleDelete.active ? (
        <Fragment>
          <div
            className="absolute left-0 top-0 bg-black w-full h-full z-10 opacity-50 "
            onClick={handleCancel}
          ></div>
          <div className="absolute z-20 bg-white w-[500px] h-[240px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-md flex flex-col gap-3">
            <h1 className="px-5 pt-3 font-bold text-[18px]">
              {toggleDelete.title}
            </h1>
            <Divider title="" />
            <p className="px-5">
              คุณต้องการลบ
              <span className="font-bold"> {toggleDelete.name} </span>หรือไม่
            </p>
            <ButtonRightFrame>
              <Button name="ยืนยัน" onClick={handleConfirm} />
              <Button name="ยกเลิก" onClick={handleCancel} />
            </ButtonRightFrame>
          </div>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
}
