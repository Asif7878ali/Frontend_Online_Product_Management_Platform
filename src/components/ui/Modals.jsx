import Icons from "../../utils/Icons";

export function SmallModal({ open, handleClose, children, title }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[102] flex items-center justify-center animated faster fadeIn">
          {/* Background Overlay with Higher z-index */}
          <div
            className="absolute inset-0 bg-gray-500 opacity-75 z-[101]"
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                handleClose();
              }
            }}
            tabIndex="0"
            role="button"
            aria-label="Close"
          ></div>
          {/* Modal Content */}
          <div className="relative bg-white rounded-2xl shadow-xl z-[102] p-0 max-h-[86vh] h-auto w-[90%] md:w-[60%] mdx:w-[50%] lg:w-[45%] xl:w-[40%] 2xl:w-[35%] 3xl:w-[30%] 4xl:w-[25%]">
            {/* Header Section */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h3 className="text-xl mb-0 font-semibold text-gray-900 capitalize">
                {title}
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <Icons.Cross className="size-6" />
              </button>
            </div>
            {/* Content Section */}
            <div className="px-0 pb-4 m-2 max-h-[72vh] overflow-y-auto no-scrollbar">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function MediumModal({ open, handleClose, children, title }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[102] flex items-center justify-center animated faster fadeIn">
          {/* Background Overlay with Higher z-index */}
          <div
            className="absolute inset-0 bg-gray-500 opacity-75 z-[101]"
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                handleClose();
              }
            }}
            tabIndex="0"
            role="button"
            aria-label="Close"
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl z-[102] p-0 max-h-[86vh] h-auto w-[90%] md:w-[80%] mdx:w-[70%] lg:w-[50%] xl:w-[45%] 2xl:w-[40%] 3xl:w-[35%] 4xl:w-[30%] 5xl:w-[25%] 6xl:w-[20%]">
            {/* Header Section */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h3 className="text-xl mb-0 font-semibold text-gray-900">
                {title}
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <Icons.Cross className="size-6" />
              </button>
            </div>

            {/* Content Section */}
            <div className="px-2 pb-4 m-2 max-h-[72vh] overflow-y-auto no-scrollbar">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export function LargeModal({ open, handleClose, children, title }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center animated faster fadeIn">
          {/* Background Overlay with Higher z-index */}
          <div
            className="absolute inset-0 bg-gray-500 opacity-75 z-[101]"
            onClick={handleClose}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === "Escape") {
                handleClose();
              }
            }}
            tabIndex="0"
            role="button"
            aria-label="Close"
          ></div>

          {/* Modal Content */}
          <div className="relative bg-white rounded-lg shadow-xl z-[102] p-0 max-h-[86vh] h-auto w-[90%] md:w-[80%] mdx:w-[75%] lg:w-[70%] xl:w-[65%] 2xl:w-[60%] 3xl:w-[55%] 4xl:-[w-50%] 5xl:-[w-[48%]">
            {/* Header Section */}
            <div className="flex items-center justify-between border-b border-gray-200 px-4 py-3">
              <h3 className="text-xl mb-0 font-semibold text-gray-900 capitalize">
                {title}
              </h3>
              <button
                onClick={handleClose}
                className="text-gray-400 hover:text-gray-500 transition-colors p-1 rounded-full hover:bg-gray-100"
              >
                <Icons.Cross className="size-6" />
              </button>
            </div>

            {/* Content Section */}
            <div className="px-2 pb-4 m-2 max-h-[72vh] overflow-y-auto no-scrollbar">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
