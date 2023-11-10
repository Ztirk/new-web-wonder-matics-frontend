import { Outlet } from "react-router-dom";
import Headbar from "../components/Layout/Headbar";
import Navbar from "../components/Layout/Navbar";
import MainContent from "../components/Layout/MainContent";

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
