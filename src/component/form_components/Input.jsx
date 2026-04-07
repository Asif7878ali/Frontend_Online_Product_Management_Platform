import { useEffect, useState } from "react";
import ErrorsMessage from "../resuable_components/Errors";

const Input = ({
  type = "text",
  label,
  placeholder,
  value = "",
  onChange,
  copy = false,
  paste = false,
  name,
  required = false,
  className = "",
  error,
  confirmInputMatch = false,
  matchingVal = "",
  originalInput = "",
  ...props
}) => {
  const [inputMatch, setInputMatch] = useState(true);

  function handleCopy(e) {
    if (copy) {
      e.preventDefault();
    }
  }

  function handlePaste(e) {
    if (paste) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    if (confirmInputMatch) {
      setInputMatch(value === originalInput);
    }
  }, [value, originalInput, confirmInputMatch]);

  return (
    <div className=" relative group flex flex-col gap-1">
      {label && (
        <label htmlFor={name} className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onCopy={handleCopy}
        onPaste={handlePaste}
        placeholder={placeholder}
        required={required}
        autoComplete={type === "password" ? "current-password" : ""}
        className={`w-full px-3 py-2 rounded-md text-black resize-none focus:outline-none focus:ring-2 ${
          error
            ? "border border-red-500 bg-red-50 text-red-700 placeholder-red-400 focus:ring-red-300"
            : "border border-gray-300 text-gray-700 focus:ring-blue-100 focus:border-blue-200"
        } ${className}`}
        {...props}
      />
      <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-300 to-red-400 group-focus-within:w-full transition-all duration-500"></div>
      {confirmInputMatch && value.trim() !== "" && (
        <div
          className={`text-sm mt-2 font-medium ${
            inputMatch ? "text-green-500" : "text-red-500"
          } `}
        >
          <span>
            {inputMatch
              ? `✓ ${matchingVal} Match`
              : `✗ ${matchingVal} do not match`}
          </span>
        </div>
      )}

      {error && <ErrorsMessage error={error} />}
    </div>
  );
};

export default Input;
