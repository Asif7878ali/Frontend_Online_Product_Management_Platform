import { useEffect, useState } from "react";
import useSearchHook from "../../hooks/useSearchHook";
import axios from "axios";
import configCenter from "../../lib/config";
import endPoint from "../../lib/endpoint";
import TableViewer from "../ui/TableViewer";
import { Column } from "../../lib/tableColumns";
import { Button } from "../form-components/Buttons";
import CreateProductModal from "../page-components/CreateProductModal";
import ViewProductModal from "../page-components/ViewProductModal";
import DeleteProductModal from "../page-components/DeleteProductModal";
import EditProductModal from "../page-components/EditProductModal";

const VendorProductTable = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [modals, setModals] = useState({
    Add: false,
    Delete: false,
    Edit: false,
    View: false,
  });
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

  function viewModalFunc(item) {
    setSelectedProduct(item);
    setModals((pre) => ({
      ...pre,
      View: true,
    }));
  }

  function deleteModalFunc(item) {
    setSelectedProduct(item);
    setModals((pre) => ({
      ...pre,
      Delete: true,
    }));
  }

  function editModalFunc(item) {
    setSelectedProduct(item);
    setModals((pre) => ({
      ...pre,
      Edit: true,
    }));
  }

  useEffect(() => {
    const fetchProducts = async () => {
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

    fetchProducts();
  }, [currentPage, debouncedSearchTerm, activeFilter]);

  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  return (
    <>
      <div id="VendorProductTable" className="w-full flex flex-col gap-5 p-6">
        <TableViewer
          title="Product Inventory"
          isLoading={isLoading}
          tableColumnsConfig={Column?.TableProduct}
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
          // Pass Handler Funtion
          onViewClick={viewModalFunc}
          onDeleteClick={deleteModalFunc}
          onEditClick={editModalFunc}
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

      <ViewProductModal
        openModal={modals.View}
        selectedProduct={selectedProduct}
        onCloseModal={() => {
          setModals((prev) => ({
            ...prev,
            View: false,
          }));
          setSelectedProduct(null);
        }}
      />

      <DeleteProductModal
        openModal={modals.Delete}
        selectedProduct={selectedProduct}
        onCloseModal={() => {
          setModals((prev) => ({
            ...prev,
            Delete: false,
          }));
          setSelectedProduct(null);
        }}
      />

      <EditProductModal
        openModal={modals.Edit}
        selectedProduct={selectedProduct}
        onCloseModal={() => {
          setModals((prev) => ({
            ...prev,
            Edit: false,
          }));
          setSelectedProduct(null);
        }}
      />
    </>
  );
};

export default VendorProductTable;
