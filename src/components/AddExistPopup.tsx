import React, { Fragment } from "react";
import { PopUpComponent } from "../interface/componentType";
import Divider from "./Divider";
import Input from "./Input";
import Table from "./Table";
import { IndividualData } from "../interface/customerType";
import FormQuery from "./FormQuery";
import { useLocation } from "react-router-dom";
import ButtonRightFrame from "./ฺButtonRightFrame";
import Button from "./Button";
import Thead from "./Thead";
import Tbody from "./Tbody";
import Th from "./Th";
import Tr from "./Tr";
import Td from "./Td";

interface Props {
  toggleAddExist: PopUpComponent;
  dataIndividual: IndividualData;
  popUpData: IndividualData;
  onCancel: () => void;
  onConfirm: () => void;
  selectedRef: React.Ref<HTMLTableCellElement>;
}

export default function AddExistPopup({
  toggleAddExist,
  popUpData,
  onCancel,
  onConfirm,
}: Props) {
  const location = useLocation();

  return (
    <Fragment>
      {toggleAddExist.backdrop ? (
        <Fragment>
          {/* ฉากดำ */}
          <div
            className="absolute left-0 top-0 bg-black w-full h-full z-10 opacity-50 "
            onClick={onCancel}
          ></div>
          <div className="absolute left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white w-[1000px] h-[600px] z-20 rounded-md ">
            <div className="flex flex-col gap-5 py-5 px-5">
              {/* PopUp บุคคล */}

              <Fragment>
                <h1 className="font-bold">
                  {toggleAddExist.type == "person"
                    ? "เชื่อมโยงลูกค้า กับ บุคคล"
                    : toggleAddExist.type == "address"
                    ? "เชื่อมโยงลูกค้า กับ ที่อยู่"
                    : ""}
                </h1>
                <Divider title="" />
                <div className=" flex flex-col gap-5 h-[425px] ">
                  <FormQuery path={location.pathname}>
                    {toggleAddExist.type == "person" ? (
                      <Input
                        name="personFilter"
                        type="filter"
                        label="ข้อมูลบุคคล"
                      />
                    ) : toggleAddExist.type == "address" ? (
                      <Input
                        name="addressFilter"
                        type="filter"
                        label="ข้อมูลที่อยู่"
                      />
                    ) : (
                      <Fragment></Fragment>
                    )}
                  </FormQuery>
                  <div className="overflow-auto border ">
                    <Table>
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
                              >
                                <Td>
                                  <Input type="checkbox" />
                                </Td>
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
                              >
                                <Td>
                                  <Input type="checkbox" />
                                </Td>
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
                </div>
              </Fragment>

              <ButtonRightFrame>
                <Button name="ยืนยัน" onClick={onConfirm} />
                <Button name="ยกเลิก" onClick={onCancel} />
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
