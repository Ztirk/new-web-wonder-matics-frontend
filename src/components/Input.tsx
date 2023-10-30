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
  disabled: boolean;
}

export default function Input({
  label,
  type,
  placeholder,
  name,
  defaultValue,
  id,
  ref,
  disabled,
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
              : type == "regular"
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
            disabled={disabled}
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
