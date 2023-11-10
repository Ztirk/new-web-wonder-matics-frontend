import React, { Fragment, useState } from "react";
import Divider from "../Table/Divider";
import Input from "../Input/Input";
import Table from "../Table/Table";
import FormQuery from "../FormQuery";
import { useLocation } from "react-router-dom";
import ButtonRightFrame from "../Button/ฺButtonRightFrame";
import Button from "../Button/Button";
import Thead from "../Table/Thead";
import Tbody from "../Table/Tbody";
import Th from "../Table/Th";
import Tr from "../Table/Tr";
import Td from "../Table/Td";
import PopUpLoading from "../Etc/PopUpLoading";
import { useDispatch, useSelector } from "react-redux";

import { AddExistPopUp } from "../../interface/addExistPopUpType";
import { popUpAddExistState } from "../../features/popUpAddExistSlice";

interface Props {
  popUpData: AddExistPopUp;
  selectedRef: React.Ref<HTMLTableCellElement>;
  popUpLoading: boolean;
}

export default function AddExistPopup({ popUpData, popUpLoading }: Props) {
  // React-Router
  const location = useLocation();

  // Redux
  const dispatch = useDispatch();
  const popUpAddExist = useSelector(popUpAddExistState);

  const handleSelectedPerson = () => {};

  const handleSelectedAddress = () => {};

  return (
    <Fragment>
      {popUpAddExist.backdrop ? (
        <Fragment>
          {/* ฉากดำ */}
          <div
            className="absolute left-0 top-0 bg-black w-full h-full z-10 opacity-50 "
            onClick={() => dispatch(setPopUpAddExistDefault())}
          ></div>

          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-[1000px] h-[600px] z-20 rounded-md ">
            <div className="flex flex-col gap-5 py-5 px-5">
              {/* PopUp บุคคล */}

              <Fragment>
                <h1 className="font-bold">
                  {popUpAddExist.type == "person"
                    ? "เชื่อมโยงลูกค้า กับ บุคคล"
                    : popUpAddExist.type == "address"
                    ? "เชื่อมโยงลูกค้า กับ ที่อยู่"
                    : ""}
                </h1>
                <Divider title="" />
                <div className=" flex flex-col gap-5 h-[425px] ">
                  <FormQuery path={location.pathname}>
                    {popUpAddExist.type == "person" ? (
                      <Input
                        name="personFilter"
                        type="filter"
                        label="ข้อมูลบุคคล"
                      />
                    ) : popUpAddExist.type == "address" ? (
                      <Input
                        name="addressFilter"
                        type="filter"
                        label="ข้อมูลที่อยู่"
                      />
                    ) : popUpAddExist.type == "customer" ? (
                      <Input
                        name="customerFilter"
                        type="filter"
                        label="ข้อมูลลูกค้า"
                      />
                    ) : popUpAddExist.type == "vehicle" ? (
                      <Input
                        name="customerFilter"
                        type="filter"
                        label="ข้อมูลยานพาหนะ"
                      />
                    ) : popUpAddExist.type == "fleet" ? (
                      <Input
                        name="customerFilter"
                        type="filter"
                        label="ข้อมูลกลุ่มยานยนต์"
                      />
                    ) : popUpAddExist.type == "device" ? (
                      <Input
                        name="customerFilter"
                        type="filter"
                        label="อุปกรณ์หลัก"
                      />
                    ) : popUpAddExist.type == "deviceSerial" ? (
                      <Input
                        name="customerFilter"
                        type="filter"
                        label="รหัสอุปกรณ์หลัก"
                      />
                    ) : (
                      <Fragment></Fragment>
                    )}
                  </FormQuery>
                  {!popUpLoading ? (
                    <div className="overflow-auto border ">
                      <Table>
                        {/* ลูกค้า */}
                        {popUpData &&
                        popUpData.response.customer &&
                        popUpData.response.customer.length > 0 ? (
                          <Fragment>
                            <Thead>
                              <Tr type="thead" id="person-thead-popup">
                                <Th>No</Th>
                                {Object.keys(
                                  popUpData.response.customer[0]
                                ).map((columnName) => (
                                  <Th key={columnName}>{columnName}</Th>
                                ))}
                              </Tr>
                            </Thead>
                            <Tbody>
                              {popUpData.response.customer.map((data) => (
                                <Tr
                                  type="tbody"
                                  id="selected-person-id"
                                  key={data.customer_id}
                                  dataId={data.customer_id}
                                >
                                  <Td>
                                    <Input type="checkbox" />
                                  </Td>
                                  <Td>{data.RowNum}</Td>
                                  <Td>{data.customer_id}</Td>
                                  <Td>{data.customer_name}</Td>
                                  <Td>{data.telephone}</Td>
                                  <Td>{data.email}</Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Fragment>
                        ) : (
                          <></>
                        )}
                        {/* คน */}
                        {popUpData &&
                        popUpData.response.person &&
                        popUpData.response.person.length > 0 ? (
                          <Fragment>
                            <Thead>
                              <Tr type="thead" id="person-thead-popup">
                                <Th>No</Th>
                                {Object.keys(popUpData.response.person[0]).map(
                                  (columnName) => (
                                    <Th key={columnName}>{columnName}</Th>
                                  )
                                )}
                              </Tr>
                            </Thead>
                            <Tbody>
                              {popUpData.response.person.map((data) => (
                                <Tr
                                  type="tbody"
                                  id="selected-person-id"
                                  key={data.person_id}
                                  dataId={data.person_id}
                                >
                                  <Td>
                                    <Input type="checkbox" />
                                  </Td>
                                  <Td>{data.RowNum}</Td>
                                  <Td>{data.person_id}</Td>
                                  <Td>{data.fullname}</Td>
                                  <Td>{data.mobile}</Td>
                                  <Td>{data.email}</Td>
                                  <Td>{data.description}</Td>
                                  <Td>{data.role}</Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Fragment>
                        ) : (
                          <></>
                        )}
                        {/* ที่อยู่ */}
                        {popUpData &&
                        popUpData.response.address &&
                        popUpData.response.address.length > 0 ? (
                          <Fragment>
                            <Thead>
                              <Tr type="thead" id="address-thead-popup">
                                <Th>No</Th>
                                {Object.keys(popUpData.response.address[0]).map(
                                  (columnName) => (
                                    <Th key={columnName}>{columnName}</Th>
                                  )
                                )}
                              </Tr>
                            </Thead>
                            <Tbody>
                              {popUpData.response.address.map((data) => (
                                <Tr
                                  type="tbody"
                                  id="selected-address-id"
                                  key={data.address_id}
                                  dataId={data.address_id}
                                >
                                  <Td>
                                    <Input type="checkbox" />
                                  </Td>
                                  <Td>{data.RowNum}</Td>
                                  <Td>{data.address_id}</Td>
                                  <Td>{data.address_type}</Td>
                                  <Td>{data.location}</Td>
                                </Tr>
                              ))}
                            </Tbody>
                          </Fragment>
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
                <Button
                  name="ยืนยัน"
                  onClick={
                    popUpAddExist.type == "person"
                      ? handleSelectedPerson
                      : popUpAddExist.type == "address"
                      ? handleSelectedAddress
                      : ""
                  }
                />
                <Button
                  name="ยกเลิก"
                  onClick={() => {
                    dispatch(setPopUpAddExistDefault());
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
