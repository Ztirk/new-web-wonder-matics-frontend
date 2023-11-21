interface Props {
  children: React.ReactNode;
  refObject?: React.RefObject<HTMLTableSectionElement>;
}

export default function Tbody({ children, refObject }: Props) {
  return <tbody ref={refObject}>{children}</tbody>;
}
