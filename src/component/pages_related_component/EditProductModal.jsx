import { useState, useEffect } from "react";
import { MediumModal } from "../resuable_components/Modals";
import TextArea from "../form_components/TextArea";
import Input from "../form_components/Input";
import Dropdown from "../form_components/Dropdown";
import { RedRectangleButton } from "../form_components/Buttons";
import { editProductValidation } from "../../lib/validation";
import { isNumbers, isValidFileType } from "../../lib/filter_funtions";
import configCenter from "../../lib/config";
import endPoint from "../../lib/endpoint";
import { notification } from "antd";
import axios from "axios";
import Loader from "../resuable_components/Loader";

const EditProductModal = ({ openModal, selectedProduct, onCloseModal }) => {
  const [form, setForm] = useState({
    id: "",
    title: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  const catogoryOptions = [
    { value: "Electronics", label: "Electronics" },
    { value: "Fashion", label: "Fashion" },
  ];

  function handleChange(e) {
    const { name, value } = e.target;

    let filteredValue = value;
    if (name === "price" || name === "stock") {
      filteredValue = isNumbers(value);
    }
    setForm((prev) => ({
      ...prev,
      [name]: filteredValue,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  function handleImageChange(e) {
    const file = e.target.files[0];

    if (!file) return;

    const MAX_SIZE = 2 * 1024 * 1024;

    if (!isValidFileType(file)) {
      notification.error({
        title: "Error",
        description: "Please upload a PNG, JPG, or JPEG file",
      });

      setForm((prev) => ({ ...prev, image: null }));
      setPreview(null);

      setErrors((prev) => ({
        ...prev,
        image: "Invalid file type",
      }));

      e.target.value = "";
      return;
    }

    if (file.size > MAX_SIZE) {
      notification.error({
        title: "Error",
        description: "Image must be less than 2MB",
      });

      setForm((prev) => ({ ...prev, image: null }));
      setPreview(null);

      setErrors((prev) => ({
        ...prev,
        image: "File size must be under 2MB",
      }));

      e.target.value = "";
      return;
    }

    setForm((prev) => ({ ...prev, image: file }));
    setPreview(URL.createObjectURL(file));

    setErrors((prev) => ({
      ...prev,
      image: "",
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors, isvalid } = editProductValidation(form);
    setErrors(errors);

    if (!isvalid) {
      return;
    }

    try {
      setLoading(true);
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("id", form.id);
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("price", form.price);
      formData.append("stock", form.stock);
      formData.append("category", form.category);
      if (form.image) {
        formData.append("image", form.image);
      }

      const response = await axios.post(
        `${configCenter.urls.base}${endPoint.update_product}/${selectedProduct.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.status) {
        notification.success({
          title: "Success",
          description: "Product updated successfully",
        });

        onCloseModal();
        window.location.reload();
      }
    } catch (error) {
      notification.error({
        title: "Error",
        description: error?.response?.data?.message || "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (selectedProduct && openModal) {
      setForm({
        id: selectedProduct.id || "",
        title: selectedProduct.title || "",
        description: selectedProduct.description || "",
        price: selectedProduct.price || "",
        stock: selectedProduct.stock || "",
        category: selectedProduct.category.name || "",
        image: null,
      });

      if (selectedProduct.image_url) {
        const fullImageUrl = selectedProduct.image_url.startsWith("http")
          ? selectedProduct.image_url
          : `${configCenter.urls.base}${selectedProduct.image_url}`;
        setPreview(fullImageUrl);
      } else {
        setPreview(null);
      }
      setErrors({});
    }
  }, [selectedProduct, openModal]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <MediumModal
          title="Edit Product"
          open={openModal}
          handleClose={onCloseModal}
        >
          <div className="space-y-5">
            <div className="space-y-3">
              <label className="block text-sm font-semibold text-gray-700">
                Update Image
              </label>

              {/* Upload Box */}
              {!preview && (
                <label
                  className={`flex flex-col items-center justify-center w-full h-36 border-2 border-dashed rounded-xl cursor-pointer transition
      ${
        errors?.image
          ? "border-red-500 bg-red-50"
          : "border-gray-300 hover:border-red-400 hover:bg-red-50"
      }`}
                >
                  <div className="flex flex-col items-center justify-center text-gray-500">
                    <span className="text-2xl">📁</span>
                    <p className="text-sm mt-1">
                      Click to upload or drag & drop
                    </p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 2MB</p>
                  </div>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              )}

              {errors?.image && (
                <p className={`text-red-600 font-medium text-sm`}>
                  {errors.image}
                </p>
              )}

              {/* Preview */}
              {preview && (
                <div className="relative w-fit mx-auto">
                  <img
                    src={preview}
                    alt="preview"
                    className="h-36 w-36 object-cover rounded-xl border shadow hover:scale-105 transition"
                  />

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => {
                      setPreview(null);
                      setForm((prev) => ({ ...prev, image: null }));
                    }}
                    className="absolute cursor-pointer -top-2 -right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow hover:bg-red-600"
                  >
                    ✕
                  </button>
                </div>
              )}
            </div>

            <Input
              type="text"
              name="title"
              label="Product Title"
              placeholder="Enter product title"
              required
              value={form.title}
              onChange={handleChange}
              error={errors?.title}
            />

            <TextArea
              label="Description"
              name="description"
              rows={4}
              value={form.description}
              onChange={handleChange}
              error={errors?.description}
            />

            <Input
              type="text"
              name="price"
              label="Price"
              placeholder="Enter product price"
              value={form.price}
              onChange={handleChange}
              error={errors?.price}
            />

            <Input
              type="text"
              name="stock"
              label="Stock"
              placeholder="Enter product stock"
              value={form.stock}
              onChange={handleChange}
              error={errors?.stock}
            />

            <Dropdown
              name="category"
              options={catogoryOptions}
              optionLabelKey="label"
              optionValueKey="value"
              onChange={handleChange}
              classNameInput="bg-transparent"
              placeholder="Select Catogory"
              value={form.category}
              error={errors?.category}
            />

            <div className="flex justify-end gap-3">
              <RedRectangleButton
                type="button"
                className="text-red-600 bg-red-100"
                name="Cancel"
                onClick={onCloseModal}
              />

              <RedRectangleButton
                type="submit"
                name={loading ? "Updating..." : "Update Product"}
                disabled={loading}
                className="text-white bg-red-500 hover:bg-red-600"
                onClick={handleSubmit}
              />
            </div>
          </div>
        </MediumModal>
      )}
    </>
  );
};

export default EditProductModal;
