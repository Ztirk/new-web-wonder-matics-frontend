import { Fragment } from "react";
import Td from "./Td";
import { Link } from "react-router-dom";

interface Props {
  type: "full" | "edit";
  onView: string;
  onEdit: string;
  id: string;
  onDelete: () => void;
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
                <li>ดู</li>
              </Link>
              <Link to={onEdit}>
                <li>แก้ไข</li>
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
            ลบ
          </li>
        </ul>
      </nav>
    </Td>
  );
}
