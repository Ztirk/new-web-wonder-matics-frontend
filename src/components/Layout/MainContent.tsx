import React from "react";
import BreadCrumbs from "./BreadCrumbs";

interface Props {
  children: React.ReactNode;
}

export default function MainContent({ children }: Props) {
  return (
    <div className="bg-white h-full overflow-y-scroll overflow-x-hidden">
      <div className="py-8 px-5 grid gap-5">
        <BreadCrumbs />
        {children}
      </div>
    </div>
  );
}
