export const navigateByRole = (role, navigate) => {
  switch (role) {
    case "admin":
      navigate("/admin/dashboard");
      break;

    case "vendor":
      navigate("/dashboard");
      break;

    case "customer":
      navigate("/explore/products");
      break;

    default:
      navigate("/login");
      break;
  }
};
