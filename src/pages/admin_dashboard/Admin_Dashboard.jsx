import { useState } from "react";
import SideBar from "../../component/resuable_components/Sidebar";
import Navbar from "../../component/resuable_components/Navbar";
import UserTable from "../../component/render_whole_table/User_Table";
import ProductTable from "../../component/render_whole_table/Product_Table";

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("users");
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div id="AdminDashboardPage" className="flex flex-row h-screen">
      <SideBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role={user?.role}
      />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="h-full overflow-y-scroll">
          {activeTab === "users" && <UserTable />}
          {activeTab === "products" && <ProductTable />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
