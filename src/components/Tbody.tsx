import { ChildrenProp } from "../interface/componentType";

interface Props extends ChildrenProp {
  id?: string;
}

export default function Tbody({ children, id }: Props) {
  return <tbody id={id}>{children}</tbody>;
}
