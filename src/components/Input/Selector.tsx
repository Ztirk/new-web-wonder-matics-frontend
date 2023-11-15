import React, { Fragment, useEffect, useRef, useState } from "react";
import { Selector } from "../../interface/mastercodeType";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
  addOEditCustomerState,
  setCustomerTypeCodeId,
  setSalesTypeCodeId,
} from "../../features/addOEdit/addOEditCustomerSlice";
import { SendCustomer } from "../../interface/customerType";
import {
  addOEditAddressState,
  removeAddressType,
  removeAddressTypeDelete,
  setAddressType,
  setAddressTypeDelete,
  setDistrict,
  setProvince,
  setSubDistrict,
} from "../../features/addOEdit/addOEditAddressSlice";
import {
  addOEditContactState,
  setContactCodeId,
} from "../../features/addOEdit/addOEditContactSlice";
import { addOEditDeviceSerialState } from "../../features/addOEdit/addOEditDeviceSerialSlice";
import { addOEditDeviceState } from "../../features/addOEdit/addOEditDeviceSlice";
import {
  addOEditFleetState,
  setParentFleetId,
} from "../../features/addOEdit/addOEditFleetSlice";
import {
  addOEditPersonState,
  removeRole,
  removeRoleDelete,
  setRole,
  setRoleDelete,
  setTitleCodeId,
} from "../../features/addOEdit/addOEditPersonSlice";
import {
  addOEditVehicleState,
  setDrivingLicenseTypeCodeId,
  setRegistrationProvinceCodeId,
  setRegistrationTypeCodeId,
  setVehicleTypeCodeId,
} from "../../features/addOEdit/addOEditVehicleSlice";
import {
  DistrictSelector,
  PickedAddress,
  ProvinceSelector,
  SendAddress,
  SubDistrictSelector,
} from "../../interface/addressType";
import { SendContact } from "../../interface/contactType";
import { SendDeviceSerial } from "../../interface/deviceSerialType";
import { SendDevice } from "../../interface/deviceType";
import { Fleet, FleetIterate, SendFleet } from "../../interface/fleetType";
import { SendPerson } from "../../interface/personType";
import { SendVehicle } from "../../interface/vehicleType";
import { Memo } from "../../interface/reduxType";
import { memoState } from "../../features/memoSlice";
import { useLocation } from "react-router-dom";

interface Props {
  selectorData?: Selector[];
  fleetSelector?: Fleet;
  provinceSelector?: ProvinceSelector;
  districtSelector?: DistrictSelector;
  subDistrictSelector?: SubDistrictSelector;
  label: string;
  disabled: boolean;
  type: "selector" | "multi-selector" | "search-selector";
  setPickedAddress?: React.Dispatch<React.SetStateAction<PickedAddress>>;
  pickedAddress?: PickedAddress;
  defaultValue?: string;
}

