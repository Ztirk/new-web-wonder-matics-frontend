export default function AddNewVehicle() {
  return (
    <Fragment>
      {/* ยานพาหนะ */}
      <Divider title="ข้อมูลยานพาหนะ" />
      <InputFrame>
        <Selector
          label="ประเภทยานพาหนะ"
          defaultValue="เลือกประเภทยานพาหนะ"
          selectorData={selectorData}
          number={0}
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="ทะเบียนรถ"
          placeholder="ทะเบียนรถ"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Selector
          label="หมวดจังหวัด"
          defaultValue="เลือกหมวดจังหวัด"
          selectorData={selectorData}
          number={0}
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="เลขตัวถัง"
          placeholder="เลขตัวถัง"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Selector
          label="ยี่ห้อยานยนต์"
          defaultValue="เลือกยี่ห้อยานยนต์"
          selectorData={selectorData}
          number={0}
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Selector
          label="รุ่นยานยนต์"
          defaultValue="เลือกรุ่นยานยนต์"
          selectorData={selectorData}
          number={0}
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="ลักษณะในการจดทะเบียน"
          placeholder="ลักษณะในการจดทะเบียน"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
          type="regular"
        />
        <Selector
          label="ประเภทใบขับขี่่"
          defaultValue="เลือกประเภทใบขับขี่่"
          selectorData={selectorData}
          number={0}
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="จำนวนเพลา"
          placeholder="จำนวนเพลา"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="จำนวนกงล้อ"
          placeholder="จำนวนกงล้อ"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="จำนวนยาง"
          placeholder="จำนวนยาง"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
      </InputFrame>
      <Divider title="ค่ากำหนด" />
      <InputFrame>
        <Input
          label="ความเร็วสูงสุด"
          placeholder="ความเร็วสูงสุด"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="เวลา idel (นาที)"
          placeholder="เวลา idel (นาที)"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="fuel tank number"
          placeholder="fuel tank number"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="fuel tank capacity"
          placeholder="fuel tank capacity"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="max fuel voltage 1"
          placeholder="max fuel voltage 1"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="max fuel voltage 2"
          placeholder="max fuel voltage 2"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
      </InputFrame>
    </Fragment>
  );
}
