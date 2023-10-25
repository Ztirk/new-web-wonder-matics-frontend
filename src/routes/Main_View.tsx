import { Fragment, useEffect, useState } from "react";
import { fetchIndividualData } from "../api/getIndividualData";
import { IndividualData } from "../interface/customerType";
import { Link, useLocation } from "react-router-dom";
import Divider from "../components/Divider";
import Button from "../components/Button";
import Input from "../components/Input";
import InputFrame from "../components/InputFrame";
import Table from "../components/Table";
import ButtonRightFrame from "../components/ฺButtonRightFrame";
import Thead from "../components/Thead";
import Tbody from "../components/Tbody";
import Th from "../components/Th";
import Tr from "../components/Tr";
import Td from "../components/Td";
import Loading from "../components/Loading";

export default function Main_View() {
  // เก็บข้อมูลย่อยของข้อมูลหลัก
  const [individualData, setIndividualData] = useState<IndividualData>();

  // โหลดตาราง
  const [loading, setLoading] = useState<boolean>(false);

  // url
  const location = useLocation();
  const segment = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  const id = segment[1];
  const module = segment[0];

  // get ข้อมูลย่อย
  useEffect(() => {
    fetchIndividualData(id, setIndividualData, module, setLoading);
  }, []);

  return (
    <Fragment>
      {!loading ? (
        <Fragment>
          {individualData ? (
            !Array.isArray(individualData.response.customer) &&
            individualData.response.customer.customer_id ? (
              <Fragment>
                {/* ลูกค้า */}
                <Divider title="ข้อมูลลูกค้า" />
                <InputFrame>
                  <Input
                    type="disable"
                    placeholder={
                      individualData?.response.customer.customer_name
                    }
                    label="ชื่อลูกค้า"
                    defaultValue={
                      individualData?.response.customer.customer_name
                    }
                  />
                  <Input
                    type="disable"
                    placeholder={
                      individualData?.response.customer.customer_type
                    }
                    label="ลักษณะลูกค้า"
                    defaultValue={
                      individualData?.response.customer.customer_type
                    }
                  />
                  <Input
                    type="disable"
                    placeholder={individualData?.response.customer.sales_type}
                    defaultValue={individualData?.response.customer.sales_type}
                    label="ประเภทลูกค้า"
                  />
                </InputFrame>
              </Fragment>
            ) : !Array.isArray(individualData.response.person) &&
              individualData.response.person.person_id ? (
              <Fragment>
                {/* คน */}
                <Divider title="ข้อมูลบุคคล" />
                <InputFrame>
                  <Input
                    type="disable"
                    placeholder={individualData?.response.person.firstname}
                    label="ชื่อ"
                    defaultValue={individualData?.response.person.firstname}
                  />
                  <Input
                    type="disable"
                    placeholder={individualData?.response.person.lastname}
                    label="นามสกุล"
                    defaultValue={individualData?.response.person.lastname}
                  />
                  <Input
                    type="disable"
                    placeholder={individualData?.response.person.title_type}
                    label="คำนำหน้า"
                    defaultValue={individualData?.response.person.title_type}
                  />
                  <Input
                    type="disable"
                    placeholder={individualData?.response.person.nickname}
                    label="ชื่อเล่น"
                    defaultValue={individualData?.response.person.nickname}
                  />
                  <Input
                    type="disable"
                    placeholder={
                      individualData?.response.person.role[0].role_type
                    }
                    label="ตำแหน่ง"
                    defaultValue={
                      individualData?.response.person.role[0].role_type
                    }
                  />
                  <Input
                    type="disable"
                    placeholder={individualData?.response.person.description}
                    label="รายละเอียด"
                    defaultValue={individualData?.response.person.description}
                  />
                </InputFrame>
              </Fragment>
            ) : (
              <></>
            )
          ) : (
            <></>
          )}
          {/* ลูกค้า */}
          {individualData &&
          individualData.response.customer &&
          Array.isArray(individualData.response.customer) ? (
            <Fragment>
              <Divider title="ข้อมูลลูกค้า" />
              {individualData.response.customer.length > 0 ? (
                <Table>
                  <Thead>
                    <Tr type="thead">
                      {Object.keys(individualData?.response.customer[0]).map(
                        (columnName, i) => (
                          <Th key={i}>{columnName}</Th>
                        )
                      )}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {individualData.response.customer.map((data) => (
                      <Tr type="tbody" key={data.customer_id}>
                        <Td>{data.RowNum}</Td>
                        <Td>{data.customer_id}</Td>
                        <Td>{data.customer_name}</Td>
                        <Td>{data.telephone}</Td>
                        <Td>{data.email}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <></>
              )}
            </Fragment>
          ) : (
            <></>
          )}
          {/* คน */}
          {individualData &&
          individualData.response.person &&
          Array.isArray(individualData.response.person) ? (
            <Fragment>
              <Divider title="ข้อมูลบุคคล" />
              {individualData.response.person.length > 0 ? (
                <Table>
                  <Thead>
                    <Tr type="thead">
                      {Object.keys(individualData?.response.person[0]).map(
                        (columnName, i) => (
                          <Th key={i}>{columnName}</Th>
                        )
                      )}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {individualData.response.person.map((data) => (
                      <Tr type="tbody" key={data.person_id}>
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
                </Table>
              ) : (
                <></>
              )}
            </Fragment>
          ) : (
            <></>
          )}

          {/* ติดต่อ */}
          {individualData &&
          individualData.response.contact &&
          Array.isArray(individualData.response.contact) ? (
            <Fragment>
              <Divider title="ข้อมูลผู้ติดต่อ" />
              {individualData.response.contact.length > 0 ? (
                <Table>
                  <Thead>
                    <Tr type="thead">
                      {Object.keys(individualData?.response.contact[0]).map(
                        (columnName, i) => (
                          <Th key={i}>{columnName}</Th>
                        )
                      )}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {individualData.response.contact.map((data) => (
                      <Tr type="tbody" key={data.contact_id}>
                        <Td>{data.RowNum}</Td>
                        <Td>{data.contact_id}</Td>
                        <Td>{data.value}</Td>
                        <Td>{data.contact_type}</Td>
                        <Td>{data.owner_name}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <></>
              )}
            </Fragment>
          ) : (
            <></>
          )}

          {/* ที่อยู่ */}

          {individualData &&
          individualData.response.address &&
          Array.isArray(individualData.response.address) ? (
            <Fragment>
              <Divider title="ข้อมูลที่อยู่" />
              {individualData.response.address.length > 0 ? (
                <Table>
                  <Thead>
                    <Tr type="thead">
                      {Object.keys(individualData?.response.address[0]).map(
                        (columnName, i) => (
                          <Fragment>
                            <Th key={i}>{columnName}</Th>
                          </Fragment>
                        )
                      )}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {individualData.response.address.map((data) => (
                      <Tr type="tbody" key={data.address_id}>
                        <Td>{data.RowNum}</Td>
                        <Td>{data.address_id}</Td>
                        <Td>{data.address_type}</Td>
                        <Td>{data.location}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <></>
              )}
            </Fragment>
          ) : (
            <></>
          )}
          {/* รถ */}

          {individualData &&
          individualData.response.vehicle &&
          Array.isArray(individualData.response.vehicle) ? (
            <Fragment>
              <Divider title="ข้อมูลรถ" />
              {individualData.response.vehicle.length > 0 ? (
                <Table>
                  <Thead>
                    <Tr type="thead">
                      {Object.keys(individualData?.response.vehicle[0]).map(
                        (columnName, i) => (
                          <Fragment>
                            <Th key={i}>{columnName}</Th>
                          </Fragment>
                        )
                      )}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {individualData.response.vehicle.map((data) => (
                      <Tr type="tbody" key={data.vehicle_id}>
                        <Td>{data.RowNum}</Td>
                        <Td>{data.vehicle_id}</Td>
                        <Td>{data.license_plate}</Td>
                        <Td>{data.frame_no}</Td>
                        <Td>{data.vehicle_type}</Td>
                        <Td>{data.model}</Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>
              ) : (
                <></>
              )}
            </Fragment>
          ) : (
            <></>
          )}

          <ButtonRightFrame>
            <Link to=".." relative="path">
              <Button name="ย้อนกลับ" />
            </Link>
          </ButtonRightFrame>
        </Fragment>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
}
