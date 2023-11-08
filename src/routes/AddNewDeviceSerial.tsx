export default function AddNewDeviceSerial() {
  return (
    <Fragment>
      <Divider title="ข้อมูลชุดอุปกรณ์" />
      <InputFrame>
        <Input
          label="device_serial"
          placeholder="device_serial"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="IMEI"
          placeholder="IMEI"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Selector
          label="ประเภทกล่อง"
          defaultValue="เลือกประเภทกล่อง"
          selectorData={selectorData}
          number={0}
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="วันที่เพิ่ม"
          placeholder="วันที่เพิ่ม"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
      </InputFrame>
    </Fragment>
  );
}
