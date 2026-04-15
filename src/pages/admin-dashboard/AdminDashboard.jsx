import { useState } from "react";
import SideBar from "../../components/ui/Sidebar";
import Navbar from "../../components/ui/Navbar";
import UserTable from "../../components/tables/UserTable";
import ProductTable from "../../components/tables/ProductTable";

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
