import { useEffect, useRef, useState } from "react";
import Icons from "../../utills/Icons";
import ErrorsMessage from "../resuable_components/Errors";
import Tooltip from "./Tooltip";

const Password = ({
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
  tooltip = false,
  hints = false,
  confirmPassMatch = false,
  originalPass = "",
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);
  const [showTooltip, setShowTooltip] = useState(false);
  const tooltipButtonRef = useRef(null);
  const [strength, setStrength] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });

  function toggleVisibility() {
    setIsVisible((prev) => !prev);
  }

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

  function getStrengthLevel() {
    const count = Object.values(strength).filter(Boolean).length;
    if (count <= 2) {
      return "weak";
    } else if (count <= 4) {
      return "medium";
    } else {
      return "strong";
    }
  }

  const strengthLevel = getStrengthLevel();

  useEffect(() => {
    if (hints && typeof value === "string") {
      setStrength({
        length: value.length >= 6,
        uppercase: /[A-Z]/.test(value),
        lowercase: /[a-z]/.test(value),
        number: /\d/.test(value),
        special: /[!@#$%^&*(),.?":{}|<>]/.test(value),
      });
    }
  }, [value, hints]);

  useEffect(() => {
    if (confirmPassMatch) {
      setPasswordMatch(value === originalPass);
    }
  }, [value, originalPass, confirmPassMatch]);

  return (
    <div className="flex flex-col gap-1">
      {label && (
        <div className="flex justify-between items-center mb-1">
          <label htmlFor={name} className="text-sm font-medium text-gray-700">
            {label} {required && <span className="text-red-500">*</span>}
          </label>

          {tooltip && (
            <div className="relative mt-1">
              <button
                type="button"
                ref={tooltipButtonRef}
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                className="text-gray-500 hover:text-gray-700"
                aria-label="Password requirements info"
              >
                <Icons.InfoIcon className="size-5" />
              </button>
              <Tooltip targetRef={tooltipButtonRef} visible={showTooltip}>
                <div className="absolute left-0 mt-2 p-3 bg-gradient-to-br from-rose-100 via-white to-rose-100  rounded-lg shadow-lg border border-gray-200 z-[9999] w-64 animate-fade-in">
                  <p className="text-sm text-gray-600 mb-2">
                    Password must contain:
                  </p>
                  <ul className="text-xs space-y-1">
                    <li>- At least 6 characters</li>
                    <li>- One uppercase letter</li>
                    <li>- One lowercase letter</li>
                    <li>- One number</li>
                    <li>- One special character</li>
                  </ul>
                </div>
              </Tooltip>
            </div>
          )}
        </div>
      )}
      <div className="relative group">
        <input
          type={isVisible ? "text" : "password"}
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          onCopy={handleCopy}
          onPaste={handlePaste}
          placeholder={placeholder}
          required={required}
          autoComplete="current-password"
          className={`w-full h-10 px-4 py-2 rounded-md border transition-all duration-200  focus:outline-none focus:ring-1 pr-10
            ${
              error
                ? "border border-red-500 bg-red-50 text-red-700 placeholder-red-400 focus:ring-red-300"
                : "border border-gray-300 text-gray-700 focus:ring-blue-100 focus:border-blue-200"
            } ${className}`}
          {...props}
        />
        <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-red-300 to-red-400 group-focus-within:w-full transition-all duration-500"></div>
        <button
          type="button"
          onClick={toggleVisibility}
          className="absolute top-3 right-3 flex items-center text-gray-500 hover:text-gray-700"
          aria-label={isVisible ? "Hide password" : "Show password"}
        >
          {isVisible ? <Icons.Eye /> : <Icons.EyeSlash />}
        </button>

        {hints && value.trim() !== "" && (
          <div className="space-y-2 mt-4">
            {/* Strength line */}
            <div className="h-1 w-full rounded-full overflow-hidden bg-gray-200">
              <div
                className={`h-full transition-all duration-300 ${
                  strengthLevel === "weak"
                    ? "w-1/12 bg-red-500"
                    : strengthLevel === "medium"
                      ? "w-2/3 bg-yellow-500"
                      : "w-full bg-green-500 animate-pulse-glow"
                }`}
              ></div>
            </div>

            {/* Criteria list */}
            <ul className="text-sm font-medium flex gap-2 flex-wrap mt-2">
              {[
                { label: "Length (min. 6 characters)", valid: strength.length },
                { label: "Uppercase", valid: strength.uppercase },
                { label: "Lowercase", valid: strength.lowercase },
                { label: "Number", valid: strength.number },
                { label: "Special character", valid: strength.special },
              ].map((item, index) => (
                <li
                  key={item.label || index}
                  className={`items-center space-x-2 ${
                    item.valid ? "text-green-600" : "text-red-600"
                  }`}
                >
                  <span>{item.valid ? "✓" : "✗"}</span>
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {confirmPassMatch && value.trim() !== "" && (
          <div
            className={`text-sm mt-2 font-medium ${
              passwordMatch ? "text-green-500" : "text-red-500"
            } `}
          >
            <span>
              {passwordMatch ? "✓ Password Match" : "✗ Password do not match"}
            </span>
          </div>
        )}

        {error && <ErrorsMessage error={error} />}
      </div>
    </div>
  );
};

export default Password;
