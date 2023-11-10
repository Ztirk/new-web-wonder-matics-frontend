import { Fragment } from "react";
import Button from "../Button/Button";
import { key } from "localforage";

interface Props {
  label?: string;
  type: string;
  placeholder?: string;
  name?: string;
  defaultValue?: string;
  id?: string;
  refObject: React.RefObject<HTMLInputElement>;
  disabled: boolean;
  onClick: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function Input({
  label,
  type,
  placeholder,
  name,
  defaultValue,
  id,
  refObject,
  disabled,
  onClick,
  onChange,
}: Props) {
  return (
    <Fragment>
      {type !== "checkbox" ? (
        <div
          className={`flex  ${
            type == "filter"
              ? " gap-5 items-center"
              : type == "regular"
              ? "flex-col"
              : ""
          }`}
        >
          <label htmlFor={""} className="font-bold">
            {label}
          </label>

          <input
            id={id}
            className={`pl-3 border border- rounded-md h-[40px] w-[240px]`}
            placeholder={placeholder}
            disabled={disabled}
            list="data"
            name={name}
            defaultValue={defaultValue == undefined ? "" : defaultValue}
            ref={refObject}
            onKeyDown={(e) => (e.key == "Enter" ? onClick() : null)}
            onChange={onChange}
            // onKeyDown={handleEnter}
          />

          {type == "filter" ? <Button name="ค้นหา" onClick={onClick} /> : <></>}
        </div>
      ) : (
        <input type="checkbox" className="h-[20px] w-full" />
      )}
    </Fragment>
  );
}
