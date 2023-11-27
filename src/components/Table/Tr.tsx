interface Props {
  children: React.ReactNode;
  type: "tbody" | "thead";
  id: string;
  refObject: React.RefObject<HTMLTableRowElement>;
  onClick?: (e: React.MouseEvent<HTMLTableRowElement>) => void;
  dataLayer?: number;
}

export default function Tr({
  children,
  type,
  id,
  refObject,
  onClick,
  dataLayer,
}: Props) {
  return (
    <tr
      className={`border border-[#EAECF0] ${onClick ? `cursor-pointer` : ``} ${
        type == "thead"
          ? " bg-[#F9FAFB] h-[35.87px]"
          : type == "tbody"
          ? "h-[66.213px]"
          : ""
      }`}
      id={id}
      ref={refObject}
      onClick={onClick ? onClick : undefined}
      data-active="false"
      data-layer={dataLayer}
    >
      {children}
    </tr>
  );
}
