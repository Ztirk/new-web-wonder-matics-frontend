import { ChildrenProp } from "../interface/componentType";

interface Props extends ChildrenProp {
  id?: string;
}

export default function Thead({ children, id }: Props) {
  return <thead id={id}>{children}</thead>;
}
