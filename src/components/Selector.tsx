import { Fragment, useState } from "react";
import { Selector, Selector, Selector } from "../interface/mastercodeType";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addOEditCustomerState,
  setCustomerTypeCodeId,
  setSalesTypeCodeId,
} from "../features/addOEditCustomerSlice";
import { SendCustomer } from "../interface/customerType";
import { setDisplayCustomerInteract } from "../features/displaySlice";

interface Props {
  selectorData?: Selector[];
  label: string;
  defaultValue: string;
  number: number;
  defaultId: string;
  id: string;
  name: string;
  ref: React.RefObject<HTMLSelectElement>;
  disabled: boolean;
  type: string;
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
  const dispatch = useDispatch();
  const addOEditCustomer: SendCustomer = useSelector(addOEditCustomerState);

  const [toggleSearchSelector, setToggleSearchSelector] =
    useState<boolean>(false);

  const handleToggleSearchSelector = () => {
    setToggleSearchSelector(!toggleSearchSelector);
  };

  const handleShowSelector: () => React.ReactNode = () => {
    let selectedData;
    if (selectorData) {
      const category = selectorData[0].category;
      const mcClass = selectorData[0].class;
      if (category == "customer" && mcClass == "customer_type") {
        selectedData = selectorData.find(
          (data) =>
            data.code_id == addOEditCustomer.customer.customer_type_code_id
        );
      } else if (category == "customer" && mcClass == "sales_type") {
        selectedData = selectorData.find(
          (data) => data.code_id == addOEditCustomer.customer.sales_type_code_id
        );
      }
    }
    return <>{selectedData ? selectedData.value : "ไม่ระบุ"}</>;
  };

  const handleClickSelector: (e: React.MouseEvent<HTMLLIElement>) => void = (
    e
  ) => {
    const code_id = Number(e.currentTarget.id);
    if (selectorData) {
      const category = selectorData[0].category;
      const mcClass = selectorData[0].class;
      if (category == "customer" && mcClass == "customer_type") {
        dispatch(setCustomerTypeCodeId(code_id));
      } else if (category == "customer" && mcClass == "sales_type") {
        dispatch(setSalesTypeCodeId(code_id));
      }
    }
  };
  return (
    <Fragment>
      {/* invisible bg */}
      <div
        className={`input-n-selector__invisible_bg z-10 ${
          toggleSearchSelector ? "" : "hidden"
        }`}
        onClick={handleToggleSearchSelector}
      ></div>

      {/* selector */}
      <div
        className={`flex flex-col relative cursor-pointer ${
          disabled ? "" : ""
        }`}
      >
        <label className="font-bold">{label}</label>
        <div
          className={`input-n-selector__border input-n-selector__size flex items-center ${
            disabled ? "bg-[#EFEFEF4D]" : ""
          }`}
          onClick={disabled ? undefined : handleToggleSearchSelector}
        >
          <span className="w-[200px] overflow-hidden">
            {handleShowSelector()}
          </span>
          <i className="fa-solid fa-chevron-down" />
        </div>
        {/* selector dropdown */}
        <div
          className={`input-n-selector__border input-n-selector__shadow w-[240px] absolute top-20 z-20 bg-white ${
            toggleSearchSelector ? "" : "hidden"
          }`}
        >
          {/* selector */}
          {type == "selector" ? (
            <ul onClick={handleToggleSearchSelector}>
              <li
                className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md`}
                id="0"
                onClick={handleClickSelector}
              >
                ไม่ระบุ
              </li>
              {selectorData ? (
                selectorData.map((data) => (
                  <li
                    className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md`}
                    id={data.code_id.toString()}
                    onClick={handleClickSelector}
                    key={data.code_id}
                  >
                    {data.value}
                  </li>
                ))
              ) : (
                <></>
              )}
            </ul>
          ) : (
            <></>
          )}
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
