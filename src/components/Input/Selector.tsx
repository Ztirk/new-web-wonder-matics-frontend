import { Fragment, useEffect, useState } from "react";
import {
  Selector,
  Selector,
  Selector,
  Selector,
} from "../../interface/mastercodeType";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addOEditCustomerState,
  setCustomerTypeCodeId,
  setSalesTypeCodeId,
} from "../../features/addOEdit/addOEditCustomerSlice";
import { SendCustomer } from "../../interface/customerType";
import { setDisplayCustomerInteract } from "../../features/displaySlice";
import { addOEditAddressState } from "../../features/addOEdit/addOEditAddressSlice";
import { addOEditContactState } from "../../features/addOEdit/addOEditContactSlice";
import { addOEditDeviceSerialState } from "../../features/addOEdit/addOEditDeviceSerialSlice";
import { addOEditDeviceState } from "../../features/addOEdit/addOEditDeviceSlice";
import { addOEditFleetState } from "../../features/addOEdit/addOEditFleetSlice";
import {
  addOEditPersonState,
  setTitleCodeId,
} from "../../features/addOEdit/addOEditPersonSlice";
import { addOEditVehicleState } from "../../features/addOEdit/addOEditVehicleSlice";
import { SendAddress } from "../../interface/addressType";
import { SendContact } from "../../interface/contactType";
import { SendDeviceSerial } from "../../interface/deviceSerialType";
import { SendDevice } from "../../interface/deviceType";
import { SendFleet } from "../../interface/fleetType";
import { SendPerson } from "../../interface/personType";
import { SendVehicle } from "../../interface/vehicleType";
import { Memo } from "../../interface/reduxType";
import { memoState } from "../../features/memoSlice";

interface Props {
  selectorData?: Selector[];
  label: string;
  disabled: boolean;
  type: string;
}

export default function Selector({
  selectorData,
  label,
  disabled,
  type,
}: Props) {
  // useState
  const [toggleSearchSelector, setToggleSearchSelector] =
    useState<boolean>(false);

  // Redux
  const dispatch = useDispatch();
  const addOEditCustomer: SendCustomer = useSelector(addOEditCustomerState);
  const addOEditPerson: SendPerson = useSelector(addOEditPersonState);
  const addOEditContact: SendContact = useSelector(addOEditContactState);
  const addOEditAddress: SendAddress = useSelector(addOEditAddressState);
  const addOEditFleet: SendFleet = useSelector(addOEditFleetState);
  const addOEditVehicle: SendVehicle = useSelector(addOEditVehicleState);
  const addOEditDevice: SendDevice = useSelector(addOEditDeviceState);
  const addOEditDeviceSerial: SendDeviceSerial = useSelector(
    addOEditDeviceSerialState
  );
  const memo: Memo = useSelector(memoState);

  const handleToggleSearchSelector = () => {
    setToggleSearchSelector(!toggleSearchSelector);
  };

  const handleShowSelector: () => string | undefined = () => {
    let selectedData: Selector | undefined;
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
      } else if (category == "person" && mcClass == "title") {
        selectedData = selectorData.find(
          (data) => data.code_id == addOEditPerson.person.title_code_id
        );
      }
    }
    return selectedData ? selectedData.value : undefined;
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
      } else if (category == "person" && mcClass == "title") {
        dispatch(setTitleCodeId(code_id));
      }
    }
  };

  const handleShowMultiSelector: () => React.ReactNode = () => {};
  const handleCheckMultiSelector: (
    e: React.MouseEvent<HTMLInputElement>
  ) => void = (e) => {
    const checked = e.currentTarget.checked;
    if (checked) {
    } else if (!checked) {
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
          {handleShowSelector() ? (
            <i className="fa-solid fa-x" onClick={handleClickSelector} />
          ) : (
            <i className="fa-solid fa-chevron-down" />
          )}
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
          ) : type == "multi-selector" ? (
            <>
              <div className="input-n-selector__border p-2 m-1 grid grid-cols-[auto_1fr] gap-3">
                <label htmlFor="">
                  <i className="fa-solid fa-magnifying-glass" />
                </label>
                <input className="w-full" placeholder="ค้นหาชื่อฟลีต" />
              </div>
              <ul>
                {selectorData ? (
                  selectorData.map((data) => (
                    <li
                      className={`grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md`}
                    >
                      <input
                        type="checkbox"
                        className="h-[20px] w-[20px] mx-3"
                        id={data.code_id.toString()}
                        onClick={handleCheckMultiSelector}
                      />
                      <label
                        className="h-full flex items-center"
                        htmlFor={data.code_id.toString()}
                      >
                        {data.value}
                      </label>
                    </li>
                  ))
                ) : (
                  <></>
                )}
              </ul>
            </>
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
