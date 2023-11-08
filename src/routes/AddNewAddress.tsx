export default function AddNewAddress() {
  return (
    <Fragment>
      <Divider title="ข้อมูลที่อยู่" />
      <InputFrame>
        <Selector
          label="ประเภทที่อยู่"
          defaultValue="เลือกประเภทที่อยู่"
          selectorData={selectorData}
          number={0}
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="เลขที่"
          placeholder="เลขที่"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="หมู่ที่"
          placeholder="หมู่ที่"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="ซอย"
          placeholder="ซอย"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="ถนน"
          placeholder="ถนน"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="ตำบล/แขวง"
          placeholder="ตำบล/แขวง"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="อำเภอ/เขต"
          placeholder="อำเภอ/เขต"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="จังหวัด"
          placeholder="จังหวัด"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="รหัสไปรษณีย์"
          placeholder="รหัสไปรษณีย์"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
      </InputFrame>
    </Fragment>
  );
}
