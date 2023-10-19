import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  page: string;
}

export default function BreadCrumbs({ page }: Props) {
  const location = useLocation();
  const segment = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const module = segment[0];
  const id = segment[1];
  return (
    <div className="font-bold text-[20px] col-span-2">
      <div>
        {segment.length >= 1 ? (
          <nav>
            <ul className="flex gap-2 items-center">
              <li>
                <Link to={module}>{module}</Link>
              </li>
              {segment.length >= 2 ? (
                <Fragment>
                  <div>
                    <i className="fa-solid fa-greater-than"></i>
                  </div>
                  <li>
                    <Link to={`/${module}/${id}`}>{id}</Link>
                  </li>
                </Fragment>
              ) : (
                <Fragment></Fragment>
              )}
            </ul>
          </nav>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
