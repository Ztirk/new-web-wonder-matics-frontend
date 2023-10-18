import { Fragment, useEffect, useState } from "react";
import { fetchIndividualData } from "../api/getIndividualData";
import { IndividualData } from "../interface/dataType";
import { Link, useLocation, useParams } from "react-router-dom";
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
          <Divider title="ข้อมูลลูกค้า" />
          <InputFrame>
            {individualData ? (
              <Fragment>
                <Input
                  type="disable"
                  placeholder={individualData?.response.customer.customer_name}
                  label="ชื่อลูกค้า"
                  defaultValue={individualData?.response.customer.customer_name}
                />
                <Input
                  type="disable"
                  placeholder={individualData?.response.customer.customer_type}
                  label="ลักษณะลูกค้า"
                  defaultValue={individualData?.response.customer.customer_type}
                />
                <Input
                  type="disable"
                  placeholder={individualData?.response.customer.sales_type}
                  defaultValue={individualData?.response.customer.sales_type}
                  label="ประเภทลูกค้า"
                />
              </Fragment>
            ) : (
              <></>
            )}
          </InputFrame>

          {/* คน */}
          <Divider title="ข้อมูลคน" />
          <Table>
            {individualData && individualData.response.person.length > 0 ? (
              <Fragment>
                <Thead>
                  <Tr type="thead">
                    {Object.keys(individualData?.response.person[0]).map(
                      (columnName) => (
                        <Th key={columnName}>{columnName}</Th>
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
              </Fragment>
            ) : (
              <></>
            )}
          </Table>

          {/* ติดต่อ */}
          <Divider title="ข้อมูลผู้ติดต่อ" />
          <Table>
            {individualData && individualData.response.contact.length > 0 ? (
              <Fragment>
                <Thead>
                  <Tr type="thead">
                    {Object.keys(individualData?.response.contact[0]).map(
                      (columnName) => (
                        <Th key={columnName}>{columnName}</Th>
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
              </Fragment>
            ) : (
              <></>
            )}
          </Table>

          {/* ที่อยู่ */}
          <Divider title="ข้อมูลที่อยู่" />
          <Table>
            {individualData && individualData.response.address.length > 0 ? (
              <Fragment>
                <Thead>
                  <Tr type="thead">
                    {Object.keys(individualData?.response.address[0]).map(
                      (columnName) => (
                        <Fragment>
                          <Th key={columnName}>{columnName}</Th>
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
              </Fragment>
            ) : (
              <></>
            )}
          </Table>

          {/* รถ */}
          <Divider title="ข้อมูลรถ" />
          <Table>
            {individualData && individualData.response.vehicle.length > 0 ? (
              <Fragment>
                <Thead>
                  <Tr type="thead">
                    {Object.keys(individualData?.response.vehicle[0]).map(
                      (columnName) => (
                        <Fragment>
                          <Th key={columnName}>{columnName}</Th>
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
              </Fragment>
            ) : (
              <></>
            )}
          </Table>
          <ButtonRightFrame>
            <Link to="/customer">
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
