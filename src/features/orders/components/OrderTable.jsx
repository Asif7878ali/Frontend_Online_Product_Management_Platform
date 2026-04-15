import { useEffect, useState } from "react";
import useSearchHook from "../../hooks/useSearchHook";
import axios from "axios";
import configCenter from "../../lib/config";
import endPoint from "../../lib/endpoint";
import TableViewer from "../ui/TableViewer";
import { Column } from "../../lib/tableColumns";

const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const { searchTerm, debouncedSearchTerm, handleSearchChange } =
    useSearchHook();

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsloading(true);
        const token = sessionStorage.getItem("token");
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get(
          `${configCenter.urls.base}${endPoint.get_orders}`,
          {
            params: {
              page: currentPage,
              search: debouncedSearchTerm,
            },
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (response.data?.status) {
          setOrders(response.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };

    fetchOrders();
  }, [currentPage, debouncedSearchTerm]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);
  return (
    <div id="OrderTablePage" className="w-full flex flex-col gap-5 p-6">
      <TableViewer
        title="Order Inventory"
        isLoading={isLoading}
        tableColumnsConfig={Column?.TableOrder}
        tableData={orders?.data || []}
        currentPage={currentPage}
        itemsPerPage={8}
        //Pagination
        totalItems={orders?.totalItems || 1}
        totalPages={orders?.totalPages || 1}
        onPageChange={handlePageChange}
        //Search
        searchTerm={searchTerm}
        onSearchChange={handleSearchChange}
      />
    </div>
  );
};

export default OrderTable;
