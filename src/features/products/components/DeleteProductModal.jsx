import { SmallModal } from "../ui/Modals";
import { RedRectangleButton } from "../form-components/Buttons";
import { notification } from "antd";
import configCenter from "../../lib/config";
import endPoint from "../../lib/endpoint";
import axios from "axios";
import { useState } from "react";
import Loader from "../ui/Loader";

const DeleteProductModal = ({ openModal, selectedProduct, onCloseModal }) => {
  const [loading, setLoading] = useState(false);
  if (!selectedProduct) return null;

  const handleDeleteClickConfirm = async (selectedProduct) => {
    if (!selectedProduct?.id) {
      notification.error({
        title: "Error",
        description: "Invalid Products",
      });
      return;
    }

    try {
      setLoading(true);
      const token = sessionStorage.getItem("token");
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const response = await axios.delete(
        `${configCenter.urls.base}${endPoint.delete_product}/${selectedProduct.id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response?.data?.status) {
        notification.success({
          title: "Success",
          description:
            response?.data?.message || "Product deleted successfully",
        });
        onCloseModal();
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      notification.error({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <SmallModal
          title="Delete Product"
          open={openModal}
          handleClose={() => {
            onCloseModal();
          }}
        >
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  Name : {selectedProduct?.title || "n/a"}
                </h3>
              </div>
            </div>

            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm">
              Are you sure you want to delete this products? This action cannot
              be undone.
            </div>

            <div className="flex justify-end gap-3">
              <RedRectangleButton
                className="text-red-600 bg-red-100"
                name="Cancel"
                onClick={() => {
                  onCloseModal();
                }}
              />

              <RedRectangleButton
                name="Delete"
                className="text-white bg-red-500 hover:bg-red-600"
                onClick={() => {
                  handleDeleteClickConfirm(selectedProduct);
                }}
              />
            </div>
          </div>
        </SmallModal>
      )}
    </>
  );
};

export default DeleteProductModal;
