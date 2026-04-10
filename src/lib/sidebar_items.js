const getSidebarItems = (role) => {
  if (role === "admin") {
    return [
      { text: "Users List", key: "users" },
      { text: "Products List", key: "products" },
    ];
  }

  if (role === "vendor") {
    return [
      { text: "Products List", key: "products_vendor" },
      { text: "Orders list", key: "orders" },
    ];
  }

  return [];
};

export default getSidebarItems;
