import Input from "./Input";

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
  const createPagi = () => {
    const pagi = [];

    for (let i = 1; i <= Math.ceil(counted_page / 10); i++) {
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
          <ul className="flex gap-3">{createPagi()}</ul>
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
