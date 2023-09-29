import { ChildrenProp } from "../interface/componentType";

interface Props extends ChildrenProp {}

export default function InputNAddNewFrame({ children }: Props) {
  return <div className="flex justify-end">{children}</div>;
}
