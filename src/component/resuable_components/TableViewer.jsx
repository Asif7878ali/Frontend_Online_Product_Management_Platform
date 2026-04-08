import renderTableBody from "../../utills/render_table_body.jsx";
import Icons from "../../utills/Icons.jsx";
import Pagination from "./Pagination.jsx";
import { TableSkeleton } from "./TableSkeleton.jsx";

const TableViewer = ({
  // Core Data & Config
  title = "List",
  isLoading = false,
  tableData = [],
  tableColumnsConfig, // Expects an object like  key: 'user', columns: [...]
  Btn,
  // Server-Side State
  totalItems = 0,
  totalPages = 0,
  currentPage = 1,
  itemsPerPage = 8,
  // Interactive State
  filterOptions = [],
  activeFilter = "All",
  searchTerm = "",
  dateRange = { startDate: "", endDate: "" },
  //  Callbacks for Parent
  onPageChange,
  onFilterChange,
  onSearchChange,
  onDateChange,
  //  UI Control
  placeholder = "Search",
  showDateFilters = false,
  showDateFiltersDouble = false,
}) => {
  // Validate the main configuration prop
  if (
    !tableColumnsConfig ||
    !tableColumnsConfig.key ||
    !Array.isArray(tableColumnsConfig.columns)
  ) {
    return (
      <p className="p-4 text-center text-red-500">
        Invalid 'tableColumnsConfig' prop provided.
      </p>
    );
  }

  const { key, columns } = tableColumnsConfig;

  const FilterButton = ({ label }) => (
    <button
      onClick={() => onFilterChange(label)}
      className={`px-4 py-2 text-sm font-medium rounded-md transition-colors capitalize duration-200 ${
        activeFilter === label
          ? "bg-red-500 text-white"
          : "bg-gray-200 text-gray-600 hover:bg-gray-300"
      }`}
    >
      {label}
    </button>
  );

  return (
    <div id="TableViewer" className="bg-white rounded-xl shadow-box p-6">
      {/* Header: Remains visible during loading */}
      <div className="w-full flex flex-col md:flex-row items-center justify-between gap-4 mb-6">
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
          <h2 className="text-lg font-semibold text-brand-text self-start sm:self-center">
            {title}
          </h2>
          {filterOptions.length > 0 && (
            <div className="flex items-center flex-wrap gap-2">
              {filterOptions.map((option, index) => (
                <FilterButton key={index} label={option} />
              ))}
            </div>
          )}
        </div>
        <div className="w-full md:w-auto flex flex-col sm:flex-row items-center gap-4">
          {showDateFilters && (
            <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white w-56">
              <span className="px-3 py-2 text-sm text-gray-600 bg-gray-50 border-r border-gray-300 whitespace-nowrap">
                Date
              </span>
              <input
                type="date"
                name="startdate"
                value={dateRange.startDate}
                onChange={(e) => onDateChange("startDate", e.target.value)}
                className="w-full px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none cursor-pointer"
              />
            </div>
          )}
          {showDateFiltersDouble && (
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white w-56">
                <span className="px-3 py-2 text-sm text-gray-600 bg-gray-50 border-r border-gray-300 whitespace-nowrap">
                  Start Date
                </span>
                <input
                  type="date"
                  name="startdate"
                  value={dateRange.startDate}
                  onChange={(e) => onDateChange("startDate", e.target.value)}
                  className="w-full px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none cursor-pointer"
                />
              </div>

              <div className="flex items-center border border-gray-300 rounded-md overflow-hidden bg-white w-56">
                <span className="px-3 py-2 text-sm text-gray-600 bg-gray-50 border-r border-gray-300 whitespace-nowrap">
                  End Date
                </span>
                <input
                  type="date"
                  name="endtdate"
                  value={dateRange.endDate}
                  onChange={(e) => onDateChange("endDate", e.target.value)}
                  className="w-full px-3 py-2 text-sm text-gray-700 bg-white focus:outline-none cursor-pointer"
                />
              </div>
            </div>
          )}
          <div className="relative w-full sm:w-64">
            <input
              type="text"
              name="search"
              placeholder={placeholder}
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 pr-4 py-2 border rounded-lg w-full focus:ring-brand-red focus:border-brand-red"
            />
            <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 size-5 text-gray-400" />
          </div>
          {Btn && Btn}
        </div>
      </div>

      {/* Table Clomun and data */}
      <div className="overflow-x-auto relative min-h-[400px]">
        {isLoading ? (
          <div className="absolute inset-0 bg-white bg-opacity-75 z-10">
            <TableSkeleton />
          </div>
        ) : (
          <table className="w-full text-sm text-left text-brand-subtext">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                {columns.map((col, index) => (
                  <th key={index} className="px-6 py-3 text-xs">
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.length === 0 ? (
                <tr>
                  <td colSpan={columns.length}>
                    <div className="h-[40vh] flex justify-center items-center w-full">
                      <p className="py-4 px-6 rounded-2xl border border-neutral-200 text-gray-800">
                        No Data Available.
                      </p>
                    </div>
                  </td>
                </tr>
              ) : (
                tableData.map((item, index) => (
                  <tr
                    key={item.id || index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    {renderTableBody({ key, item })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-4 text-sm text-gray-500">
        <div>
          Showing{" "}
          {totalItems > 0
            ? Math.min((currentPage - 1) * itemsPerPage + 1, totalItems)
            : 0}{" "}
          to {Math.min(currentPage * itemsPerPage, totalItems)} of {totalItems}{" "}
          entries
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default TableViewer;
