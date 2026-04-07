import { useState } from "react";
import Icons from "../../utills/Icons";

const AlertNotification = ({ message, alertType }) => {
  const [isVisible, setIsVisible] = useState(true);

  // Determine the Tailwind classes based on the alert type
  const getAlertClasses = (type) => {
    switch (type) {
      case "success":
        return "bg-green-100 border-green-400 text-green-800";
      case "error":
        return "bg-red-100 border-red-400 text-red-800";
      case "warning":
        return "bg-yellow-100 border-yellow-400 text-yellow-800";
      case "info":
        return "bg-blue-100 border-blue-400 text-blue-800";
      default:
        return "bg-gray-100 border-gray-400 text-gray-800";
    }
  };

  // Get icon based on alert type
  const getAlertIcon = (type) => {
    switch (type) {
      case "success":
        return <Icons.Success className="size-5" />;
      case "error":
        return <Icons.Error className="size-5" />;
      case "warning":
        return <Icons.Warning className="size-5" />;
      case "info":
        return <Icons.Info className="size-5" />;
      default:
        return null;
    }
  };

  const alertClasses = getAlertClasses(alertType);

  if (!isVisible) {
    return null;
  }

  return (
    <div className="absolute w-1/6 top-4 right-4 z-[51]">
      <div
        className={`transform transition-all duration-300 ease-in-out border p-4 rounded ${alertClasses} relative animate-fade-in-down`}
        role="alert"
      >
        <div className="flex items-center">
          <div className="flex-shrink-0">{getAlertIcon(alertType)}</div>
          <div className="ml-3">
            <p className="text-sm">{message}</p>
          </div>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="absolute top-4 right-3 cursor-pointer"
          aria-label="Close"
        >
          <Icons.Cross className="size-5" />
        </button>
      </div>
    </div>
  );
};

export default AlertNotification;
