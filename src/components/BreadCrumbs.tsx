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
  return (
    <div className="font-bold text-[20px] col-span-2">
      <div>
        {page == "customer" ? (
          segment.length >= 1 ? (
            <nav>
              <ul className="flex gap-2 items-center">
                <li>
                  <Link to="/customer">{segment[0]}</Link>
                </li>
                {segment.length >= 2 ? (
                  <Fragment>
                    <div>
                      <i className="fa-solid fa-greater-than"></i>
                    </div>
                    <li>
                      <Link to="/customer">{segment[1]}</Link>
                    </li>
                  </Fragment>
                ) : (
                  <Fragment></Fragment>
                )}
              </ul>
            </nav>
          ) : (
            <Fragment></Fragment>
          )
        ) : (
          <Fragment></Fragment>
        )}
      </div>
    </div>
  );
}

