import { useState, useEffect } from "react";
import { Table, Tag, Space, notification } from "antd";
import { useNavigate } from "react-router-dom";
import CreateProductModal from "../../component/dashboard/CreateProductModal";
import { Button } from "../../component/form_components/Buttons";
import TableViewer from "../../component/resuable_components/TableViewer";
import { Column } from "../../lib/table_colunm";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigate = useNavigate();
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    // Mock initial data
    setProducts([
      {
        id: "1",
        name: "Premium Wireless Headphones",
        description: "High quality noise-canceling wireless headphones.",
        price: 299.99,
        stock: 45,
        status: "active",
        image: "headphones.jpg",
      },
      {
        id: "2",
        name: "Mechanical Keyboard",
        description: "RGB mechanical keyboard with tactile switches.",
        price: 129.5,
        stock: 0,
        status: "out_of_stock",
        image: "keyboard.jpg",
      },
      {
        id: "3",
        name: "Ergonomic Mouse",
        description: "Vertical ergonomic mouse for productive workflows.",
        price: 59.99,
        stock: 120,
        status: "active",
        image: "mouse.jpg",
      },
    ]);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  const handleAddProduct = (newProduct) => {
    setProducts([newProduct, ...products]);
  };

  const handleDelete = (id) => {
    setProducts(products.filter((p) => p.id !== id));
    notification.success({ message: "Product deleted" });
  };

  return (
    <>
      {/* Main Content */}
      <div className="w-full flex flex-col gap-5 p-6">
        <TableViewer
          title="Product Inventory"
          isLoading={isLoading}
          tableColumnsConfig={Column?.create_product}
          Btn={
            <Button
              variant="outline"
              className="text-red-500"
              onClick={() => setIsModalVisible(true)}
            >
              + Add
            </Button>
          }
          // totalItems={usersData?.total || 1}
          // totalPages={usersData?.totalPages || 1}
          // currentPage={currentPage}
          itemsPerPage={5}
          // searchTerm={searchTerm}
          // onPageChange={handlePageChange}
          // onFilterChange={handleFilterChange}
          // onSearchChange={handleSearchChange}
        />
      </div>

      <CreateProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        onSuccess={handleAddProduct}
      />
    </>
  );
};

export default Dashboard;
