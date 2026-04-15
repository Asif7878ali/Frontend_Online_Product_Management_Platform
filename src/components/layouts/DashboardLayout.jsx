import { Outlet } from "react-router-dom";
import SideBar from "../ui/Sidebar";
import Navbar from "../ui/Navbar";

const DashboardLayout = () => {
  return (
    <div className="flex flex-row h-[100vh]">
      <SideBar />
      <div className="flex flex-col w-full">
        <Navbar />
        <div id="outlet" className="h-full overflow-y-scroll">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
