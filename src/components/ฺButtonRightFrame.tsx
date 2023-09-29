import { ChildrenProp } from "../interface/componentType";

interface Props extends ChildrenProp {}

export default function ButtonRightFrame({ children }: Props) {
  return <div className="col-span-2 flex gap-5 justify-end">{children}</div>;
}
