import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SideBarItems from "../../lib/sidebar_items.js";
import Icons from "../../utills/Icons.jsx";
import { SmallModal } from "./Modals.jsx";
import { RedRectangleButton } from "../form_components/Buttons.jsx";
import { notification } from "antd";
import configCenter from "../../lib/config.js";
import endPoint from "../../lib/endpoint.js";
import axios from "axios";

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [clickedItemIndex, setClickedItemIndex] = useState(null);
  const [clickedSubItemIndex, setClickedSubItemIndex] = useState(null);
  const [modal, setModal] = useState(false);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (index) => {
    setClickedItemIndex(clickedItemIndex === index ? null : index);
    setClickedSubItemIndex(null);
  };

  const handleSubItemMenuClick = (itemIndex, subitemIndex) => {
    setClickedSubItemIndex(
      clickedSubItemIndex === subitemIndex ? null : subitemIndex,
    );
    setClickedItemIndex(itemIndex);
  };

  const handleLogout = async () => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const responce = await axios.post(
        `${configCenter.urls.base}${endPoint.logout}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (responce?.data?.status) {
        notification.success({
          message: "Success",
          description: responce?.data?.message || "Logout Successfully",
        });
        localStorage.clear();
        setToken(null);
        navigate("/");
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Internal Server Error",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  return (
    <>
      <aside
        className={`h-screen ${isExpanded ? "w-60" : "w-[72px]"} bg-[#FF3E57]
          flex flex-col pt-0 rounded-r-2xl sticky top-0 z-50
          transition-all duration-350 ease-[cubic-bezier(.4,0,.2,1)]
          border-r border-[rgba(0,0,0,0.08)] shadow-2xl overflow-hidden`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* ── Logo ── */}
        <div className="flex items-center gap-3 px-4 h-[72px] flex-shrink-0">
          {/* White icon mark — visible on red bg */}
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0
            bg-white shadow-[0_2px_8px_rgba(0,0,0,0.15)] text-[#FF3E57]"
          >
            <Icons.Checked className="size-4 stroke-2" />
          </div>

          {/* Wordmark */}
          <div
            className={`flex flex-col leading-none transition-all duration-300 overflow-hidden
            ${isExpanded ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-2 w-0"}`}
          >
            <span
              className="text-[13px] font-bold text-white tracking-wide whitespace-nowrap"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ProductMGMT
            </span>
            <span className="text-[10px] font-semibold text-white/70 tracking-[0.06em] uppercase mt-0.5 whitespace-nowrap">
              Dashboard
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`h-px bg-white/25 mx-auto mb-3 flex-shrink-0 transition-all duration-350
          ${isExpanded ? "w-48" : "w-8"}`}
        />

        {/* ── Nav items ── */}
        <ul className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar px-[10px] flex flex-col gap-0.5">
          {SideBarItems.map((item, index) => {
            const isActive = clickedItemIndex === index;
            return (
              <li key={index}>
                <Link to={item.link}>
                  <div
                    onClick={() => handleMenuClick(index)}
                    className={`flex items-center gap-[10px] px-[10px] py-[9px] rounded-[10px] cursor-pointer
                      relative transition-all duration-200
                      ${isActive ? "bg-[rgba(0,0,0,0.18)]" : "hover:bg-[rgba(0,0,0,0.1)]"}`}
                  >
                    {/* Active bar */}
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5
                        bg-white rounded-r-[3px]"
                      />
                    )}

                    {/* Icon pill */}
                    <div
                      className={`size-5 rounded-[8px] flex items-center justify-center flex-shrink-0 transition-all duration-200 ${isActive ? "bg-white text-[#FF3E57]" : "bg-white/20 text-white"}`}
                    >
                      {isActive && <Icons.Checked className="size-3" />}
                    </div>

                    {/* Label */}
                    <span
                      className={`flex-1 text-[13px] whitespace-nowrap transition-all duration-280
                      ${isActive ? "text-white font-semibold" : "text-white/85 font-medium"}
                      ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1.5"}`}
                    >
                      {item.text}
                    </span>

                    {/* Chevron for sub-items */}
                    {isExpanded && item?.subItems && (
                      <span className="text-white/60 flex-shrink-0">
                        <Icons.CheronDown
                          className={`w-3 h-3 transition-transform duration-250
                          ${isActive ? "rotate-180" : "rotate-0"}`}
                        />
                      </span>
                    )}
                  </div>
                </Link>

                {/* ── Sub-items ── */}
                {isExpanded && isActive && item?.subItems && (
                  <ul className="pl-0 mt-0.5 flex flex-col gap-0.5">
                    {item.subItems.map((subitem, subindex) => {
                      const isSubActive = clickedSubItemIndex === subindex;
                      return (
                        <li key={subindex}>
                          <Link
                            to={subitem.link}
                            onClick={() =>
                              handleSubItemMenuClick(index, subindex)
                            }
                            className={`flex items-center gap-2 pl-[46px] pr-3 py-[7px] rounded-[8px]
                              text-[12px] font-medium relative transition-all duration-150 cursor-pointer
                              ${
                                isSubActive
                                  ? "text-white bg-[rgba(0,0,0,0.15)] font-semibold"
                                  : "text-white/70 hover:text-white hover:bg-[rgba(0,0,0,0.08)]"
                              }`}
                          >
                            <span
                              className={`absolute left-[26px] top-1/2 -translate-y-1/2 w-[5px] h-[5px]
                              rounded-full transition-colors
                              ${isSubActive ? "bg-white" : "bg-white/40"}`}
                            />
                            {subitem.text}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                )}
              </li>
            );
          })}
        </ul>

        {/* ── Logout ── */}
        <div className="flex-shrink-0 px-[10px] py-3 border-t border-white/20">
          <div
            className="flex items-center gap-[10px] px-[10px] py-[9px] rounded-[10px]
              cursor-pointer transition-all duration-200 hover:bg-[rgba(0,0,0,0.1)]"
            onClick={() => setModal(true)}
          >
            <div
              className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0
              bg-white/20 text-white"
            >
              <Icons.Logout className="size-4" />
            </div>
            <span
              className={`text-[13px] font-medium text-white/80 whitespace-nowrap
              transition-all duration-280
              ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1.5"}`}
            >
              Logout
            </span>
          </div>
        </div>
      </aside>

      {/* ── Logout modal ── */}
      <SmallModal
        title="Logout"
        open={modal}
        handleClose={() => setModal(false)}
      >
        <div className="p-4 text-center">
          <p className="mb-4 text-gray-500 font-semibold text-lg">
            Are you sure you want to logout?
          </p>
          <div className="flex justify-end gap-4">
            <RedRectangleButton
              name="Cancel"
              className="bg-red-100 text-red-500 rounded-lg hover:bg-gray-100 transition"
              onClick={() => setModal(false)}
            />
            <RedRectangleButton
              name={loading ? "Logging out..." : "Logout"}
              disabled={loading}
              className={` ${
                loading
                  ? "opacity-50 cursor-not-allowed"
                  : "bg-red-500 hover:bg-red-600 text-white rounded-lg transition"
              }`}
              onClick={handleLogout}
            />
          </div>
        </div>
      </SmallModal>
    </>
  );
};

export default SideBar;
