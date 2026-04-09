import { useState, useEffect } from "react";
import CreateProductModal from "../../component/pages_related_component/CreateProductModal";
import { Button } from "../../component/form_components/Buttons";
import TableViewer from "../../component/resuable_components/TableViewer";
import { Column } from "../../lib/table_colunm";
import configCenter from "../../lib/config";
import endPoint from "../../lib/endpoint";
import axios from "axios";
import useSearchHook from "../../hooks/useSearchHook";
import ViewProductModal from "../../component/pages_related_component/ViewProductModal";
import DeleteProductModal from "../../component/pages_related_component/DeleteProductModal";
import EditProductModal from "../../component/pages_related_component/EditProductModal";

const Dashboard = () => {
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

  function handleDeleteSuccess(id) {
    setProducts((prev) => ({
      ...prev,
      data: prev.data.filter((item) => item.id !== id),
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
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const response = await axios.get(
          `${configCenter.urls.base}${endPoint.get_products}`,
          {
            params: {
              page: currentPage,
              search: debouncedSearchTerm,
              filter: activeFilter,
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
        onDeleteSuccess={handleDeleteSuccess}
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

export default Dashboard;
