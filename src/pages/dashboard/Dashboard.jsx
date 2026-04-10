import { useState } from "react";
import SideBar from "../../component/resuable_components/Sidebar";
import Navbar from "../../component/resuable_components/Navbar";
import VendorProductTable from "../../component/render_whole_table/Vendor_Product_Table";
import OrderTable from "../../component/render_whole_table/Order_Table";

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("products_vendor");
  const userString = sessionStorage.getItem("user");
  const user = userString ? JSON.parse(userString) : null;

  return (
    <div id="DashboardPage" className="flex flex-row h-screen">
      <SideBar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        role={user?.role}
      />
      <div className="flex flex-col w-full">
        <Navbar />
        <div className="h-full overflow-y-scroll">
          {activeTab === "products_vendor" && <VendorProductTable />}
          {activeTab === "orders" && <OrderTable />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
