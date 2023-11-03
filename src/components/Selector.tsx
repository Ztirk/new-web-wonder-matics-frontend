import { Fragment, useState } from "react";
import { CustomerMasterCodeType } from "../interface/dataType";
import { MasterCode } from "../interface/mastercodeType";

interface Props {
  selectorData: CustomerMasterCodeType;
  label: string;
  defaultValue: string;
  number: number;
  defaultId: string;
  id: string;
  name: string;
  ref: React.RefObject<HTMLSelectElement>;
  disabled: boolean;
}

export default function Selector({
  selectorData,
  label,
  defaultValue,
  number,
  defaultId,
  id,
  name,
  ref,
  disabled,
  type,
}: Props) {
  const [test, setTest] = useState("");
  const [toggleSearchSelector, setToggleSearchSelector] =
    useState<boolean>(false);

  const handleToggleSearchSelector = () => {
    setToggleSearchSelector(!toggleSearchSelector);
  };
  return (
    <Fragment>
      {/* invisible bg */}
      <div
        className={`input-n-selector__invisible_bg ${
          toggleSearchSelector ? "" : "hidden"
        }`}
        onClick={handleToggleSearchSelector}
      ></div>

      {/* selector */}
      <div className="flex flex-col relative">
        <label className="font-bold">{label}</label>
        <div
          className="input-n-selector__border input-n-selector__size flex items-center"
          onClick={handleToggleSearchSelector}
        >
          <span className="w-[200px] overflow-hidden">hello</span>
          <i className="fa-solid fa-caret-down" />
        </div>
        {/* selector dropdown */}
        <div
          className={`input-n-selector__border input-n-selector__shadow w-[240px] absolute top-20 bg-white z-10 ${
            toggleSearchSelector ? "" : "hidden"
          }`}
        >
          {/* selector */}
          {type == "selector" ? <div>selector</div> : <></>}
          {/* multi selector */}
          {type == "multi-selector" ? (
            <ul>
              <li
                className={` grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md`}
              >
                <input type="checkbox" className="h-[20px] w-[20px] mx-3" />
                <label className="h-full flex items-center">eiei1</label>
              </li>
              <li
                className={` grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md`}
              >
                <input type="checkbox" className="h-[20px] w-[20px] mx-3" />
                <label className="h-full flex items-center">eiei2</label>
              </li>
            </ul>
          ) : (
            <></>
          )}
          {/* search selector */}
          {type == "search-selector" ? (
            <Fragment>
              <div className="input-n-selector__border p-2 m-1 grid grid-cols-[auto_1fr] gap-3">
                <label htmlFor="">
                  <i className="fa-solid fa-magnifying-glass" />
                </label>
                <input className="w-full" placeholder="ค้นหาชื่อฟลีต" />
              </div>
              <ul>
                <li
                  className={` grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md`}
                >
                  hello 1
                </li>
                <li
                  className={` grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md`}
                >
                  hello 2
                </li>
              </ul>
            </Fragment>
          ) : (
            <></>
          )}
        </div>
      </div>
    </Fragment>
  );
}
