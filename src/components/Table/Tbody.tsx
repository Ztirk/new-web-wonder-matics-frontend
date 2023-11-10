interface Props {
  children: React.ReactNode;
}

export default function Tbody({ children }: Props) {
  return <tbody>{children}</tbody>;
}
