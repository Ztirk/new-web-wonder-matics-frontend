import React, { Fragment } from "react";
import Button from "../Button/Button";
import { key } from "localforage";

interface Props {
  label?: string;
  type:
    | "checkbox"
    | "filter"
    | "regular"
    | "file"
    | "date-time"
    | "number"
    | "checkbox-form";
  placeholder?: string;
  name?: string;
  defaultValue?: string | number | boolean;
  id?: string;
  refObject: React.RefObject<HTMLInputElement>;
  disabled: boolean;
  onClick?: () => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
  setFile?: React.Dispatch<React.SetStateAction<FileList[0] | null>>;
  required: boolean;
  onChecked?: (e: React.ChangeEvent<HTMLInputElement>) => void;
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
  setFile,
  required,
  onEnter,
  onChecked,
}: Props) {
  return (
    <Fragment>
      {type == "checkbox" ? (
        <input type="checkbox" className="h-[20px] w-full" />
      ) : type == "checkbox-form" ? (
        <div className={`flex gap-3`}>
          <input
            type="checkbox"
            className="h-[25px] aspect-square"
            onChange={onChecked}
            checked={
              typeof defaultValue == "boolean" ? defaultValue : undefined
            }
            disabled={disabled}
          />
          <label className="font-bold">{label}</label>
        </div>
      ) : (
        <div
          className={`flex ${
            type == "filter" ? "gap-5 items-center" : "flex-col"
          }`}
        >
          <label htmlFor={""} className="font-bold">
            {label}
          </label>

          <input
            id={id}
            className={`px-3 border rounded-md h-[40px] w-[240px] ${
              required ? "border-[#DC3545]" : "border"
            }`}
            placeholder={placeholder}
            disabled={disabled}
            list="data"
            name={name}
            defaultValue={
              typeof defaultValue == "string" || typeof defaultValue == "number"
                ? defaultValue
                : undefined
            }
            ref={refObject}
            onChange={
              type == "file"
                ? (e: React.ChangeEvent<HTMLInputElement>) => {
                    if (e.currentTarget.files && setFile) {
                      setFile(e.currentTarget.files[0]);
                    }
                  }
                : onChange
            }
            type={
              type == "file"
                ? "file"
                : type == "date-time"
                ? "datetime-local"
                : type == "number"
                ? "number"
                : ""
            }
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key == "Enter") onEnter();
            }}
            // onKeyDown={handleEnter}
          />

          {type == "filter" ? <Button name="ค้นหา" onClick={onClick} /> : <></>}
        </div>
      )}
    </Fragment>
  );
}
