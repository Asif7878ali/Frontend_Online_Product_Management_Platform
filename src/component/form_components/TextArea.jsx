import ErrorsMessage from "../resuable_components/Errors";

const TextArea = ({
  label,
  value,
  name,
  onChange,
  maxlength,
  rows = 5,
  classNameInput = "",
  error,
}) => {
  return (
    <>
      <textarea
        placeholder={label}
        value={value}
        name={name}
        rows={rows}
        maxLength={maxlength}
        onChange={onChange}
        className={`w-full px-3 py-2 rounded-md text-black resize-none focus:outline-none focus:ring-2
  ${
    error
      ? "border border-red-500 bg-red-50 text-red-700 placeholder-red-400 focus:ring-red-300 focus:border-red-500"
      : "border border-gray-300 text-gray-700 focus:ring-blue-100 focus:border-blue-200"
  } ${classNameInput}`}
      />

      <div className="flex justify-between mt-1 text-sm">
        <div className="text-start text-red-500">
          {error ? (
            <ErrorsMessage classNameInput="text-start" error={error} />
          ) : (
            <span className="invisible">placeholder</span>
          )}
        </div>
        <div className="text-end text-gray-500">
          {value?.trim() === "" ? 0 : value?.length}
          {maxlength > 0 && ` / ${maxlength}`}
        </div>
      </div>
    </>
  );
};

export default TextArea;
