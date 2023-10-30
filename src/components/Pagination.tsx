import { useLocation, useSearchParams } from "react-router-dom";
import Input from "./Input";
import { useEffect } from "react";

interface Props {
  counted_page: number;
  onClickPage: (e: React.MouseEvent<HTMLLIElement>) => void;
  increPage: (e: React.MouseEvent<HTMLDivElement>) => void;
  decrePage: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export default function Pagination({
  counted_page,
  onClickPage,
  increPage,
  decrePage,
}: Props) {
  const [searchParams, setSearchParams] = useSearchParams();

  const createPagi = () => {
    const pagi = [];
    let limit = 8;
    let page = Number(searchParams.get("page"));
    let ceil = Math.ceil(counted_page / 10);
    if (!Number(page)) {
      page = 1;
    }

    if (page < 5) {
      limit = page;
    } else if (page > ceil - 5) {
      limit = ceil - page;
    } else {
      limit = 4;
    }

    for (let i = page - limit; i <= page + limit; i++) {
      pagi.push(
        <li
          className="cursor-pointer"
          onClick={onClickPage}
          id={i.toString()}
          key={i}
        >
          {i}
        </li>
      );
    }

    return pagi;
  };

  return (
    <div className="col-span-2 flex justify-end gap-3">
      <div className="flex gap-3 items-center">
        <i className="fa-solid fa-less-than"></i>
        <div onClick={decrePage} className="cursor-pointer">
          ก่อนหน้า
        </div>

        <nav>
          <ul className="grid grid-cols-9 gap-3">{createPagi()}</ul>
        </nav>

        <div onClick={increPage} className="cursor-pointer">
          ถัดไป
        </div>
        <i className="fa-solid fa-greater-than"></i>
      </div>
      <Input
        label={`of ${Math.ceil(counted_page / 10)} pages`}
        type="pagi"
        placeholder="no"
        name="page"
      />
    </div>
  );
}
