import React, { Fragment, useEffect, useRef, useState } from "react";
import Divider from "../Table/Divider";
import Input from "../Input/Input";
import Table from "../Table/Table";
import FormQuery from "../FormQuery";
import { useLocation, useSearchParams } from "react-router-dom";
import ButtonRightFrame from "../Button/ฺButtonRightFrame";
import Button from "../Button/Button";
import Thead from "../Table/Thead";
import Tbody from "../Table/Tbody";
import Th from "../Table/Th";
import Tr from "../Table/Tr";
import Td from "../Table/Td";
import PopUpLoading from "../Etc/PopUpLoading";
import { useDispatch, useSelector } from "react-redux";

import {
  AddExistPopUp,
  AddNewOAddExist,
  Memo,
} from "../../interface/reduxType";
import {
  popUpAddExistState,
  setPopUpAddExistDefault,
} from "../../features/popUpAddExistSlice";
import { Data } from "../../interface/dataType";
import { getPopUpData } from "../../api/getPopUpData";
import { memoState } from "../../features/memoSlice";
import {
  addNewOAddExistState,
  setAddressExist,
  setFleetExist,
  setPersonExist,
  setVehicleExist,
} from "../../features/addNewOAddExistSlice";
import {
  deleteState,
  removeAddressDelete,
  removeFleetDelete,
  removePersonDelete,
  removeVehicleDelete,
} from "../../features/deleteSlice";
import { Delete } from "../../interface/reduxType";
import {
  setDisplayAddressInteract,
  setDisplayFleetInteract,
  setDisplayPersonInteract,
  setDisplayVehicleInteract,
} from "../../features/displaySlice";

