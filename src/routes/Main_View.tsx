import { Fragment, useEffect, useState } from "react";
import { fetchIndividualData } from "../api/customerApi";
import { IndividualData } from "../interface/customerType";
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

export default function Main_View() {
  const [individualData, setIndividualData] = useState<IndividualData>();

  const location = useLocation();
  const segment = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  const id = segment[1];
  const module = segment[0];

  useEffect(() => {
    fetchIndividualData(id, setIndividualData, module);
  }, []);

  return (
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
                  <Td>{data.contact_id}</Td>
                  <Td>{data.contact_type}</Td>
                  <Td>{data.value}</Td>
                </Tr>
              ))}
            </Tbody>
          </Fragment>
        ) : (
          <></>
        )}
      </Table>

      <Divider title="ข้อมูลที่อยู่" />
      <Table>
        {individualData && individualData.response.address.length > 0 ? (
          <Fragment>
            <Thead>
              <Tr type="thead">
                {Object.keys(individualData?.response.address[0]).map(
                  (columnName) => (
                    <Th key={columnName}>{columnName}</Th>
                  )
                )}
              </Tr>
            </Thead>
            <Tbody>
              {individualData.response.address.map((data) => (
                <Tr type="tbody" key={data.address_id}>
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
      <ButtonRightFrame>
        <Link to="/customer">
          <Button name="ย้อนกลับ" />
        </Link>
      </ButtonRightFrame>
    </Fragment>
  );
}
