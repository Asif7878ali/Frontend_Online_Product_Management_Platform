import { useState } from "react";
import Icons from "../../utills/Icons";
import ErrorsMessage from "../resuable_components/Errors";

const Checkbox = ({
  id = "custom-checkbox",
  label = "Checkbox",
  checked = false,
  onChange,
  disabled = false,
  className = "",
  error,
  ...props
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  function handleChange(e) {
    const newChecked = e.target.checked;
    setIsChecked(newChecked);
    if (onChange) {
      onChange(e);
    }
  }

  return (
    <div>
      <div className={`flex items-center group ${className}`}>
        <div className="relative">
          <input
            id={id}
            type="checkbox"
            checked={isChecked}
            onChange={handleChange}
            disabled={disabled}
            className="sr-only"
            {...props}
          />
          <label
            htmlFor={id}
            className={`
            relative flex items-center justify-center w-5 h-5 rounded-sm border-2 cursor-pointer
            transition-all duration-300 ease-in-out transform
            ${
              disabled
                ? "border-gray-300 bg-gray-100 cursor-not-allowed"
                : isChecked
                  ? "border-red-500 bg-red-500 shadow-md shadow-red-500/25 scale-105"
                  : "border-gray-300 bg-white hover:border-red-400 hover:shadow-sm hover:shadow-red-400/20"
            }
            ${!disabled && "group-hover:scale-105"}
            focus-within:ring-2 focus-within:ring-red-500 focus-within:ring-opacity-50
          `}
          >
            {/* Checkmark */}
            <Icons.Checked
              className={` w-3 h-3 text-white transition-all duration-300 ease-in-out  ${
                isChecked
                  ? "opacity-100 scale-100 rotate-0"
                  : "opacity-0 scale-75 rotate-45"
              }`}
            />
          </label>
        </div>
        {label && (
          <label
            htmlFor={id}
            className={`
            ml-3 text-sm font-medium cursor-pointer transition-colors duration-200
            ${disabled ? "text-gray-400 cursor-not-allowed" : "text-gray-900"}
          `}
          >
            {label}
          </label>
        )}
      </div>
      {error && (
        <ErrorsMessage
          error={error}
          className={"bg-rose-50 mt-1 px-2 py-1 rounded-2xl"}
        />
      )}
    </div>
  );
};

export default Checkbox;
