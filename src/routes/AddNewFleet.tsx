export default function AddNewFleet() {
  return (
    <Fragment>
      {/* ฟลีต */}
      <Divider title="ข้อมูลฟลีต" />
      <InputFrame>
        <Input
          label="ชื่อฟลีต"
          placeholder="ชื่อฟลีต"
          type="regular"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Selector
          label="ชื่อหัวฟลีต"
          defaultValue="เลือกชื่อหัวฟลีต"
          selectorData={selectorData}
          number={0}
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
      </InputFrame>
    </Fragment>
  );
}