export default function AddExistPopup() {
  const [popUpData, setPopUpData] = useState<Data>();
  const [popUpLoading, setPopUpLoading] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");

  const tbody = useRef<HTMLTableSectionElement>(null);
  const filter = useRef<HTMLInputElement>(null);

  // Redux
  const dispatch = useDispatch();
  const popUpAddExist: AddExistPopUp = useSelector(popUpAddExistState);
  const memo: Memo = useSelector(memoState);
  const addNewOAddExist: AddNewOAddExist = useSelector(addNewOAddExistState);
  const deleted: Delete = useSelector(deleteState);

  useEffect(() => {
    if (search) {
      getPopUpData(setPopUpData, setPopUpLoading, popUpAddExist.type, search);
    } else {
      setPopUpData(undefined);
    }
  }, [search]);

  const handleAddExistSearch = () => {
    if (filter.current) setSearch(filter.current.value);
  };

  const handleSelected = () => {
    const trElems = tbody.current?.childNodes;
    if (trElems) {
      for (const trElem of trElems) {
        if (trElem instanceof HTMLTableRowElement) {
          const checkInput = trElem.childNodes[0]
            .childNodes[0] as HTMLInputElement;
          const tdElems = trElem.childNodes;
          if (checkInput.checked) {
            if (popUpAddExist.type == "person") {
              const personId = Number(trElem.id);
              const personName = tdElems[1].textContent;
              const role = tdElems[2].textContent;
              const mobile = tdElems[3].textContent;
              const email = tdElems[4].textContent;
              const description = tdElems[5].textContent;
              if (
                !memo.person_id.includes(personId) &&
                !addNewOAddExist.personExist.includes(personId)
              ) {
                dispatch(setPersonExist(personId));
              } else if (deleted.personDelete.includes(personId)) {
                dispatch(removePersonDelete(personId));
              }
              dispatch(
                setDisplayPersonInteract({
                  RowNum: null,
                  description: description ?? "",
                  email: email ?? "",
                  fullname: personName ?? "",
                  mobile: mobile ?? "",
                  person_id: personId,
                  role: role ?? "",
                })
              );
            } else if (popUpAddExist.type == "address") {
              const addressId = Number(trElem.id);
              const location = tdElems[1].textContent;
              const addressType = tdElems[2].textContent;
              if (
                !memo.address_id.includes(addressId) &&
                !addNewOAddExist.addressExist.includes(addressId)
              ) {
                dispatch(setAddressExist(addressId));
              } else if (deleted.addressDelete.includes(addressId)) {
                dispatch(removeAddressDelete(addressId));
              }
              dispatch(
                setDisplayAddressInteract({
                  RowNum: null,
                  address_id: addressId,
                  address_type: addressType ?? "",
                  location: location ?? "",
                })
              );
            } else if (popUpAddExist.type == "fleet") {
              const fleetId = Number(trElem.id);
              const fleetName = tdElems[1].textContent;
              const noOfVehicles = tdElems[2].textContent;
              if (
                !memo.fleet_id.includes(fleetId) &&
                !addNewOAddExist.fleetExist.includes(fleetId)
              ) {
                dispatch(setFleetExist(fleetId));
              } else if (deleted.fleetDelete.includes(fleetId)) {
                dispatch(removeFleetDelete(fleetId));
              }
              dispatch(
                setDisplayFleetInteract({
                  RowNum: null,
                  fleet_id: fleetId,
                  fleet_name: fleetName ?? "",
                  vehicle_count: Number(noOfVehicles),
                })
              );
            } else if (popUpAddExist.type == "vehicle") {
              const vehicleId = Number(trElem.id);
              const licensePlate = tdElems[1].textContent;
              const frameNo = tdElems[2].textContent;
              const vehicleType = tdElems[3].textContent;
              const vehicleModel = tdElems[4].textContent;
              if (
                !memo.vehicle_id.includes(vehicleId) &&
                !addNewOAddExist.vehicleExist.includes(vehicleId)
              ) {
                dispatch(setVehicleExist(vehicleId));
              } else if (deleted.vehicleDelete.includes(vehicleId)) {
                dispatch(removeVehicleDelete(vehicleId));
              }
              dispatch(
                setDisplayVehicleInteract({
                  RowNum: null,
                  frame_no: frameNo ?? "",
                  license_plate: licensePlate ?? "",
                  model_type: vehicleModel ?? "",
                  vehicle_id: vehicleId,
                  vehicle_type: vehicleType ?? "",
                })
              );
            }
          }
        }
      }
    }

    dispatch(setPopUpAddExistDefault());
    setSearch("");
  };

  return (
    <Fragment>
      {popUpAddExist.backdrop ? (
        <Fragment>
          {/* ฉากดำ */}
          <div
            className="absolute left-0 top-0 bg-black w-full h-full z-30 opacity-50 "
            onClick={() => {
              dispatch(setPopUpAddExistDefault());
              setSearch("");
            }}
          ></div>

          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-[1000px] h-[600px] z-40 rounded-md ">
            <div className="flex flex-col gap-5 py-5 px-5">
              {/* PopUp บุคคล */}

              <Fragment>
                <h1 className="font-bold">
                  {`เชื่อมโยงลูกค้า กับ ${
                    popUpAddExist.type == "person"
                      ? "บุคคล"
                      : popUpAddExist.type == "address"
                      ? "ที่อยู่"
                      : popUpAddExist.type == "fleet"
                      ? "กลุ่มยานยนต์"
                      : popUpAddExist.type == "vehicle"
                      ? "ยานพาหนะ"
                      : ""
                  }`}
                </h1>
                <Divider title="" />
                <div className=" flex flex-col gap-5 h-[425px] ">
                  {popUpAddExist.type == "person" ? (
                    <Input
                      name="personFilter"
                      type="filter"
                      label="ข้อมูลบุคคล"
                      refObject={filter}
                      onClick={handleAddExistSearch}
                    />
                  ) : popUpAddExist.type == "address" ? (
                    <Input
                      name="addressFilter"
                      type="filter"
                      label="ข้อมูลที่อยู่"
                      refObject={filter}
                      onClick={handleAddExistSearch}
                    />
                  ) : popUpAddExist.type == "customer" ? (
                    <Input
                      name="customerFilter"
                      type="filter"
                      label="ข้อมูลลูกค้า"
                      refObject={filter}
                      onClick={handleAddExistSearch}
                    />
                  ) : popUpAddExist.type == "vehicle" ? (
                    <Input
                      name="vehicleFilter"
                      type="filter"
                      label="ข้อมูลยานพาหนะ"
                      refObject={filter}
                      onClick={handleAddExistSearch}
                    />
                  ) : popUpAddExist.type == "fleet" ? (
                    <Input
                      name="fleetFilter"
                      type="filter"
                      label="ข้อมูลกลุ่มยานยนต์"
                      refObject={filter}
                      onClick={handleAddExistSearch}
                    />
                  ) : popUpAddExist.type == "device" ? (
                    <Input
                      name="deviceFilter"
                      type="filter"
                      label="อุปกรณ์หลัก"
                      refObject={filter}
                      onClick={handleAddExistSearch}
                    />
                  ) : popUpAddExist.type == "deviceSerial" ? (
                    <Input
                      name="deviceSerialFilter"
                      type="filter"
                      label="รหัสอุปกรณ์หลัก"
                      refObject={filter}
                      onClick={handleAddExistSearch}
                    />
                  ) : (
                    <Fragment></Fragment>
                  )}

                  {!popUpLoading ? (
                    <div className="overflow-auto border ">
                      <Table>
                        {popUpData ? (
                          <>
                            {"customer" in popUpData.response &&
                            popUpData.response.customer &&
                            popUpData.response.customer.length > 0 ? (
                              <Fragment>
                                <Thead>
                                  <Tr type="thead">
                                    <Th type="customer" noOption />
                                  </Tr>
                                </Thead>
                                <Tbody refObject={tbody}>
                                  {popUpData.response.customer.map((data) => (
                                    <Tr
                                      type="tbody"
                                      key={data.customer_id}
                                      id={data.customer_id.toString()}
                                    >
                                      <Td>
                                        <Input type="checkbox" />
                                      </Td>
                                      <Td>{data.customer_name}</Td>
                                      <Td>{data.telephone}</Td>
                                      <Td>{data.email}</Td>
                                    </Tr>
                                  ))}
                                </Tbody>
                              </Fragment>
                            ) : "person" in popUpData.response &&
                              popUpData.response.person &&
                              popUpData.response.person.length > 0 ? (
                              <Fragment>
                                <Thead>
                                  <Tr type="thead">
                                    <Th type="person" noOption />
                                  </Tr>
                                </Thead>
                                <Tbody refObject={tbody}>
                                  {popUpData.response.person.map((data) => (
                                    <Tr
                                      type="tbody"
                                      key={data.person_id}
                                      id={data.person_id.toString()}
                                    >
                                      <Td>
                                        <Input type="checkbox" />
                                      </Td>
                                      <Td>{data.fullname}</Td>
                                      <Td>{data.mobile}</Td>
                                      <Td>{data.email}</Td>
                                      <Td>{data.description}</Td>
                                      <Td>{data.role}</Td>
                                    </Tr>
                                  ))}
                                </Tbody>
                              </Fragment>
                            ) : "address" in popUpData.response &&
                              popUpData.response.address &&
                              popUpData.response.address.length > 0 ? (
                              <Fragment>
                                <Thead>
                                  <Tr type="thead">
                                    <Th type="address" noOption />
                                  </Tr>
                                </Thead>
                                <Tbody refObject={tbody}>
                                  {popUpData.response.address.map((data) => (
                                    <Tr
                                      type="tbody"
                                      id={data.address_id.toString()}
                                      key={data.address_id}
                                    >
                                      <Td>
                                        <Input type="checkbox" />
                                      </Td>
                                      <Td>{data.location}</Td>
                                      <Td>{data.address_type}</Td>
                                    </Tr>
                                  ))}
                                </Tbody>
                              </Fragment>
                            ) : "fleet" in popUpData.response &&
                              popUpData.response.fleet &&
                              popUpData.response.fleet.length > 0 ? (
                              <Fragment>
                                <Thead>
                                  <Tr type="thead">
                                    <Th type="fleet" noOption />
                                  </Tr>
                                </Thead>
                                <Tbody refObject={tbody}>
                                  {popUpData.response.fleet.map((data) => (
                                    <Tr
                                      type="tbody"
                                      id={data.fleet_id.toString()}
                                      key={data.fleet_id}
                                    >
                                      <Td>
                                        <Input type="checkbox" />
                                      </Td>
                                      <Td>{data.fleet_name}</Td>
                                      <Td>{data.vehicle_count}</Td>
                                    </Tr>
                                  ))}
                                </Tbody>
                              </Fragment>
                            ) : "vehicle" in popUpData.response &&
                              popUpData.response.vehicle &&
                              popUpData.response.vehicle.length > 0 ? (
                              <Fragment>
                                <Thead>
                                  <Tr type="thead" id="vehicle-thead-popup">
                                    <Th type="vehicle" noOption />
                                  </Tr>
                                </Thead>
                                <Tbody refObject={tbody}>
                                  {popUpData.response.vehicle.map((data) => (
                                    <Tr
                                      type="tbody"
                                      key={data.vehicle_id}
                                      id={data.vehicle_id.toString()}
                                    >
                                      <Td>
                                        <Input type="checkbox" />
                                      </Td>
                                      <Td>{data.license_plate}</Td>
                                      <Td>{data.frame_no}</Td>
                                      <Td>{data.vehicle_type}</Td>
                                      <Td>{data.model_type}</Td>
                                    </Tr>
                                  ))}
                                </Tbody>
                              </Fragment>
                            ) : (
                              <></>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                      </Table>
                    </div>
                  ) : (
                    <PopUpLoading></PopUpLoading>
                  )}
                </div>
              </Fragment>

              <ButtonRightFrame>
                <Button name="ยืนยัน" onClick={handleSelected} />
                <Button
                  name="ยกเลิก"
                  onClick={() => {
                    dispatch(setPopUpAddExistDefault());
                    setSearch("");
                  }}
                />
              </ButtonRightFrame>
            </div>
          </div>
        </Fragment>
      ) : (
        <Fragment></Fragment>
      )}
    </Fragment>
  );
}
