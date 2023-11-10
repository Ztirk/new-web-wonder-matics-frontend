import { Fragment } from "react";
import Td from "./Td";
import { Link } from "react-router-dom";

interface Props {
  type: "full" | "edit";
  onView: string;
  onEdit: string;
  id: string;
  onDelete: (e: React.MouseEvent<HTMLLIElement>) => void;
  name: string;
  title: string;
  dataName: string;
}

export default function Option({
  type,
  onView,
  onEdit,
  id,
  onDelete,
  dataName,
  title,
}: Props) {
  return (
    <Td>
      <nav>
        <ul className="flex gap-3">
          {type == "full" ? (
            <>
              <Link to={onView}>
                <i className="fa-regular fa-eye"></i>
              </Link>
              <Link to={onEdit}>
                <i className="fa-regular fa-pen-to-square"></i>
              </Link>
            </>
          ) : type == "edit" ? (
            <Fragment></Fragment>
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
      </nav>
    </Td>
  );
}
