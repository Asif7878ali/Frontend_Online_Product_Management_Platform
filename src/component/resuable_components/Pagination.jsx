import Icons from "../../utills/Icons";

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  return (
    <div className="flex items-center space-x-2">
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icons.CheronLeft className="w-5 h-5" />
      </button>

      <span className="px-3 py-1 bg-gray-200 rounded-md font-medium">
        {currentPage}
      </span>
      <span className="px-2">of {totalPages}</span>

      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="p-2 rounded-md hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <Icons.CheronRight className="w-5 h-5" />
      </button>

      <div className="relative inline-block ml-2">
        <select
          value={currentPage}
          name="paginate"
          onChange={(e) => onPageChange(Number(e.target.value))}
          className="appearance-none bg-white border border-gray-300 text-gray-700 py-2 pl-3 pr-8 rounded-lg leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
        >
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(
            (pageNumber) => (
              <option key={pageNumber} value={pageNumber}>
                Page {pageNumber}
              </option>
            ),
          )}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <Icons.CheronDown className="w-4 h-4" />
        </div>
      </div>
    </div>
  );
};

export default Pagination;
