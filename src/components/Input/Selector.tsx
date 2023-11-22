import React, { Fragment, useEffect, useRef, useState } from "react";
import { MasterCode, Selector } from "../../interface/mastercodeType";
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
  setOwnerTypeCodeId,
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
  setBrandName,
  setDrivingLicenseTypeCodeId,
  setModelName,
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
import {
  BrandSelector,
  ModelSelector,
  SendVehicle,
} from "../../interface/vehicleType";
import { Memo } from "../../interface/reduxType";
import { memoState } from "../../features/memoSlice";
import { useLocation } from "react-router-dom";
import { SendCard } from "../../interface/cardType";
import {
  addOEditCardState,
  setCardCodeId,
} from "../../features/addOEdit/addOEditCardSlice";
import { SendDocument } from "../../interface/documentType";
import {
  addOEditDocumentState,
  setDocumentCodeId,
} from "../../features/addOEdit/addOEditDocumentSlice";

interface Props {
  selectorData?: MasterCode["response"][0];
  fleetSelector?: Fleet;
  provinceSelector?: ProvinceSelector;
  districtSelector?: DistrictSelector;
  subDistrictSelector?: SubDistrictSelector;
  brandSelector?: BrandSelector;
  modelSelector?: ModelSelector;
  label: string;
  disabled: boolean;
  type: "selector" | "multi-selector" | "search-selector";
  defaultValue?: string;
  required: boolean;
}

