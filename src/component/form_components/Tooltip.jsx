import { createPortal } from "react-dom";

const Tooltip = ({ children, targetRef, visible }) => {
  if (!visible || !targetRef.current) {
    return null;
  }

  const rect = targetRef.current.getBoundingClientRect();

  return createPortal(
    <div
      style={{
        position: "fixed",
        top: rect.bottom + 8, // Show tooltip below the button
        left: rect.left,
        zIndex: 9999,
      }}
    >
      {children}
    </div>,
    document.body,
  );
};

export default Tooltip;
