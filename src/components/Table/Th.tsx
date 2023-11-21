import React from "react";

interface Props {
  type:
    | "customer"
    | "person"
    | "vehicle"
    | "contact"
    | "address"
    | "fleet"
    | "device"
    | "deviceSerial"
    | "card"
    | "document";
  sub?: true;
  addNew2OEdit?: string;
  addNew1OId?: string;
  noOption: true;
}

export default function Th({
  type,
  sub,
  addNew1OId,
  addNew2OEdit,
  noOption,
}: Props) {
  return (
    <>
      <ThClass>No</ThClass>
      {/* <ThClass>data-id</ThClass> */}
      {type == "customer" ? (
        <>
          {sub ? (
            <>
              <ThClass>ชื่อลูกค้า</ThClass>
              <ThClass>ตำแหน่ง</ThClass>
              <ThClass>โทรศัพท์</ThClass>
              <ThClass>อีเมล์</ThClass>
            </>
          ) : (
            <>
              <ThClass>ชื่อลูกค้า</ThClass>
              <ThClass>โทรศัพท์</ThClass>
              <ThClass>อีเมล์</ThClass>
            </>
          )}
        </>
      ) : type == "person" ? (
        <>
          <ThClass>ชื่อ-นามสกุล</ThClass>
          <ThClass>ตำแหน่ง</ThClass>
          <ThClass>มือถือ</ThClass>
          <ThClass>อีเมล์</ThClass>
          <ThClass>รายละเอียด</ThClass>
        </>
      ) : type == "vehicle" ? (
        <>
          <ThClass>ทะเบียน</ThClass>
          <ThClass>เลขตัวถัง</ThClass>
          <ThClass>ประเภทยานพาหนะ</ThClass>
          <ThClass>รุ่น</ThClass>
        </>
      ) : type == "contact" ? (
        <>
          <ThClass>ประเภทการติดต่อ</ThClass>
          <ThClass>รายละเอียดการติดต่อ</ThClass>
          <ThClass>เจ้าของ</ThClass>
        </>
      ) : type == "address" ? (
        <>
          <ThClass>รายละเอียดการติดต่อ</ThClass>
          <ThClass>ประเภทที่อยู่</ThClass>
        </>
      ) : type == "fleet" ? (
        <>
          <ThClass>ชื่อฟลีต</ThClass>
          <ThClass>จำนวนรถ</ThClass>
        </>
      ) : type == "device" ? (
        <>
          {sub ? (
            <></>
          ) : (
            <>
              <ThClass>veh_id (เก่า)</ThClass>
              <ThClass>device_serial_id</ThClass>
              <ThClass>ประเภทกล่อง</ThClass>
              <ThClass>ปนะเภทซิม</ThClass>
            </>
          )}
        </>
      ) : type == "deviceSerial" ? (
        <>
          <ThClass>serial_device</ThClass>
          <ThClass>ประเภทกล่อง</ThClass>
          <ThClass>วันที่เพิ่ม</ThClass>
        </>
      ) : type == "card" ? (
        <>
          <ThClass>ประเภทบัตร</ThClass>
          <ThClass>รายละเอียดบัตร</ThClass>
          <ThClass>เจ้าของ</ThClass>
        </>
      ) : type == "document" ? (
        <>
          <ThClass>ประเภทเอกสาร</ThClass>
          <ThClass>ชื่อเอกสาร</ThClass>
          <ThClass>เจ้าของ</ThClass>
        </>
      ) : (
        <></>
      )}
      {!addNew2OEdit && !isNaN(Number(addNew1OId)) ? (
        <></>
      ) : (
        <>{!noOption ? <ThClass>ตัวเลือก</ThClass> : <></>}</>
      )}
    </>
  );
}

interface Children {
  children: React.ReactNode;
}

function ThClass({ children }: Children) {
  return <th className="px-3 text-left ">{children}</th>;
}
