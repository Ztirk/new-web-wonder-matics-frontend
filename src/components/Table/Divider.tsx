interface Props {
  title: string;
}

export default function Divider({ title }: Props) {
  return (
    <div className="flex col-span-2 items-center">
      <div className="h-[1px] opacity-25 bg-[#212529] w-1/12"></div>
      <h1 className={`${title == "" ? "" : "px-5"} whitespace-nowrap`}>
        {title}
      </h1>
      <div className="h-[1px] opacity-25 bg-[#212529] w-full"></div>
    </div>
  );
}
