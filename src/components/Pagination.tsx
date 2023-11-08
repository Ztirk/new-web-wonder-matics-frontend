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

  useEffect(() => {
    let id = searchParams.get("page");

    if (!id) {
      id = "1";
    }

    const selectedPagi = document.querySelector(
      `[data-name='pagi'][id='${id}']`
    );

    if (selectedPagi) {
      selectedPagi.classList.add("bg-[#F9FAFB]", "rounded-md");
    }

    return () => {
      if (selectedPagi) {
        selectedPagi.classList.remove("bg-[#F9FAFB]", "rounded-md");
      }
    };
  }, [searchParams]);

  const createPagi = () => {
    const pagi = [];
    let page = Number(searchParams.get("page"));
    const ceil = Math.ceil(counted_page / 10);
    if (!Number(page)) {
      page = 1;
    }
    let start: number;
    let end: number;

    if (ceil > 9) {
      if (page == 1) {
        start = 1;
        end = start + 8;
      } else if (page == 2) {
        start = 1;
        end = start + 7;
      } else if (page == 3) {
        start = 1;
        end = start + 6;
      } else if (page == 4) {
        start = 1;
        end = start + 5;
      } else if (page == ceil) {
        start = page - 8;
        end = page;
      } else if (page == ceil - 1) {
        start = page - 7;
        end = page + 1;
      } else if (page == ceil - 2) {
        start = page - 6;
        end = page + 2;
      } else if (page == ceil - 3) {
        start = page - 5;
        end = page + 3;
      } else {
        start = page - 4;
        end = page + 4;
      }
    } else {
      start = 1;
      end = ceil;
    }

    for (let i = start; i <= end; i++) {
      pagi.push(
        <li
          className="cursor-pointer py-1 px-2 flex justify-center items-center"
          onClick={onClickPage}
          id={i.toString()}
          key={i}
          data-name="pagi"
        >
          {i}
        </li>
      );
    }

    return pagi;
  };

  return (
    <div className="col-span-2 w-full">
      <div className="flex gap-3 justify-between w-full items-center">
        <div
          onClick={decrePage}
          className="cursor-pointer border border-[#EAECF0] py-2 px-4 rounded-md shadow-sm"
        >
          <i className="fa-solid fa-arrow-left" /> ก่อนหน้า
        </div>

        <nav>
          <ul className="grid grid-cols-9 gap-3 ">{createPagi()}</ul>
        </nav>

        <div
          onClick={increPage}
          className="cursor-pointer border border-[#EAECF0] py-2 px-4 rounded-md shadow-sm"
        >
          ถัดไป <i className="fa-solid fa-arrow-right" />
        </div>
      </div>
    </div>
  );
}
