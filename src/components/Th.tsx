import { ChildrenProp } from "../interface/componentType";

interface Props extends ChildrenProp {}

export default function Th({ children }: Props) {
  return (
    <th className=" border border-slate-300 " >
      {children}
    </th>
  );
}
