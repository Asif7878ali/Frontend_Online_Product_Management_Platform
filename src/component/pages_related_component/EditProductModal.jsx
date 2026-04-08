import { MediumModal } from "../resuable_components/Modals";
import Input from "../form_components/Input";
import TextArea from "../form_components/TextArea";
import { RedRectangleButton } from "../form_components/Buttons";

const EditProductModal = ({ openModal, selectedProduct, onCloseModal }) => {
  return (
    <MediumModal
      title="Edit Product"
      open={openModal}
      handleClose={() => {
        onCloseModal();
        // setForm({
        //   title: "",
        //   description: "",
        //   image_url: "",
        // });
        // setUploadFile(null);
      }}
    >
      <div className="space-y-5">
        {/* Title Input */}
        <Input
          label="Category Title"
          name="title"
          placeholder="Enter Category Title Here ..."
          // value={form.title}
          // onChange={handleInputChange}
          // error={error.title}
        />

        {/* Description TextArea */}
        <TextArea
          label="Category Description"
          placeholder="Enter Category Description Here ..."
          name="description"
          rows={4}
          maxlength={500}
          // value={form.description}
          // onChange={handleInputChange}
          // error={error.description}
        />

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <RedRectangleButton
            className="text-red-600 bg-red-100"
            name="Cancel"
            // onClick={() => {
            //   onCloseModal();
            //   setForm({
            //     title: "",
            //     description: "",
            //     image_url: "",
            //   });
            //   setUploadFile(null);
            // }}
          />

          {/* <RedRectangleButton
            onClick={(e) => {
              e.preventDefault();
              handleAddCategoryFormSubmit(e);
            }}
            name={imageUploadLoading ? "Uploading..." : "Add"}
            disabled={imageUploadLoading}
            className={`text-white bg-red-500 hover:bg-red-600 ${
              imageUploadLoading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          /> */}
        </div>
      </div>
    </MediumModal>
  );
};

export default EditProductModal;
