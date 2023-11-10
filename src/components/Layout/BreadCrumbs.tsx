import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";

interface Props {
  page: string;
}

export default function BreadCrumbs({ page }: Props) {
  const location = useLocation();
  const segments = location.pathname
    .split("/")
    .filter((segment) => segment !== "");

  const menu = segments[0];
  const addNewOId = segments[1];
  const editOAddNew = segments[2];
  const addNew2 = segments[3];

  return (
    <div className="font-bold text-[20px] col-span-2">
      <div>
        {segments.length >= 1 ? (
          <nav>
            <ul className="flex gap-2 items-center">
              <li>
                <Link to={menu}>{menu}</Link>
              </li>
              {segments.length >= 2 ? (
                <Fragment>
                  <div>
                    <i className="fa-solid fa-greater-than"></i>
                  </div>

                  <li>
                    <Link
                      to={
                        editOAddNew &&
                        editOAddNew == "edit" &&
                        !isNaN(Number(addNewOId))
                          ? `/${menu}/${addNewOId}/${editOAddNew}`
                          : `/${menu}/${addNewOId}`
                      }
                    >
                      {editOAddNew && editOAddNew == "edit" ? "edit " : ""}
                      {addNewOId}
                    </Link>
                  </li>
                  {segments.length >= 3 ? (
                    editOAddNew !== "edit" ? (
                      <Fragment>
                        <div>
                          <i className="fa-solid fa-greater-than"></i>
                        </div>
                        <li>
                          <Link>{editOAddNew}</Link>
                        </li>
                      </Fragment>
                    ) : (
                      <Fragment>
                        {segments.length >= 4 ? (
                          <Fragment>
                            <div>
                              <i className="fa-solid fa-greater-than"></i>
                            </div>
                            <li>
                              <Link to=".." relative="path">
                                {addNew2}
                              </Link>
                            </li>
                          </Fragment>
                        ) : (
                          <Fragment />
                        )}
                      </Fragment>
                    )
                  ) : (
                    <Fragment />
                  )}
                </Fragment>
              ) : (
                <Fragment />
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
