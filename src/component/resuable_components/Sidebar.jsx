import { useState } from "react";
import { Link } from "react-router-dom";
import SideBarItems from "../../lib/sidebar_items.js";
import Icons from "../../utills/Icons.jsx";
import { SmallModal } from "./Modals.jsx";
import { RedRectangleButton } from "../form_components/Buttons.jsx";

/* ─── Inline SVG icons (no extra dep needed) ─── */
const CheckIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-[18px] h-[18px]"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" />
  </svg>
);

const ChevronDown = ({ open }) => (
  <svg
    viewBox="0 0 24 24"
    className={`w-3 h-3 transition-transform duration-250 ${open ? "rotate-180" : "rotate-0"}`}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const LogoutIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="w-4 h-4"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" />
    <polyline points="16 17 21 12 16 7" />
    <line x1="21" y1="12" x2="9" y2="12" />
  </svg>
);

const SideBar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [clickedItemIndex, setClickedItemIndex] = useState(null);
  const [clickedSubItemIndex, setClickedSubItemIndex] = useState(null);
  const [modal, setModal] = useState(false);

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

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <aside
        className={`h-screen ${isExpanded ? "w-60" : "w-[72px]"} bg-[#1a0a0f]
          flex flex-col pt-0 rounded-r-2xl sticky top-0 z-50
          transition-all duration-350 ease-[cubic-bezier(.4,0,.2,1)]
          border-r border-[rgba(255,62,87,0.15)] shadow-2xl overflow-hidden`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* ── Logo ── */}
        <div className="flex items-center gap-3 px-4 h-[72px] flex-shrink-0">
          {/* Icon mark */}
          <div
            className="w-9 h-9 rounded-[10px] flex items-center justify-center flex-shrink-0
            bg-gradient-to-br from-[#ff3e57] to-[#ff6a7d]
            shadow-[0_4px_14px_rgba(255,62,87,0.45)] text-white"
          >
            <CheckIcon />
          </div>

          {/* Wordmark — slides in on expand */}
          <div
            className={`flex flex-col leading-none transition-all duration-300 overflow-hidden
            ${isExpanded ? "opacity-100 translate-x-0 w-auto" : "opacity-0 -translate-x-2 w-0"}`}
          >
            <span
              className="text-[13px] font-bold text-white tracking-wide whitespace-nowrap"
              style={{ fontFamily: "'Space Grotesk', sans-serif" }}
            >
              ProductMgmt
            </span>
            <span className="text-[10px] font-semibold text-[#ff6a7d] tracking-[0.06em] uppercase mt-0.5 whitespace-nowrap">
              Dashboard
            </span>
          </div>
        </div>

        {/* Divider */}
        <div
          className={`h-px bg-white/[0.07] mx-auto mb-3 flex-shrink-0 transition-all duration-350
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
                      ${
                        isActive
                          ? "bg-[rgba(255,62,87,0.2)]"
                          : "hover:bg-[rgba(255,62,87,0.1)]"
                      }`}
                  >
                    {/* Active bar */}
                    {isActive && (
                      <span
                        className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5
                        bg-[#ff3e57] rounded-r-[3px]"
                      />
                    )}

                    {/* Icon pill */}
                    <div
                      className={`w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0
                      transition-all duration-200
                      ${
                        isActive
                          ? "bg-[rgba(255,62,87,0.3)] text-[#ff6a7d]"
                          : "bg-white/[0.06] text-white/55"
                      }`}
                    >
                      {/* Re-use your existing Icons here, e.g.: */}
                      <Icons.Checked className="w-4 h-4" />
                    </div>

                    {/* Label */}
                    <span
                      className={`flex-1 text-[13px] whitespace-nowrap transition-all duration-280
                      ${isActive ? "text-white font-semibold" : "text-white/70 font-medium"}
                      ${isExpanded ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-1.5"}`}
                    >
                      {item.text}
                    </span>

                    {/* Chevron for sub-items */}
                    {isExpanded && item?.subItems && (
                      <span className="text-white/30 flex-shrink-0">
                        <ChevronDown open={isActive} />
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
                                  ? "text-[#ff6a7d] bg-[rgba(255,62,87,0.1)]"
                                  : "text-white/50 hover:text-white/80 hover:bg-[rgba(255,62,87,0.08)]"
                              }`}
                          >
                            <span
                              className={`absolute left-[26px] top-1/2 -translate-y-1/2 w-[5px] h-[5px]
                              rounded-full transition-colors
                              ${isSubActive ? "bg-[#ff3e57]" : "bg-[rgba(255,62,87,0.4)]"}`}
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
        <div className="flex-shrink-0 px-[10px] py-3 border-t border-white/[0.06]">
          <div
            className="flex items-center gap-[10px] px-[10px] py-[9px] rounded-[10px]
              cursor-pointer transition-all duration-200 hover:bg-[rgba(255,62,87,0.1)]"
            onClick={() => setModal(true)}
          >
            <div
              className="w-9 h-9 rounded-[8px] flex items-center justify-center flex-shrink-0
              bg-[rgba(255,62,87,0.12)] text-[#ff6a7d]"
            >
              <LogoutIcon />
            </div>
            <span
              className={`text-[13px] font-medium text-white/55 whitespace-nowrap
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
              name="Logout"
              className="bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              onClick={() => {
                handleLogout();
                setModal(false);
              }}
            />
          </div>
        </div>
      </SmallModal>
    </>
  );
};

export default SideBar;
