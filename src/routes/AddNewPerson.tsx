export default function AddNewPerson() {
  return (
    <Fragment>
      <Divider title="ข้อมูลบุคคล" />
      <InputFrame>
        <Input
          label="ชื่อ"
          placeholder="ชื่อ"
          type="regular"
          name="ชื่อ"
          ref={firstname}
          defaultValue={
            individualData &&
            "person" in individualData.response &&
            !Array.isArray(individualData.response.person)
              ? individualData.response.person.firstname
              : ""
          }
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
        />
        <Input
          label="นามสกุล"
          placeholder="นามสกุล"
          type="regular"
          ref={lastname}
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
          defaultValue={
            individualData &&
            "person" in individualData.response &&
            !Array.isArray(individualData.response.person)
              ? individualData.response.person.lastname
              : ""
          }
        />
        <Selector
          label="คำนำหน้า"
          selectorData={selectorData}
          number={0}
          ref={title}
          type="selector"
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
          defaultValue={
            individualData &&
            "person" in individualData.response &&
            !Array.isArray(individualData.response.person)
              ? individualData.response.person.title_type
              : "เลือกคำนำหน้า"
          }
        />
        <Input
          label="ชื่อเล่น"
          placeholder="ชื่อเล่น"
          type="regular"
          ref={nickname}
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
          defaultValue={
            individualData &&
            "person" in individualData.response &&
            !Array.isArray(individualData.response.person)
              ? individualData.response.person.nickname
              : ""
          }
        />
        <Selector
          label="ตำแหน่ง"
          selectorData={selectorData}
          type="multi-selector"
          number={1}
          ref={role}
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
          defaultValue={
            individualData &&
            "person" in individualData.response &&
            !Array.isArray(individualData.response.person)
              ? individualData.response.person.role[0].role_type
              : "เลือกตำแหน่ง"
          }
        />
        <Input
          label="รายละเอียด"
          c
          placeholder="รายละเอียด"
          type="regular"
          ref={description}
          disabled={edit !== "edit" && !isNaN(Number(addNewOId)) ? true : false}
          defaultValue={
            individualData &&
            "person" in individualData.response &&
            !Array.isArray(individualData.response.person)
              ? individualData.response.person.description
              : ""
          }
        />
      </InputFrame>
    </Fragment>
  );
}
