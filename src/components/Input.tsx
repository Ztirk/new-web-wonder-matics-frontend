import { Fragment } from "react";
import Button from "./Button";

interface Props {
  label?: string;
  type: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
  id?: string;
  ref: React.RefObject<HTMLInputElement>;
}

export default function Input({
  label,
  type,
  placeholder,
  name,
  defaultValue,
  id,
  ref,
}: Props) {
  return (
    <Fragment>
      {type !== "checkbox" ? (
        <div
          className={`flex  ${
            type == "filter"
              ? " gap-5 items-center"
              : type == "pagi"
              ? " gap-2 items-center"
              : type == "regular" || type == "disable" || type == "selector"
              ? "flex-col"
              : ""
          }`}
        >
          {type == "pagi" ? (
            <></>
          ) : (
            <label htmlFor={""} className="font-bold">
              {label}
            </label>
          )}

          <input
            id={id}
            className={`pl-3 border border-gray-400 rounded-md h-[40px] ${
              type == "pagi" ? "w-[40px]" : "w-[240px]"
            }`}
            placeholder={placeholder}
            disabled={type == "disable" ? true : false}
            list="data"
            name={name}
            defaultValue={defaultValue == undefined ? "" : defaultValue}
            ref={ref}
            // onKeyDown={handleEnter}
          />

          {type == "filter" ? <Button name="ค้นหา" /> : <></>}
          {type == "pagi" ? (
            <label htmlFor="input" className="font-bold">
              {label}
            </label>
          ) : (
            <Fragment></Fragment>
          )}
        </div>
      ) : (
        <input type="checkbox" className="h-[20px] w-full" />
      )}
    </Fragment>
  );
}
