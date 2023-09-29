import { Outlet } from "react-router-dom";
import Headbar from "../components/Headbar";
import Navbar from "../components/Navbar";
import MainContent from "../components/MainContent";

export default function Frame() {
  return (
    <div className="h-screen grid grid-cols-[auto_1fr] grid-rows-[auto_1fr] bg-[#E5E5E5] gap-[14px] overflow-hidden">
      <Headbar />
      <Navbar />
      <MainContent>
        <Outlet />
      </MainContent>
    </div>
  );
}
