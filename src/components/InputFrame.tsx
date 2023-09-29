import { ReactNode } from "react";

interface Props {
  children: ReactNode;
  sendForm: () => void;
  id: string;
}

export default function InputFrame({ children, sendForm, id }: Props) {
  return (
    <form
      className="flex flex-wrap gap-x-10 gap-y-5 col-span-2"
      onSubmit={sendForm}
      id={id}
    >
      {children}
    </form>
  );
}
