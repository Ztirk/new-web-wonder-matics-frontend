import { ChildrenProp } from "../interface/componentType";

export default function Td({ children }: ChildrenProp) {
  return <td className=" px-3">{children}</td>;
}
