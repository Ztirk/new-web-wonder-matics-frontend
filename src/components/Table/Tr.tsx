interface Props {
  children: React.ReactNode;
  type: "tbody" | "thead";
  id: string;
  refObject: React.RefObject<HTMLTableRowElement>;
}

export default function Tr({ children, type, id, refObject }: Props) {
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
      ref={refObject}
    >
      {children}
    </tr>
  );
}
