const getSidebarItems = (role) => {
  if (role === "admin") {
    return [
      { text: "Users List", key: "users" },
      { text: "Products List", key: "products" },
    ];
  }

  if (role === "vendor") {
    return [
      { text: "Products", key: "products" },
      { text: "Orders", key: "orders" },
    ];
  }

  return [];
};

export default getSidebarItems;
