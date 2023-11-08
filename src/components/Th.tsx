interface Props {
  children: React.ReactNode;
}

export default function Th({ children }: Props) {
  return <th className="px-3 text-left ">{children}</th>;
}
