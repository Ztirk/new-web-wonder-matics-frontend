interface Props {
  children: React.ReactNode;
}

export default function Thead({ children }: Props) {
  return <thead>{children}</thead>;
}
