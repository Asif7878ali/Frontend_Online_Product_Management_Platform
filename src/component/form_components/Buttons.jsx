import Icons from "../../utills/Icons";

export const Button = ({
  variant = "primary",
  children,
  className = "",
  ...props
}) => {
  const baseStyles =
    "px-4 py-2 rounded-lg font-medium transition duration-200 ease-in-out transform active:scale-95 cursor-pointer";

  const variants = {
    primary: "bg-rose-600 text-white hover:bg-rose-700 hover:shadow-lg",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 hover:shadow-lg",
    outline: "border border-rose-500 text-gray-600 hover:shadow-md",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export const BlurButton = ({ name = "", className = "", onClick }) => {
  return (
    <button
      className={`absolute text-white font-medium border-2 border-white 
             backdrop-blur-xs bg-white/10 px-6 py-2 rounded-xl cursor-pointer
             hover:scale-105 hover:bg-white/20 transition-all duration-300 ease-in-out
             shadow-lg hover:shadow-2xl animate-fade-in ${className}`}
      onClick={onClick}
    >
      {name}
    </button>
  );
};

export const NavigationButton = ({
  onClick,
  direction = "left", // "left" or "right"
  className = "",
  disabled = false,
}) => {
  const positionClass = direction === "left" ? "left-4" : "right-4";
  const IconComponent =
    direction === "left" ? Icons.CheronLeft : Icons.CheronRight;

  return (
    <button
      onClick={disabled ? undefined : onClick}
      className={`absolute z-10 p-3 rounded-full transition-all duration-200
        ${positionClass}
        ${
          disabled
            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
            : "bg-white hover:bg-gray-50 text-black hover:scale-110 cursor-pointer"
        }
        ${className}
      `}
      disabled={disabled}
    >
      <IconComponent className="size-5" />
    </button>
  );
};

export function RedRectangleButton({
  name,
  onClick,
  className = "",
  disable = false,
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disable}
      className={`mt-2 min-h-[40px] min-w-[130px] max-h-[58px] 
        rounded-md border border-rose-500 font-normal transition duration-300 ease-in-out
        ${
          disable
            ? "cursor-not-allowed opacity-60 bg-gray-300 text-gray-600 border-gray-400"
            : "cursor-pointer hover:bg-gray-50"
        } 
        ${className}`}
    >
      {name}
    </button>
  );
}
