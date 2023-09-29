import React, { useEffect, useState, Fragment } from "react";
import Table from "../components/Table";
import Input from "../components/Input";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import {
  Link,
  createSearchParams,
  useLocation,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { Customer } from "../interface/customerType";
import { ToggleDelete } from "../interface/componentType";
import {
  fetchData,
  fetchDataByPageNFilter,
  deleteCustomer,
} from "../api/customerApi";
import FormQuery from "../components/FormQuery";
import Tr from "../components/Tr";
import Td from "../components/Td";
import Option from "../components/Option";
import Th from "../components/Th";
import Thead from "../components/Thead";
import Tbody from "../components/Tbody";
import DeletePopUp from "../components/DeletePopUp";
import InputNAddNewFrame from "../components/Input&AddNewFrame";
import { Contact } from "../interface/contactType";
import { Address } from "../interface/AddressType";
import { Fleet } from "../interface/FleetType";
import { Person } from "../interface/personType";
import axios from "axios";
import { postVerify } from "../api/authApi";

export default function Main() {
  const [data, setData] = useState<
    Customer & Person & Contact & Address & Fleet
  >();

  const defaultToggleDelete = {
    active: false,
    title: "",
    name: "",
    id: "",
  };

  const [toggleDelete, setToggleDelete] =
    useState<ToggleDelete>(defaultToggleDelete);

  const location = useLocation();

  const segment = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const module = segment[0];

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    if (location.search) {
      fetchData(setData, module);
    } else if (!location.search) {
      fetchData(setData, module);
    }
  }, [location, searchParams]);

  const handleToggleDeleteShowUp: (
    e: React.MouseEvent<HTMLLIElement>
  ) => void = (e) => {
    const title = e.currentTarget.title;
    const customerName = e.currentTarget.getAttribute("customerName");
    const id = e.currentTarget.id;

    setToggleDelete({ active: true, title: title, name: customerName, id: id });
  };

  const handleDeleteConfirm: () => void = () => {
    deleteCustomer(toggleDelete.id);
    handleDeleteCancel();
  };

  const handleDeleteCancel = () => {
    setToggleDelete(defaultToggleDelete);
  };

  const onClickPage: (e: React.MouseEvent<HTMLLIElement>) => void = (e) => {
    const page = e.currentTarget.id;
    let filter = searchParams.get("filter");
    if (!filter) filter = "";
    setSearchParams({ page: page, filter: filter });
  };

  const increPage: (e: React.MouseEvent<HTMLDivElement>) => void = (e) => {
    let page = searchParams.get("page");
    let filter = searchParams.get("filter");
    if (!page) {
      if (!filter) filter = "";

      page = "2";
      setSearchParams({ page: page, filter: filter });
    } else if (
      Number(page) > 0 &&
      Number(page) < Math.ceil(data?.response.count_data / 10)
    ) {
      page = (Number(page) + 1).toString();
      setSearchParams({ page: page, filter: filter });
    }
  };

  const decrePage: (e: React.MouseEvent<HTMLDivElement>) => void = (e) => {
    let page = searchParams.get("page");
    let filter = searchParams.get("filter");
    if (!page) page = "";
    if (!filter) filter = "";

    if (
      Number(page) > 1 &&
      Number(page) <= Math.ceil(data?.response.count_data / 10)
    ) {
      page = (Number(page) - 1).toString();
    }
    setSearchParams({ page: page, filter: filter });
  };

  return (
    <>
      <DeletePopUp
        handleCancel={handleDeleteCancel}
        handleConfirm={handleDeleteConfirm}
        toggleDelete={toggleDelete}
      />
      <FormQuery path={location.pathname}>
        <Input
          label="ชื่อลูกค้า"
          type="filter"
          placeholder="ชื่อลูกค้า"
          name="filter"
        />
        <InputNAddNewFrame>
          <Link to="/customer/add-new-customer">
            <Button name="เพิ่มใหม่" />
          </Link>
        </InputNAddNewFrame>
        <Table>
          {data ? (
            <Fragment>
              <Thead>
                <Tr type="thead">
                  {data.response.customer ? (
                    Object.keys(data?.response.customer[0]).map(
                      (columnName) => <Th key={columnName}>{columnName}</Th>
                    )
                  ) : data.response.person ? (
                    Object.keys(data?.response.person[0]).map((columnName) => (
                      <Th key={columnName}>{columnName}</Th>
                    ))
                  ) : data.response.contact ? (
                    Object.keys(data.response.contact[0]).map((columnName) => (
                      <Th key={columnName}>{columnName}</Th>
                    ))
                  ) : data.response.address ? (
                    Object.keys(data.response.address[0]).map((columnName) => (
                      <Th key={columnName}>{columnName}</Th>
                    ))
                  ) : data.response.fleet ? (
                    Object.keys(data.response.fleet[0]).map((columnName) => (
                      <Th key={columnName}>{columnName}</Th>
                    ))
                  ) : (
                    <></>
                  )}
                  <Th>ตัวเลือก</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.response.customer ? (
                  data.response.customer.map((data) => (
                    <Tr type="tbody" key={data.customer_id}>
                      {/* ข้อมูลลูกค้า */}
                      <Td>{data.customer_id}</Td>
                      <Td>{data.customer_name}</Td>
                      <Td>{data.telephone}</Td>
                      <Td>{data.email}</Td>
                      <Option
                        type="full"
                        onEdit={`/customer/${data.customer_id}/edit`}
                        onView={`/customer/${data.customer_id}`}
                        id={data.customer_id}
                        title="ลูกค้า"
                        customerName={data.customer_name}
                        onDelete={handleToggleDeleteShowUp}
                      ></Option>
                    </Tr>
                  ))
                ) : data.response.person ? (
                  data.response.person.map((data) => (
                    <Tr type="tbody" key={data.person_id}>
                      {/* ข้อมูลคน */}
                      <Td>{data.person_id}</Td>
                      <Td>{data.fullname}</Td>
                      <Td>{data.mobile}</Td>
                      <Td>{data.email}</Td>
                      <Td>{data.description}</Td>
                      <Td>{data.role}</Td>
                      <Option
                        type="full"
                        onEdit={`/person/${data.person_id}/edit`}
                        onView={`/person/${data.person_id}`}
                        id={data.person_id}
                        title="ลูกค้า"
                        customerName={data.fullname}
                        onDelete={handleToggleDeleteShowUp}
                      ></Option>
                    </Tr>
                  ))
                ) : data.response.contact ? (
                  data.response.contact.map((data) => (
                    <Tr type="tbody" key={data.contact_id}>
                      {/* ข้อมูลติดต่อ */}
                      <Td>{data.contact_id}</Td>
                      <Td>{data.value}</Td>
                      <Td>{data.contact_type}</Td>
                      <Td>{data.owner_name}</Td>
                      <Option
                        type="full"
                        onEdit={`/contact/${data.contact_id}/edit`}
                        onView={`/contact/${data.contact_id}`}
                        id={data.contact_id}
                        title="ลูกค้า"
                        customerName={data.value}
                        onDelete={handleToggleDeleteShowUp}
                      ></Option>
                    </Tr>
                  ))
                ) : data.response.address ? (
                  data.response.address.map((data) => (
                    <Tr type="tbody" key={data.address_id}>
                      {/* ข้อมูลที่อยู๋ */}
                      <Td>{data.address_id}</Td>
                      <Td>{data.location}</Td>
                      <Td>{data.address_type}</Td>
                      <Option
                        type="full"
                        onEdit={`/address/${data.address_id}/edit`}
                        onView={`/address/${data.address_id}`}
                        id={data.address_id}
                        title="ลูกค้า"
                        customerName={data.location}
                        onDelete={handleToggleDeleteShowUp}
                      ></Option>
                    </Tr>
                  ))
                ) : data.response.fleet ? (
                  data.response.fleet.map((data) => (
                    <Tr type="tbody" key={data.fleet_id}>
                      {/* ข้อมูลฟลีต */}
                      <Td>{data.fleet_id}</Td>
                      <Td>{data.fleet_name}</Td>
                      <Td>{data.parent_fleet_id}</Td>
                      <Option
                        type="full"
                        onEdit={`/fleet/${data.fleet_id}/edit`}
                        onView={`/fleet/${data.fleet_id}`}
                        id={data.fleet_id}
                        title="ลูกค้า"
                        customerName={data.fleet_name}
                        onDelete={handleToggleDeleteShowUp}
                      ></Option>
                    </Tr>
                  ))
                ) : (
                  <></>
                )}
              </Tbody>
            </Fragment>
          ) : (
            <></>
          )}
        </Table>
        <Pagination
          counted_page={data?.response.count_data}
          onClickPage={onClickPage}
          increPage={increPage}
          decrePage={decrePage}
        />
      </FormQuery>
    </>
  );
}
