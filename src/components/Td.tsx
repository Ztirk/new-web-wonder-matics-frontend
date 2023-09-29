import { ChildrenProp } from "../interface/componentType";

export default function Td({ children }: ChildrenProp) {
  return <td className="border border-slate-300 px-3">{children}</td>;
}
