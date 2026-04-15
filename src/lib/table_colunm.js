export const Column = {
  table_product: {
    key: "table_product",
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

  admin_table_product: {
    key: "admin_table_product",
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

  table_user_list: {
    key: "table_user_list",
    columns: ["Name", "Email", "Role", "Verify", "Created_at", "Updated_at"],
  },

  table_order: {
    key: "table_order",
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
