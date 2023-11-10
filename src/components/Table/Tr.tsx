interface Props {
  children: React.ReactNode;
  type: "tbody" | "thead";
  id: string;
  dataId: number;
}

export default function Tr({ children, type, id, dataId }: Props) {
  return (
    <tr
      className={`border border-[#EAECF0] ${
        type == "thead"
          ? " bg-[#F9FAFB] h-[35.87px]"
          : type == "tbody"
          ? "h-[66.213px]"
          : ""
      }`}
      id={id}
      data-id={dataId}
    >
      {children}
    </tr>
  );
}
