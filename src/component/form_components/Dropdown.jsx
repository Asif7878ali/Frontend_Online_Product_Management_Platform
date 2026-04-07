import { useState, useEffect, useRef, useMemo } from "react";
import Icons from "@/utils/Icons";
import ErrorsMessage from "../resuable_components/Errors";

const debounce = (func, delay) => {
  let timeoutId;
  return (...args) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

const Dropdown = ({
  name,
  label,
  options = [],
  defaultValue = "",
  value = "",
  onChange,
  onSelect,
  optionValueKey,
  optionLabelKey,
  className = "",
  classNameInput = "h-10",
  disabled = false,
  placeholder = "Select an option",
  error,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue);
  const [dropdownStyle, setDropdownStyle] = useState({
    position: "bottom",
    width: 200,
  });
  const [searchText, setSearchText] = useState("");
  const dropdownRef = useRef(null);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (value !== undefined) setSelectedValue(value);
  }, [value]);

  const calculatePosition = () => {
    if (triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect();
      const dropdownHeight = 300;
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;
      const newPosition =
        spaceBelow < dropdownHeight && spaceAbove > spaceBelow
          ? "top"
          : "bottom";

      setDropdownStyle({
        position: newPosition,
        width: Math.max(rect.width, 200),
      });
    }
  };

  const debouncedCalculatePosition = debounce(calculatePosition, 100);

  useEffect(() => {
    if (isOpen) {
      calculatePosition();
      window.addEventListener("scroll", debouncedCalculatePosition, true);
      window.addEventListener("resize", debouncedCalculatePosition);
    }

    return () => {
      window.removeEventListener("scroll", debouncedCalculatePosition, true);
      window.removeEventListener("resize", debouncedCalculatePosition);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleToggle = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option) => {
    if (disabled) return;
    const val = option[optionValueKey];
    setSelectedValue(val);
    setIsOpen(false);
    onChange?.({ target: { name, value: val } });
    onSelect?.(option);
  };

  // Filtered options for search
  const filteredOptions = useMemo(() => {
    if (!searchText.trim()) return options;
    return options.filter((opt) =>
      String(opt[optionLabelKey])
        .toLowerCase()
        .includes(searchText.toLowerCase()),
    );
  }, [searchText, options, optionLabelKey]);

  const selectedOption = options.find(
    (opt) => opt[optionValueKey] === selectedValue,
  ) || {
    [optionLabelKey]: placeholder,
  };

  const dropdownOptions = (
    <div
      ref={dropdownRef}
      className={`absolute z-[9999] bg-white border border-gray-300 rounded-lg shadow-2xl transition-all duration-300 ease-out transform ${
        isOpen
          ? "opacity-100 scale-100"
          : "opacity-0 scale-95 pointer-events-none"
      } ${
        dropdownStyle.position === "top"
          ? "bottom-[calc(100%+4px)]"
          : "top-[calc(100%+4px)]"
      }`}
      style={{ width: dropdownStyle.width }}
    >
      <div className="max-h-60 overflow-y-auto py-1">
        {options.length > 10 && (
          <div className="p-2">
            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search..."
              className="w-full border p-2 rounded focus:outline-none"
            />
          </div>
        )}
        {filteredOptions.map((option, index) => (
          <button
            key={option?.id || index}
            type="button"
            onClick={() => handleOptionClick(option)}
            className={`w-full cursor-pointer text-left block px-4 py-3 text-gray-900 hover:text-rose-700 hover:bg-rose-100 transition-all duration-200 transform ${
              isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-2"
            } ${
              selectedValue === option[optionValueKey]
                ? "bg-rose-50 font-medium text-rose-700"
                : ""
            }`}
            style={{ transitionDelay: isOpen ? `${index * 50}ms` : "0ms" }}
          >
            {option[optionLabelKey]}
          </button>
        ))}
      </div>
    </div>
  );

  return (
    <div className="relative w-full">
      {label && (
        <label className="text-sm font-medium text-gray-700 mb-1 block">
          {label}
        </label>
      )}
      <div className="relative">
        <button
          ref={triggerRef}
          type="button"
          onClick={handleToggle}
          disabled={disabled}
          className={`w-full p-3 ${classNameInput} border rounded-lg text-left flex justify-between items-center focus:outline-none transition-all duration-200 
          ${disabled ? "bg-gray-100 cursor-not-allowed opacity-50" : "active:scale-[0.98]"} 
          ${error ? "border-red-500 focus:ring-red-500 bg-red-50/50" : " border-gray-300 text-gray-700 focus:ring-blue-100 focus:border-blue-200"}
          ${isOpen ? "ring-1 ring-rose-500" : ""} ${className}`}
          {...props}
        >
          <span
            className={`${
              error
                ? "text-red-900"
                : selectedValue && selectedValue !== placeholder
                  ? "text-gray-900"
                  : "text-gray-500"
            }`}
          >
            {selectedOption[optionLabelKey]}
          </span>

          <Icons.CheronDown
            className={`w-5 h-5 text-gray-500 transform transition-all duration-300 ${
              isOpen ? "rotate-180 text-gray-500" : ""
            }`}
          />
        </button>
        {isOpen && dropdownOptions}
      </div>
      {error && <ErrorsMessage error={error} />}
    </div>
  );
};

export default Dropdown;
