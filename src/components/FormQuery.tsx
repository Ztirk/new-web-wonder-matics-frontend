import { Form } from "react-router-dom";

interface Props {
  children: React.ReactNode;
  path: string;
}

export default function FormQuery({ children, path }: Props) {
  return (
    <Form className="col-span-2 grid gap-5" action={path}>
      {children}
    </Form>
  );
}
