import React, { useEffect, useState, Fragment, useRef } from "react";
import Table from "../components/Table/Table";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Pagination from "../components/Table/Pagination";
import {
  Link,
  useLocation,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import { Data } from "../interface/dataType";
import { ToggleDelete, ToggleProps } from "../interface/componentType";
import { getData } from "../api/getData";
import FormQuery from "../components/FormQuery";
import Tr from "../components/Table/Tr";
import Td from "../components/Table/Td";
import Option from "../components/Table/Option";
import Th from "../components/Table/Th";
import Thead from "../components/Table/Thead";
import Tbody from "../components/Table/Tbody";
import togglePopup from "../components/PopUp/togglePopup";
import InputNAddNewFrame from "../components/Input/Input&AddNewFrame";
import Loading from "../components/Etc/Loading";
import { deleteData } from "../api/deleteData";
import TogglePopup from "../components/PopUp/togglePopup";
import { useSelector } from "react-redux";
import {
  setTogglePropsDefault,
  setTogglePropsState,
  togglePropsPopUpState,
} from "../features/togglePropsPopUpSlice";
import { useDispatch } from "react-redux";

export default function Main() {
  // useState
  const [data, setData] = useState<Data>();
  const [loading, setLoading] = useState<boolean>(false);

  // Router
  const location = useLocation();
  const segment = location.pathname
    .split("/")
    .filter((segment) => segment !== "");
  const menu = segment[0];
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // useRef
  const filter = useRef<HTMLInputElement>(null);

  // Redux
  const dispatch = useDispatch();
  const toggleProps = useSelector(togglePropsPopUpState);
  // useEffect
  useEffect(() => {
    if (sessionStorage.getItem("reload") == "true") {
      sessionStorage.removeItem("reload");
      window.location.reload();
    }
  });

  useEffect(() => {
    setLoading(true);
    getData(setData, menu).then(() => {
      setLoading(false);
    });
  }, [location]);

  // แสดง PopUp ยืนยันการกดลบข้อมูลสำหรับหน้าหลัก
  const handleToggleDeleteShowUp: (
    e: React.MouseEvent<HTMLLIElement>
  ) => void = (e) => {
    const title = e.currentTarget.title;
    const dataName = e.currentTarget.getAttribute("data-name");
    const id = Number(e.currentTarget.id);

    console.log(title);
    console.log(dataName);
    console.log(id);

    dispatch(
      setTogglePropsState({
        active: true,
        title: title,
        name: dataName ?? "",
        id: id,
        type: "delete",
      })
    );
  };

  // ยืนยันการลบข้อมูล
  const handleDeleteConfirm: () => void = () => {
    deleteData(Number(toggleProps.id), menu);
    dispatch(setTogglePropsDefault());
  };

  // เมื่อกดเลขหน้าตรง Pagi
  const onClickPage: (e: React.MouseEvent<HTMLLIElement>) => void = (e) => {
    const pageElem = e.currentTarget;
    const page = pageElem.id;
    let filter = searchParams.get("filter");
    if (!filter) filter = "";
    setSearchParams({ page: page, filter: filter });
  };

  // สำหรับปุ่ม ถัดไปตรง Pagi
  const increPage: () => void = () => {
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
  const decrePage: () => void = () => {
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

  const handleSearch: () => void = () => {
    if (filter.current) {
      const page = searchParams.get("page") ?? "";
      setSearchParams({ page: page, filter: filter.current.value });
    }
  };

  return (
    <Fragment>
      {!loading ? (
        <Fragment>
          <TogglePopup handleConfirm={handleDeleteConfirm} />

          <Input
            label="ชื่อลูกค้า"
            type="filter"
            placeholder="ชื่อลูกค้า"
            name="filter"
            onClick={handleSearch}
            refObject={filter}
          />
          <InputNAddNewFrame>
            <Link to={`/${menu}/add-new-${menu}`}>
              <Button name="เพิ่มใหม่" />
            </Link>
          </InputNAddNewFrame>
          <Table>
            {data ? (
              <Fragment>
                <Thead>
                  <Tr type="thead">
                    {data.response.customer && data.response.customer[0] ? (
                      <Th type="customer" />
                    ) : data.response.person && data.response.person[0] ? (
                      <Th type="person" />
                    ) : data.response.contact && data.response.contact[0] ? (
                      <Th type="contact" />
                    ) : data.response.address && data.response.address[0] ? (
                      <Th type="address" />
                    ) : data.response.fleet && data.response.fleet[0] ? (
                      <Th type="fleet" />
                    ) : data.response.vehicle && data.response.vehicle[0] ? (
                      <Th type="vehicle" />
                    ) : data.response.device && data.response.device[0] ? (
                      <Th type="device" />
                    ) : data.response.deviceSerial &&
                      data.response.deviceSerial[0] ? (
                      <Th type="deviceSerial" />
                    ) : data.response.card && data.response.card[0] ? (
                      <Th type="card" />
                    ) : data.response.document && data.response.document[0] ? (
                      <Th type="document" />
                    ) : (
                      <></>
                    )}
                  </Tr>
                </Thead>
                <Tbody>
                  {data.response.customer ? (
                    data.response.customer.map((data) => (
                      <Tr type="tbody" key={data.customer_id}>
                        {/* ลูกค้า */}
                        <Td>{data.RowNum}</Td>
                        {/* <Td>{data.customer_id}</Td> */}
                        <Td>{data.customer_name}</Td>
                        <Td>{data.telephone}</Td>
                        <Td>{data.email}</Td>
                        <Option
                          full
                          onEdit={`/customer/${data.customer_id}/edit`}
                          onView={`/customer/${data.customer_id}`}
                          id={data.customer_id}
                          title="ลูกค้า"
                          dataName={data.customer_name}
                          onDelete={handleToggleDeleteShowUp}
                        ></Option>
                      </Tr>
                    ))
                  ) : data.response.person && data.response.person ? (
                    data.response.person.map((data) => (
                      <Tr type="tbody" key={data.person_id}>
                        {/* คน */}
                        <Td>{data.RowNum}</Td>
                        {/* <Td>{data.person_id}</Td> */}
                        <Td>{data.fullname}</Td>
                        <Td>{data.role}</Td>
                        <Td>{data.mobile}</Td>
                        <Td>{data.email}</Td>
                        <Td>{data.description}</Td>
                        <Option
                          full
                          onEdit={`/person/${data.person_id}/edit`}
                          onView={`/person/${data.person_id}`}
                          id={data.person_id}
                          title="บุคคล"
                          dataName={data.fullname}
                          onDelete={handleToggleDeleteShowUp}
                        ></Option>
                      </Tr>
                    ))
                  ) : data.response.contact && data.response.contact ? (
                    data.response.contact.map((data) => (
                      <Tr type="tbody" key={data.contact_id}>
                        {/* ติดต่อ */}
                        <Td>{data.RowNum}</Td>
                        {/* <Td>{data.contact_id}</Td> */}
                        <Td>{data.value}</Td>
                        <Td>{data.contact_type}</Td>
                        <Td>{data.owner_name}</Td>
                        <Option
                          full
                          onEdit={`/contact/${data.contact_id}/edit`}
                          onView={`/contact/${data.contact_id}`}
                          id={data.contact_id}
                          title="การติดต่อ"
                          dataName={data.value}
                          onDelete={handleToggleDeleteShowUp}
                        ></Option>
                      </Tr>
                    ))
                  ) : data.response.address && data.response.address ? (
                    data.response.address.map((data) => (
                      <Tr type="tbody" key={data.address_id}>
                        {/* ที่อยู๋ */}
                        <Td>{data.RowNum}</Td>
                        {/* <Td>{data.address_id}</Td> */}
                        <Td>{data.location}</Td>
                        <Td>{data.address_type}</Td>
                        <Option
                          full
                          onEdit={`/address/${data.address_id}/edit`}
                          onView={`/address/${data.address_id}`}
                          id={data.address_id}
                          title="ที่อยู่"
                          dataName={data.location}
                          onDelete={handleToggleDeleteShowUp}
                        ></Option>
                      </Tr>
                    ))
                  ) : data.response.fleet && data.response.fleet ? (
                    data.response.fleet.map((data) => (
                      <Tr type="tbody" key={data.fleet_id}>
                        {/* ฟลีต */}
                        <Td>{data.RowNum}</Td>
                        {/* <Td>{data.fleet_id}</Td> */}
                        <Td>{data.fleet_name}</Td>
                        <Td>{data.vehicle_count}</Td>
                        <Option
                          full
                          onEdit={`/fleet/${data.fleet_id}/edit`}
                          onView={`/fleet/${data.fleet_id}`}
                          id={data.fleet_id}
                          title="ฟลีต"
                          dataName={data.fleet_name}
                          onDelete={handleToggleDeleteShowUp}
                        ></Option>
                      </Tr>
                    ))
                  ) : data.response.vehicle && data.response.vehicle ? (
                    data.response.vehicle.map((data) => (
                      <Tr type="tbody" key={data.vehicle_id}>
                        {/* รถ */}

                        <Td>{data.RowNum}</Td>
                        {/* <Td>{data.vehicle_id}</Td> */}
                        <Td>{data.license_plate}</Td>
                        <Td>{data.frame_no}</Td>
                        <Td>{data.vehicle_type}</Td>
                        <Td>{data.model_type}</Td>

                        <Option
                          full
                          onEdit={`/vehicle/${data.vehicle_id}/edit`}
                          onView={`/vehicle/${data.vehicle_id}`}
                          id={data.vehicle_id}
                          title="ยานพาหนะ"
                          dataName={data.frame_no}
                          onDelete={handleToggleDeleteShowUp}
                        ></Option>
                      </Tr>
                    ))
                  ) : data.response.device && data.response.device ? (
                    data.response.device.map((data) => (
                      <Tr type="tbody" key={data.device_id}>
                        {/* รถ */}

                        <Td>{data.RowNum}</Td>
                        {/* <Td>{data.device_id}</Td> */}
                        <Td>{data.veh_id}</Td>
                        <Td>{data.device_serial_id}</Td>
                        <Td>{data.box_type}</Td>
                        <Td>{data.sim_type}</Td>

                        <Option
                          full
                          onEdit={`/device/${data.device_id}/edit`}
                          onView={`/device/${data.device_id}`}
                          id={data.device_id}
                          title="ชุดอุปกรณ์"
                          dataName={data.device_id}
                          onDelete={handleToggleDeleteShowUp}
                        ></Option>
                      </Tr>
                    ))
                  ) : data.response.deviceSerial ? (
                    data.response.deviceSerial.map((data) => (
                      <Tr type="tbody" key={data.device_serial_id}>
                        {/* รถ */}

                        <Td>{data.RowNum}</Td>
                        {/* <Td>{data.device_serial_id}</Td> */}
                        <Td>{data.serial_id}</Td>
                        <Td>{data.device_type}</Td>
                        <Td>{data.create_date}</Td>

                        <Option
                          full
                          onEdit={`/device-serial/${data.device_serial_id}/edit`}
                          onView={`/device-serial/${data.device_serial_id}`}
                          id={data.device_serial_id}
                          title="ลูกค้า"
                          dataName={data.device_serial_id}
                          onDelete={handleToggleDeleteShowUp}
                        ></Option>
                      </Tr>
                    ))
                  ) : data.response.card ? (
                    data.response.card.map((data) => (
                      <Tr type="tbody" key={data.card_id}>
                        {/* บัตร */}

                        <Td>{data.RowNum}</Td>
                        {/* <Td>{data.card_id}</Td> */}
                        <Td>{data.card_type}</Td>
                        <Td>{data.value}</Td>
                        <Td>{data.owner_name}</Td>

                        <Option
                          full
                          onEdit={`/card/${data.card_id}/edit`}
                          onView={`/card/${data.card_id}`}
                          id={data.card_id}
                          title="ลูกค้า"
                          dataName={data.card_id}
                          onDelete={handleToggleDeleteShowUp}
                        ></Option>
                      </Tr>
                    ))
                  ) : data.response.document ? (
                    data.response.document.map((data) => (
                      <Tr type="tbody" key={data.document_id}>
                        {/* เอกสาร */}

                        <Td>{data.RowNum}</Td>
                        {/* <Td>{data.document_id}</Td> */}
                        <Td>{data.document_type}</Td>
                        <Td>{data.document_name}</Td>
                        <Td>{data.owner_name}</Td>

                        <Option
                          full
                          onEdit={`/document/${data.document_id}/edit`}
                          onView={`/document/${data.document_id}`}
                          id={data.document_id}
                          title="ลูกค้า"
                          dataName={data.document_id}
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
        </Fragment>
      ) : (
        <Loading />
      )}
      {data && "count_data" in data.response ? (
        <Pagination
          counted_page={data.response.count_data}
          onClickPage={onClickPage}
          increPage={increPage}
          decrePage={decrePage}
        />
      ) : (
        <></>
      )}
    </Fragment>
  );
}
