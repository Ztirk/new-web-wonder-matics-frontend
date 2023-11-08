export default function AddNewDevice() {
  return (
    <Fragment>
      {/* อุปกรณ์ */}
      <Divider title="ข้อมูลอุปกรณ์" />
      <InputFrame>
        <Input
          label="device_id"
          placeholder="device_id"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="veh_id"
          placeholder="veh_id"
          type="regular"
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
