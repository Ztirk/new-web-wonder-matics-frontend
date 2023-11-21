interface Props {
  children: React.ReactNode;
  onClick: (id: number) => Promise<void>;
  id: string;
}

export default function Td({ children, onClick, id }: Props) {
  return (
    <td
      className={`px-3 ${onClick ? "cursor-pointer hover:underline" : ""}`}
      onClick={(e: React.MouseEvent<HTMLTableCellElement>) =>
        onClick(Number(e.currentTarget.id))
      }
      id={id}
    >
      {children}
    </td>
  );
}
