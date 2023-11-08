import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function InputFrame({ children }: Props) {
  return (
    <div className="flex flex-wrap gap-x-10 gap-y-5 col-span-2">{children}</div>
  );
}
