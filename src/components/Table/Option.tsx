import Td from "./Td";
import { Link } from "react-router-dom";

interface Props {
  full: true;
  onView: string;
  onEdit: string;
  id: string;
  onDelete: (e: React.MouseEvent<HTMLLIElement>) => void;
  name: string;
  title: string;
  dataName: string;
}

export default function Option({
  full,
  onView,
  onEdit,
  id,
  onDelete,
  dataName,
  title,
}: Props) {
  return (
    <Td>
      <ul className="flex gap-3">
        {full ? (
          <>
            <Link to={onView}>
              <i className="fa-regular fa-eye"></i>
            </Link>
            <Link to={onEdit}>
              <i className="fa-regular fa-pen-to-square"></i>
            </Link>
          </>
        ) : (
          <></>
        )}
        <li
          onClick={onDelete}
          id={id}
          className="cursor-pointer"
          data-name={dataName}
          title={title}
        >
          <i className="fa-regular fa-trash-can"></i>
        </li>
      </ul>
    </Td>
  );
}
