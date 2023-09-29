import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function ButtonLeftFrame({ children }: Props) {
  return <div className="col-span-2 flex gap-5">{children}</div>;

}