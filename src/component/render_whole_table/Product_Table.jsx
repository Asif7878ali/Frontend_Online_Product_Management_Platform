import { useEffect, useState } from "react";
import useSearchHook from "../../hooks/useSearchHook";
import axios from "axios";
import { Column } from "../../lib/table_colunm";
import configCenter from "../../lib/config";
import endPoint from "../../lib/endpoint";
import TableViewer from "../resuable_components/TableViewer";

const ProductTable = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeFilter, setActiveFilter] = useState("All");
  const { searchTerm, debouncedSearchTerm, handleSearchChange } =
    useSearchHook();

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  function handleFilterChange(filter) {
    setActiveFilter(filter);
    setCurrentPage(1);
  }

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setIsloading(true);
        const token = sessionStorage.getItem("token");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get(
          `${configCenter.urls.base}${endPoint.get_products}`,
          {
            params: {
              page: currentPage,
              search: debouncedSearchTerm,
              filter: activeFilter,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data?.status) {
          setProducts(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };

    fetchUsers();
  }, [currentPage, debouncedSearchTerm, activeFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);
  return (
    <div id="ProductTable" className="w-full flex flex-col gap-5 p-6">
      <TableViewer
        title="Product List"
        isLoading={isLoading}
        tableColumnsConfig={Column?.admin_table_product}
        tableData={products?.data || []}
        currentPage={currentPage}
        itemsPerPage={8}
        //Pagination
        totalItems={products?.totalItems || 1}
        totalPages={products?.totalPages || 1}
        onPageChange={handlePageChange}
        //Search
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
        // filter options
        filterOptions={["All", "Electronics", "Fashion"]}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />
    </div>
  );
};

export default ProductTable;
