import { useEffect, useState } from "react";
import getSidebarItems from "../../lib/sidebarItems.js";
import Icons from "../../utils/Icons.jsx";
import { SmallModal } from "./Modals.jsx";
import { RedRectangleButton } from "../form-components/Buttons.jsx";
import { notification } from "antd";
import configCenter from "../../lib/config.js";
import endPoint from "../../lib/endpoint.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const SideBar = ({ activeTab, setActiveTab, role }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [modal, setModal] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  //get role-based items
  const items = getSidebarItems(role);

  //  logout
  const handleLogout = async () => {
    try {
      setLoading(true);

      const response = await axios.post(
        `${configCenter.urls.base}${endPoint.logout}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.data?.status) {
        notification.success({
          title: "Success",
          description: response?.data?.message || "Logout Successfully",
        });

        sessionStorage.clear();
        setToken(null);
        navigate("/");
      }
    } catch (error) {
      notification.error({
        title: "Error",
        description: "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  // get token
  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  return (
    <>
      <aside
        className={`h-screen ${isExpanded ? "w-60" : "w-[72px]"} bg-[#FF3E57]
        flex flex-col rounded-r-2xl sticky top-0 z-50
        transition-all duration-300 shadow-2xl`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 h-[72px]">
          <div className="w-9 h-9 rounded-[10px] flex items-center justify-center bg-white text-[#FF3E57]">
            <Icons.Checked className="size-4" />
          </div>

          <div
            className={`transition-all ${
              isExpanded ? "opacity-100" : "opacity-0 w-0"
            }`}
          >
            <span className="text-white font-bold text-sm">ProductMGMT</span>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`h-px bg-white/25 mx-auto mb-3 ${
            isExpanded ? "w-48" : "w-8"
          }`}
        />

        {/* Menu */}
        <ul className="flex-1 px-2 flex flex-col gap-1">
          {items.map((item, index) => {
            const isActive = activeTab === item.key;

            return (
              <li key={index}>
                <div
                  onClick={() => setActiveTab(item.key)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg cursor-pointer transition
                  ${
                    isActive
                      ? "bg-black/20 text-white"
                      : "text-white/80 hover:bg-black/10"
                  }`}
                >
                  {/* Icon */}
                  <div
                    className={`w-6 h-6 flex items-center justify-center rounded-md ${
                      isActive ? "bg-white text-[#FF3E57]" : "bg-white/20"
                    }`}
                  >
                    {isActive && <Icons.Checked className="size-3" />}
                  </div>

                  {/* Text */}
                  <span
                    className={`text-sm ${isExpanded ? "block" : "hidden"}`}
                  >
                    {item.text}
                  </span>
                </div>
              </li>
            );
          })}
        </ul>

        {/* Logout */}
        <div className="px-3 py-3 border-t border-white/20">
          <div
            onClick={() => setModal(true)}
            className="flex items-center gap-2 cursor-pointer text-white hover:bg-black/10 p-2 rounded-lg"
          >
            <Icons.Logout className="size-4" />
            {isExpanded && <span>Logout</span>}
          </div>
        </div>
      </aside>

      {/* Logout Modal */}
      <SmallModal
        title="Logout"
        open={modal}
        handleClose={() => setModal(false)}
      >
        <div className="p-4 text-center">
          <p className="mb-4 text-gray-500 font-semibold">
            Are you sure you want to logout?
          </p>

          <div className="flex justify-end gap-3">
            <RedRectangleButton name="Cancel" onClick={() => setModal(false)} />

            <RedRectangleButton
              name={loading ? "Logging out..." : "Logout"}
              onClick={handleLogout}
              disabled={loading}
            />
          </div>
        </div>
      </SmallModal>
    </>
  );
};

export default SideBar;
