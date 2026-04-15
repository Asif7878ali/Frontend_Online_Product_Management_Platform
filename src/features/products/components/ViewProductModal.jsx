import { dateFormater, formatIndianAmount } from "../../lib/dateFormatter";
import { SmallModal } from "../ui/Modals";

const ViewProductModal = ({ openModal, selectedProduct, onCloseModal }) => {
  if (!selectedProduct) return null;

  return (
    <SmallModal
      title="View Product"
      open={openModal}
      handleClose={onCloseModal}
    >
      <div className="p-6 space-y-6">
        {/* Product Image */}
        <div className="w-full flex justify-center">
          {selectedProduct?.image_url ? (
            <img
              src={`${selectedProduct?.image_url}`}
              alt={selectedProduct?.title}
              className="h-48 w-48 object-cover rounded-xl border shadow"
            />
          ) : (
            <div className="h-48 w-48 flex items-center justify-center rounded-xl border bg-gray-100 text-gray-500">
              Image Not Available
            </div>
          )}
        </div>

        {/* Product Title */}
        <div className="bg-gray-50 p-4 rounded-xl border">
          <h2 className="text-xl font-bold text-gray-800">
            {selectedProduct?.title || "n/a"}
          </h2>
          <p className="text-sm text-gray-500 mt-1">
            {selectedProduct?.description || "n/a"}
          </p>
        </div>

        {/* Product Details Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-gray-500 text-sm">Category</p>
            <p className="font-semibold text-gray-800">
              {selectedProduct?.category?.name || "n/a"}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-gray-500 text-sm">Price</p>
            <p className="font-semibold text-green-600">
              ₹ {formatIndianAmount(selectedProduct?.price || "n/a")}
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-gray-500 text-sm">Stock</p>
            <p
              className={`font-semibold ${
                selectedProduct?.stock > 0 ? "text-blue-600" : "text-red-600"
              }`}
            >
              {selectedProduct.stock || "n/a"} units
            </p>
          </div>

          <div className="bg-white p-4 rounded-lg border shadow-sm">
            <p className="text-gray-500 text-sm">Product ID</p>
            <p className="font-semibold text-gray-800">
              {selectedProduct?.id || "n/a"}
            </p>
          </div>
        </div>

        {/* Dates */}
        <div className="bg-gray-50 p-4 rounded-xl border text-sm text-gray-600">
          <p>
            <span className="font-medium">Created At:</span>{" "}
            {dateFormater(selectedProduct?.created_at, "DateTime")}
          </p>
          <p>
            <span className="font-medium">Updated At:</span>{" "}
            {dateFormater(selectedProduct?.updated_at, "DateTime")}
          </p>
        </div>
      </div>
    </SmallModal>
  );
};

export default ViewProductModal;
