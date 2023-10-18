import { CustomerMasterCodeType } from "../interface/dataType";
import { MasterCode } from "../interface/mastercodeType";

interface Props {
  selectorData: CustomerMasterCodeType;
  label: string;
  defaultValue: string;
  number: number;
  defaultId: string;
  id: string;
  name: string;
}

export default function Selector({
  selectorData,
  label,
  defaultValue,
  number,
  defaultId,
  id,
  name,
}: Props) {
  return (
    <div className="flex flex-col">
      <label className="font-bold">{label}</label>
      <select
        className="pl-3 border border-gray-400 rounded-md h-[40px] w-[240px]"
        id={id}
        name={name}
      >
        <option id={defaultId} selected disabled>
          {defaultValue}
        </option>
        {selectorData && selectorData ? (
          selectorData.response[number].map((data) => (
            <option id={data.code_id.toString()} data-id={data.code_id}>
              {data.value}
            </option>
          ))
        ) : (
          <></>
        )}
      </select>
    </div>
  );
}
