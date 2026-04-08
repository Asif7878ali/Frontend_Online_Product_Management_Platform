import { useState, useEffect } from "react";
import CreateProductModal from "../../component/pages_related_component/CreateProductModal";
import { Button } from "../../component/form_components/Buttons";
import TableViewer from "../../component/resuable_components/TableViewer";
import { Column } from "../../lib/table_colunm";
import configCenter from "../../lib/config";
import endPoint from "../../lib/endpoint";
import axios from "axios";
import useSearchHook from "../../hooks/useSearchHook";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [modals, setModals] = useState({
    Add: false,
    Delete: false,
    Edit: false,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsloading] = useState(false);
  const { searchTerm, debouncedSearchTerm, handleSearchChange } =
    useSearchHook();

  function handlePageChange(page) {
    setCurrentPage(page);
  }

  useEffect(() => {
    const fetchProducts = async (page = 1) => {
      try {
        setIsloading(true);

        const responce = await axios.get(
          `${configCenter.urls.base}${endPoint.get_products}?page=${page}`,
        );

        console.log(responce.data);
        if (responce.data?.status) {
          setProducts(responce.data);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="w-full flex flex-col gap-5 p-6">
        <TableViewer
          title="Product Inventory"
          isLoading={isLoading}
          tableColumnsConfig={Column?.table_product}
          Btn={
            <Button
              variant="outline"
              className="text-red-500"
              onClick={() => {
                setModals((pre) => ({
                  ...pre,
                  Add: true,
                }));
              }}
            >
              + Add
            </Button>
          }
          tableData={products?.data || []}
          totalItems={products?.totalItems || 1}
          totalPages={products?.totalPages || 1}
          currentPage={currentPage}
          itemsPerPage={5}
          searchTerm={searchTerm}
          onPageChange={handlePageChange}
          // onFilterChange={handleFilterChange}
          onSearchChange={handleSearchChange}
        />
      </div>

      <CreateProductModal
        openModal={modals.Add}
        onCloseModal={() => {
          setModals((prev) => ({
            ...prev,
            Add: false,
          }));
        }}
      />
    </>
  );
};

export default Dashboard;
