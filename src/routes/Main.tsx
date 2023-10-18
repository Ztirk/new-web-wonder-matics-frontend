import React, { useEffect, useState, Fragment } from "react";
import Table from "../components/Table";
import Input from "../components/Input";
import Button from "../components/Button";
import Pagination from "../components/Pagination";
import { Link, useLocation, useSearchParams } from "react-router-dom";
import { Customer } from "../interface/dataType";
import { ToggleDelete } from "../interface/componentType";
import { fetchData, deleteCustomer } from "../api/getData";
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
import { Address } from "../interface/addressType";
import { Fleet } from "../interface/fleetType";
import { Person } from "../interface/personType";
import Loading from "../components/Loading";

export default function Main() {
  // เก็บข้อมูลหน้าหลัก
  const [data, setData] = useState<
    Customer & Person & Contact & Address & Fleet
  >();

  // ค่าเริ่มต้นสำหรับปุ่มลบ
  const defaultToggleDelete = {
    active: false,
    title: "",
    name: "",
    id: "",
  };

  // loading while fetching
  const [loading, setLoading] = useState<Boolean>(false);

  // ปุ่มลบข้อมูล
  const [toggleDelete, setToggleDelete] =
    useState<ToggleDelete>(defaultToggleDelete);

  // แสดง url ปัจจุบัน
  const location = useLocation();

  // path ทั้งหมด
  const segment = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  // ชื่อ Menu หลัก
  const module = segment[0];

  // ค้นหา query params
  const [searchParams, setSearchParams] = useSearchParams();

  // เมื่อมีการเปลี่ยน path จะทำงาน
  useEffect(() => {
    fetchData(setData, module, setLoading);
  }, [location]);

  // แสดง PopUp ยืนยันการกดลบข้อมูลสำหรับหน้าหลัก
  const handleToggleDeleteShowUp: (
    e: React.MouseEvent<HTMLLIElement>
  ) => void = (e) => {
    const title = e.currentTarget.title;
    const customerName = e.currentTarget.getAttribute("customerName");
    const id = e.currentTarget.id;

    setToggleDelete({ active: true, title: title, name: customerName, id: id });
  };

  // ยืนยันการลบข้อมูล
  const handleDeleteConfirm: () => void = () => {
    deleteCustomer(toggleDelete.id);
    handleDeleteCancel();
  };

  // ล้าง toggleDelete state
  const handleDeleteCancel = () => {
    setToggleDelete(defaultToggleDelete);
  };

  // เมื่อกดเลขหน้าตรง Pagi
  const onClickPage: (e: React.MouseEvent<HTMLLIElement>) => void = (e) => {
    const page = e.currentTarget.id;
    let filter = searchParams.get("filter");
    if (!filter) filter = "";
    setSearchParams({ page: page, filter: filter });
  };

  // สำหรับปุ่ม ถัดไปตรง Pagi
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

  // สำหรับปุ่มย้อนกลับตรง Pagi
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
    <Fragment>
      {!loading ? (
        <Fragment>
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
                          (columnName) => (
                            <Th key={columnName}>
                              {columnName == "customer_name"
                                ? "ชื่อลูกค้า"
                                : columnName == "telephone"
                                ? "โทรศัพท์"
                                : columnName == "email"
                                ? "อีเมล์"
                                : columnName}
                            </Th>
                          )
                        )
                      ) : data.response.person ? (
                        Object.keys(data?.response.person[0]).map(
                          (columnName) => <Th key={columnName}>{columnName}</Th>
                        )
                      ) : data.response.contact ? (
                        Object.keys(data.response.contact[0]).map(
                          (columnName) => <Th key={columnName}>{columnName}</Th>
                        )
                      ) : data.response.address ? (
                        Object.keys(data.response.address[0]).map(
                          (columnName) => <Th key={columnName}>{columnName}</Th>
                        )
                      ) : data.response.fleet ? (
                        Object.keys(data.response.fleet[0]).map(
                          (columnName) => <Th key={columnName}>{columnName}</Th>
                        )
                      ) : data.response.vehicle ? (
                        Object.keys(data.response.vehicle[0]).map(
                          (columnName) => <Th key={columnName}>{columnName}</Th>
                        )
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
                          {/* ลูกค้า */}
                          <Td>{data.RowNum}</Td>
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
                          {/* คน */}
                          <Td>{data.RowNum}</Td>
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
                          {/* ติดต่อ */}
                          <Td>{data.RowNum}</Td>
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
                          {/* ที่อยู๋ */}
                          <Td>{data.RowNum}</Td>
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
                          {/* ฟลีต */}
                          <Td>{data.RowNum}</Td>
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
                    ) : data.response.vehicle ? (
                      data.response.vehicle.map((data) => (
                        <Tr type="tbody" key={data.vehicle_id}>
                          {/* รถ */}

                          <Td>{data.RowNum}</Td>
                          <Td>{data.vehicle_id}</Td>
                          <Td>{data.license_plate}</Td>
                          <Td>{data.frame_no}</Td>
                          <Td>{data.vehicle_type}</Td>
                          <Td>{data.model}</Td>

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
        </Fragment>
      ) : (
        <Loading />
      )}
    </Fragment>
  );
}