export default function Selector({
  selectorData,
  label,
  disabled,
  type,
  fleetSelector,
  provinceSelector,
  districtSelector,
  subDistrictSelector,
  defaultValue,
  brandSelector,
  modelSelector,
  required,
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
  const addOEditCard: SendCard = useSelector(addOEditCardState);
  const addOEditDocument: SendDocument = useSelector(addOEditDocumentState);
  const memo: Memo = useSelector(memoState);

  const handleToggleSearchSelector = () => {
    setToggleSearchSelector(!toggleSearchSelector);
  };

  const handleShowSelector: () => string | undefined = () => {
    if (selectorData) {
      let selectedData: MasterCode["response"][0][0] | undefined;
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
      } else if (category == "card" && mcClass == null) {
        selectedData = selectorData.find(
          (data) => data.code_id == addOEditCard.card.card_code_id
        );
      } else if (
        category == "document" &&
        (mcClass == "customer" || mcClass == "person")
      ) {
        selectedData = selectorData.find(
          (data) => data.code_id == addOEditDocument.document.document_code_id
        );
      } else if (category == "personOcustomer" && mcClass == null) {
        selectedData = selectorData.find(
          (data) => data.code_id == addOEditContact.contact.owner_type_code_id
        );
      }
      return selectedData ? selectedData.value : "ยังไม่ระบุ";
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
    } else if (brandSelector) {
      const selectedData: BrandSelector["response"]["brands"][0] | undefined =
        brandSelector.response.brands.find(
          (data) => data.brand == addOEditVehicle.vehicle.brand_name
        );

      return selectedData ? selectedData.brand : undefined;
    } else if (modelSelector) {
      const selectedData: ModelSelector["response"]["models"][0] | undefined =
        modelSelector.response.models.find(
          (data) => data.model == addOEditVehicle.vehicle.model_name
        );

      return selectedData ? selectedData.model : undefined;
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
      } else if (category == "card" && mcClass == null) {
        dispatch(setCardCodeId(code_id));
      } else if (
        category == "document" &&
        (mcClass == "customer" || mcClass == "person")
      ) {
        dispatch(setDocumentCodeId(code_id));
      } else if (category == "personOcustomer" && mcClass == null) {
        dispatch(setOwnerTypeCodeId(code_id));
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
    } else if (brandSelector) {
      const brand = e.currentTarget.id;
      dispatch(setBrandName(brand));
    } else if (modelSelector) {
      const model = e.currentTarget.id;
      dispatch(setModelName(model));
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
        } else if (category == "address" && mcClass == null) {
          selectedData = selectorData.filter((id) =>
            addOEditAddress.address.address_type_code_id.includes(id.code_id)
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
            !memo.role_code_id.includes(id) &&
            !addOEditPerson.person.role.includes(id)
          ) {
            dispatch(setRole(id));
          } else if (addOEditPerson.person.roleDelete.includes(id)) {
            dispatch(removeRoleDelete(id));
          }
        } else if (!checked) {
          if (
            memo.role_code_id.includes(id) &&
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
            !memo.address_type_code_id.includes(id) &&
            !addOEditAddress.address.address_type_code_id.includes(id)
          ) {
            dispatch(setAddressType(id));
          } else if (
            addOEditAddress.address.address_type_code_idDelete.includes(id)
          ) {
            dispatch(removeAddressTypeDelete(id));
          }
        } else if (!checked) {
          if (
            memo.address_type_code_id.includes(id) &&
            !addOEditAddress.address.address_type_code_id.includes(id)
          ) {
            dispatch(setAddressTypeDelete(id));
          } else if (
            addOEditAddress.address.address_type_code_id.includes(id)
          ) {
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
          className={`${
            required
              ? "border border-[#DC3545] rounded-md"
              : "input-n-selector__border"
          } input-n-selector__size flex items-center ${
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
          className={`input-n-selector__shadow input-n-selector__border w-[240px] absolute top-20 z-20 bg-white ${
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
          <ul className="max-h-96 overflow-y-sc overflow-x-hidden">
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
                          className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md ${
                            addOEditFleet.fleet.fleet_id == data.fleet_id
                              ? "bg-[#007FA4]/30"
                              : ""
                          }`}
                          id={data.fleet_id.toString()}
                          onClick={handleClickSelector}
                          key={data.fleet_id}
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
                          className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md ${
                            addOEditAddress.address.province == data.province_th
                              ? "bg-[#007FA4]/30"
                              : ""
                          }`}
                          id={data.province_th}
                          onClick={handleClickSelector}
                          key={data.province_th}
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
                          className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md ${
                            addOEditAddress.address.district == data.district_th
                              ? "bg-[#007FA4]/30"
                              : ""
                          }`}
                          id={data.district_th}
                          onClick={handleClickSelector}
                          key={data.district_th}
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
                          className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md ${
                            addOEditAddress.address.sub_district ==
                            data.sub_district_th
                              ? "bg-[#007FA4]/30"
                              : ""
                          }`}
                          id={data.sub_district_th}
                          onClick={handleClickSelector}
                          key={data.sub_district_th}
                        >
                          {data.sub_district_th}
                        </li>
                      ) : (
                        <></>
                      )
                    )}
                  </>
                ) : brandSelector ? (
                  <>
                    {brandSelector.response.brands.map((data) =>
                      data.brand.match(searchString) ? (
                        <li
                          className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md ${
                            addOEditVehicle.vehicle.brand_name == data.brand
                              ? "bg-[#007FA4]/30"
                              : ""
                          }`}
                          id={data.brand}
                          onClick={handleClickSelector}
                          key={data.brand}
                        >
                          {data.brand}
                        </li>
                      ) : (
                        <></>
                      )
                    )}
                  </>
                ) : modelSelector ? (
                  <>
                    {modelSelector.response.models.map((data) =>
                      data.model.match(searchString) ? (
                        <li
                          className={`px-3 grid grid-cols-[auto_1fr] items-center hover:bg-[#007FA4]/30 h-[50px] hover:rounded-md ${
                            addOEditVehicle.vehicle.model_name == data.model
                              ? "bg-[#007FA4]/30"
                              : ""
                          }`}
                          id={data.model}
                          onClick={handleClickSelector}
                          key={data.model}
                        >
                          {data.model}
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
                            addOEditAddress.address.address_type_code_id.includes(
                              data.code_id
                            )
                              ? "bg-[#007FA4]/30 rounded-md"
                              : ""
                          }`}
                          htmlFor={data.code_id.toString()}
                          key={data.code_id}
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