export default function Selector({
  selectorData,
  label,
  disabled,
  type,
  setPickedAddress,
  fleetSelector,
  provinceSelector,
  districtSelector,
  subDistrictSelector,
  pickedAddress,
  defaultValue,
}: Props) {
  // useState
  const [toggleSearchSelector, setToggleSearchSelector] =
    useState<boolean>(false);

  const [searchString, setSearchString] = useState<string>("");

  // Router
  const location = useLocation();
  const segments = location.pathname.split("/").splice(1);
  const menu = segments[0];

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
    if (selectorData) {
      let selectedData: Selector | undefined;
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
      } else if (category == "contact" && mcClass == null) {
        selectedData = selectorData.find(
          (data) => data.code_id == addOEditContact.contact.contact_code_id
        );
      } else if (category == "vehicle" && mcClass == "type") {
        selectedData = selectorData.find(
          (data) => data.code_id == addOEditVehicle.vehicle.vehicle_type_code_id
        );
      } else if (category == "vehicle" && mcClass == "registration_type") {
        selectedData = selectorData.find(
          (data) =>
            data.code_id == addOEditVehicle.vehicle.registration_type_code_id
        );
      } else if (category == "vehicle" && mcClass == "registration_province") {
        selectedData = selectorData.find(
          (data) =>
            data.code_id ==
            addOEditVehicle.vehicle.registration_province_code_id
        );
      } else if (category == "vehicle" && mcClass == "driving_license") {
        selectedData = selectorData.find(
          (data) =>
            data.code_id == addOEditVehicle.vehicle.driving_license_type_code_id
        );
      }
      return selectedData ? selectedData.value : undefined;
    } else if (fleetSelector) {
      const selectedData: FleetIterate | undefined =
        fleetSelector.response.fleet.find(
          (data) => data.fleet_id == addOEditFleet.fleet.parent_fleet_id
        );
      return selectedData ? selectedData.fleet_name : undefined;
    } else if (provinceSelector) {
      const selectedData:
        | ProvinceSelector["response"]["provinces"][0]
        | undefined = provinceSelector.response.provinces.find(
        (data) => data.province_th == addOEditAddress.address.province
      );

      return selectedData ? selectedData.province_th : undefined;
    } else if (districtSelector) {
      const selectedData:
        | DistrictSelector["response"]["districts"][0]
        | undefined = districtSelector.response.districts.find(
        (data) => data.district_th == addOEditAddress.address.district
      );

      return selectedData ? selectedData.district_th : undefined;
    } else if (subDistrictSelector) {
      const selectedData:
        | SubDistrictSelector["response"]["sub_districts"][0]
        | undefined = subDistrictSelector.response.sub_districts.find(
        (data) => data.sub_district_th == addOEditAddress.address.sub_district
      );

      return selectedData ? selectedData.sub_district_th : undefined;
    }
  };

  const handleClickSelector: (e: React.MouseEvent<HTMLLIElement>) => void = (
    e
  ) => {
    if (selectorData) {
      const code_id = Number(e.currentTarget.id);
      const category = selectorData[0].category;
      const mcClass = selectorData[0].class;
      if (category == "customer" && mcClass == "customer_type") {
        dispatch(setCustomerTypeCodeId(code_id));
      } else if (category == "customer" && mcClass == "sales_type") {
        dispatch(setSalesTypeCodeId(code_id));
      } else if (category == "person" && mcClass == "title") {
        dispatch(setTitleCodeId(code_id));
      } else if (category == "contact" && mcClass == null) {
        dispatch(setContactCodeId(code_id));
      } else if (category == "vehicle" && mcClass == "type") {
        dispatch(setVehicleTypeCodeId(code_id));
      } else if (category == "vehicle" && mcClass == "registration_type") {
        dispatch(setRegistrationTypeCodeId(code_id));
      } else if (category == "vehicle" && mcClass == "registration_province") {
        dispatch(setRegistrationProvinceCodeId(code_id));
      } else if (category == "vehicle" && mcClass == "driving_license") {
        dispatch(setDrivingLicenseTypeCodeId(code_id));
      }
    } else if (fleetSelector) {
      const fleet_id = Number(e.currentTarget.id);
      dispatch(setParentFleetId(fleet_id));
    } else if (provinceSelector) {
      const province = e.currentTarget.id;
      dispatch(setProvince(province));
    } else if (districtSelector) {
      const district = e.currentTarget.id;
      dispatch(setDistrict(district));
    } else if (subDistrictSelector) {
      const subDistrict = e.currentTarget.id;
      dispatch(setSubDistrict(subDistrict));
    }

    handleToggleSearchSelector();
  };

  const handleShowMultiSelector: () => React.ReactNode = () => {
    let selectedData: Selector[] | [] = [];

    if (selectorData) {
      if (selectorData) {
        const category = selectorData[0].category;
        const mcClass = selectorData[0].class;
        if (category == "role" && mcClass == null) {
          selectedData = selectorData.filter((id) =>
            addOEditPerson.person.role.includes(id.code_id)
          );
        } else if (
          category == "address" &&
          (mcClass == null || mcClass == "customer" || mcClass == "person")
        ) {
          selectedData = selectorData.filter((id) =>
            addOEditAddress.address.address_type.includes(id.code_id)
          );
        }
      }
    }

    return (
      <>
        {selectedData.length > 0 ? (
          <ul className="flex flex-row truncate gap-2">
            {selectedData.map((data) => (
              <li className="input-n-selector__border p-1" key={data.code_id}>
                {data.value}
              </li>
            ))}
          </ul>
        ) : (
          <></>
        )}
      </>
    );
  };

  const handleCheckMultiSelector: (
    e: React.MouseEvent<HTMLInputElement>
  ) => void = (e) => {
    const checked = e.currentTarget.checked;
    const id = Number(e.currentTarget.id);

    if (selectorData) {
      const category = selectorData[0].category;
      const mcClass = selectorData[0].class;
      if (category == "role" && mcClass == null) {
        if (checked) {
          if (
            !memo.role_id.includes(id) &&
            !addOEditPerson.person.role.includes(id)
          ) {
            dispatch(setRole(id));
          } else if (addOEditPerson.person.roleDelete.includes(id)) {
            dispatch(removeRoleDelete(id));
          }
        } else if (!checked) {
          if (
            memo.role_id.includes(id) &&
            !addOEditPerson.person.roleDelete.includes(id)
          ) {
            dispatch(setRoleDelete(id));
          } else if (addOEditPerson.person.role.includes(id)) {
            dispatch(removeRole(id));
          }
        }
      } else if (
        category == "address" &&
        (mcClass == null || mcClass == "customer" || mcClass == "person")
      ) {
        if (checked) {
          if (
            !memo.address_type_id.includes(id) &&
            !addOEditAddress.address.address_type.includes(id)
          ) {
            dispatch(setAddressType(id));
          } else if (addOEditAddress.address.address_typeDelete.includes(id)) {
            dispatch(removeAddressTypeDelete(id));
          }
        } else if (!checked) {
          if (
            memo.address_type_id.includes(id) &&
            !addOEditAddress.address.address_type.includes(id)
          ) {
            dispatch(setAddressTypeDelete(id));
          } else if (addOEditAddress.address.address_type.includes(id)) {
            dispatch(removeAddressType(id));
          }
        }
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
            {defaultValue
              ? defaultValue
              : type == "selector"
              ? handleShowSelector()
              : type == "multi-selector"
              ? handleShowMultiSelector()
              : undefined}
          </span>

          {/* ปุ่มกากบาท */}
          {disabled ? (
            <></>
          ) : (
            <>
              {handleShowSelector() ? (
                <i className="fa-solid fa-x" onClick={handleClickSelector} />
              ) : (
                <i className="fa-solid fa-chevron-down" />
              )}
            </>
          )}
        </div>
        {/* selector dropdown */}
        <div
          className={`input-n-selector__border input-n-selector__shadow w-[240px] absolute top-20 z-20 bg-white ${
            toggleSearchSelector ? "" : "hidden"
          }`}
        >
          <div className="input-n-selector__border p-2 m-1 grid grid-cols-[auto_1fr] gap-3">
            <label htmlFor="">
              <i className="fa-solid fa-magnifying-glass" />
            </label>

            <input
              className="w-full"
              placeholder="ค้นหาชื่อฟลีต"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setSearchString(e.currentTarget.value);
              }}
            />
          </div>
          {/* selector */}
          <ul className="h-96 overflow-y-sc overflow-x-hidden">
            {type == "selector" ? (
              <>
                {selectorData ? (
                  selectorData.map((data) => (
                    <>
                      {data.value.match(searchString) ? (
                        <li
                          className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md ${
                            addOEditPerson.person.title_code_id ==
                              data.code_id ||
                            addOEditContact.contact.contact_code_id ==
                              data.code_id
                              ? "bg-[#007FA4]/30"
                              : ""
                          }`}
                          id={data.code_id.toString()}
                          onClick={handleClickSelector}
                          key={data.code_id}
                        >
                          {data.value}
                        </li>
                      ) : (
                        <></>
                      )}
                    </>
                  ))
                ) : fleetSelector ? (
                  <>
                    {fleetSelector.response.fleet.map((data) =>
                      data.fleet_name.match(searchString) ? (
                        <li
                          key={data.fleet_id}
                          className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md ${
                            addOEditFleet.fleet.fleet_id == data.fleet_id
                              ? "bg-[#007FA4]/30"
                              : ""
                          }`}
                          id={data.fleet_id.toString()}
                          onClick={handleClickSelector}
                        >
                          {data.fleet_name}
                        </li>
                      ) : (
                        <></>
                      )
                    )}
                  </>
                ) : provinceSelector ? (
                  <>
                    {provinceSelector.response.provinces.map((data) =>
                      data.province_th.match(searchString) ? (
                        <li
                          key={data.province_th}
                          className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md ${
                            addOEditAddress.address.province == data.province_th
                              ? "bg-[#007FA4]/30"
                              : ""
                          }`}
                          id={data.province_th}
                          onClick={handleClickSelector}
                        >
                          {data.province_th}
                        </li>
                      ) : (
                        <></>
                      )
                    )}
                  </>
                ) : districtSelector ? (
                  <>
                    {districtSelector.response.districts.map((data) =>
                      data.district_th.match(searchString) ? (
                        <li
                          key={data.district_th}
                          className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md ${
                            addOEditAddress.address.district == data.district_th
                              ? "bg-[#007FA4]/30"
                              : ""
                          }`}
                          id={data.district_th}
                          onClick={handleClickSelector}
                        >
                          {data.district_th}
                        </li>
                      ) : (
                        <></>
                      )
                    )}
                  </>
                ) : subDistrictSelector ? (
                  <>
                    {subDistrictSelector.response.sub_districts.map((data) =>
                      data.sub_district_th.match(searchString) ? (
                        <li
                          key={data.sub_district_th}
                          className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md ${
                            addOEditAddress.address.sub_district ==
                            data.sub_district_th
                              ? "bg-[#007FA4]/30"
                              : ""
                          }`}
                          id={data.sub_district_th}
                          onClick={handleClickSelector}
                        >
                          {data.sub_district_th}
                        </li>
                      ) : (
                        <></>
                      )
                    )}
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : type == "multi-selector" ? (
              <>
                {selectorData ? (
                  selectorData.map((data) =>
                    data.value.match(searchString) ? (
                      <li
                        className={`px-3 items-center h-[50px] hover:rounded-md`}
                        key={data.code_id}
                      >
                        <input
                          type="checkbox"
                          className="h-[20px] w-[20px] mx-3 sr-only"
                          id={data.code_id.toString()}
                          onClick={handleCheckMultiSelector}
                        />
                        <label
                          className={`px-1 h-full flex items-center hover:bg-[#007FA4]/30 ${
                            addOEditPerson.person.role.includes(data.code_id) ||
                            addOEditAddress.address.address_type.includes(
                              data.code_id
                            )
                              ? "bg-[#007FA4]/30 rounded-md"
                              : ""
                          }`}
                          htmlFor={data.code_id.toString()}
                        >
                          {data.value}
                        </label>
                      </li>
                    ) : (
                      <></>
                    )
                  )
                ) : (
                  <></>
                )}
              </>
            ) : (
              <></>
            )}
          </ul>
        </div>
      </div>
    </Fragment>
  );
}
