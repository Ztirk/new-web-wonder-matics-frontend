import { ChildrenProp } from "../interface/componentType";

interface Props extends ChildrenProp {}

export default function Table({ children }: Props) {
  return (
    <>
      <table className="col-span-2 table-auto border-collapse w-full ">
        {children}
      </table>
    </>
  );
}
