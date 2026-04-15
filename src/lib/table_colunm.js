export const Column = {
  TableProduct: {
    key: "TableProduct",
    columns: [
      "Image",
      "Description",
      "Price",
      "Stock",
      "Category",
      "Created_at",
      "View",
      "Action",
    ],
  },

  admin_TableProduct: {
    key: "admin_TableProduct",
    columns: [
      "Image",
      "Description",
      "Price",
      "Stock",
      "Category",
      "Created_by",
      "Created_at",
    ],
  },

  TableUser_list: {
    key: "TableUser_list",
    columns: ["Name", "Email", "Role", "Verify", "Created_at", "Updated_at"],
  },

  TableOrder: {
    key: "TableOrder",
    columns: [
      "Order_Id",
      "Product",
      "Customer",
      "Quantity",
      "Price",
      "Total Amount",
      "Created_at",
    ],
  },
};
