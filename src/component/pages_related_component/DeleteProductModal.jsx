import React from "react";
import { SmallModal } from "../resuable_components/Modals";
import { RedRectangleButton } from "../form_components/Buttons";

const DeleteProductModal = ({ openModal, selectedProduct, onCloseModal }) => {
  if (!selectedProduct) return null;
  return (
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
          Are you sure you want to delete this products? This action cannot be
          undone.
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
            //   onClick={() => {
            //     handleDeleteClickConfirm(selectedEmailTemplate);
            //   }}
          />
        </div>
      </div>
    </SmallModal>
  );
};

export default DeleteProductModal;
