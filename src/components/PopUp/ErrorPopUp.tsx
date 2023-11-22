import { useSelector } from "react-redux";
import {
  errorPopUpState,
  setErrorPopUpState,
} from "../../features/errorPopUpSlice";
import { ErrorPopUp } from "../../interface/componentType";
import { useDispatch } from "react-redux";

export default function ErrorPopUp() {
  const errorPopUp: ErrorPopUp = useSelector(errorPopUpState);
  const dispatch = useDispatch();
  return (
    <>
      {errorPopUp.active ? (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 h-12 z-50 w-[800px] bg-[#F8D7DA] rounded-sm flex justify-between items-center px-3">
          <p>
            <span className="font-bold">เกิดข้อผิดพลาด </span>-{" กรุณากรอกข้อมูลให้ครบถ้วนก่อนกดบันทึก"}
            {/* {errorPopUp.message} */}
          </p>
          <i
            className="fa-solid fa-x cursor-pointer"
            onClick={() => {
              dispatch(setErrorPopUpState({ active: false, message: "" }));
            }}
          />
        </div>
      ) : (
        <></>
      )}
    </>
  );
}
