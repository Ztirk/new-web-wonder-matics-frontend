interface Props {
  children: React.ReactNode;
  type: "tbody" | "thead";
  id: string;
  dataId: number;
}

export default function Tr({ children, type, id, dataId }: Props) {
  return (
    <tr
      className={
        type == "thead"
          ? "text-center bg-[#003E51] text-white h-[35.87px]"
          : type == "tbody"
          ? "h-[66.213px]"
          : ""
      }
      id={id}
      data-id={dataId}
    >
      {children}
    </tr>
  );
}
