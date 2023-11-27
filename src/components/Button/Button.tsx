interface Props {
  name:
    | "เพิ่มที่มี"
    | "ค้นหา"
    | "ยกเลิก"
    | "ย้อนกลับ"
    | "บันทึก"
    | "ยืนยัน"
    | "เพิ่มใหม่";
  disabled?: boolean;
  onClick?: () => void | React.Dispatch<React.SetStateAction<string>>;
}

export default function Button({ name, disabled, onClick }: Props) {
  return (
    <div>
      <button
        className={` h-[40px] w-[100px] rounded-md text-white ${
          disabled
            ? "bg-[#D0D0D0]"
            : name == "ค้นหา" || name == "เพิ่มใหม่"
            ? "bg-[#003E51]/80"
            : name == "ย้อนกลับ" || name == "ยกเลิก"
            ? "bg-[#808080]"
            : name == "เพิ่มที่มี"
            ? "bg-[#A88679]"
            : name == "บันทึก" || name == "ยืนยัน"
            ? "bg-[#198754]"
            : ""
        }`}
        onClick={onClick}
        disabled={disabled}
        type="submit"
      >
        {name == "ค้นหา" ? (
          <>
            <i className="fa-solid fa-magnifying-glass" />{" "}
          </>
        ) : (
          <></>
        )}
        {name}
      </button>
    </div>
  );
}
