export const navigateByRole = (role, navigate) => {
  switch (role) {
    case "admin":
      navigate("/admin/dashboard");
      break;

    case "vendor":
      navigate("/dashboard");
      break;

    case "customer":
      navigate("/productspurchasepage");
      break;

    default:
      navigate("/login");
      break;
  }
};
