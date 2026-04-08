export function signInValidation(formData) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData?.name) {
    errors.name = "Name is Required";
  } else if (formData?.name?.length < 3) {
    errors.name = "Name must be at least 3 characters";
  }

  if (!formData?.email) {
    errors.email = "Email is Required";
  } else if (!emailRegex.test(formData?.email)) {
    errors.email = "Enter Valid Email";
  }

  if (!formData?.password) {
    errors.password = "Password is required";
  } else if (formData?.password?.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  if (!formData?.c_password) {
    errors.c_password = "Confirm password is required";
  } else if (formData?.password !== formData?.c_password) {
    errors.c_password = "";
  }

  if (!formData?.checked) {
    errors.checked = "You must accept the terms & conditions";
  }

  const isvalid = Object.keys(errors).length === 0;
  return { errors, isvalid };
}

export function logInValidation(formData) {
  const errors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!formData?.email) {
    errors.email = "Email is Required";
  } else if (!emailRegex.test(formData?.email)) {
    errors.email = "Enter Valid Email";
  }

  if (!formData?.password) {
    errors.password = "Password is required";
  } else if (formData?.password?.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }

  const isvalid = Object.keys(errors).length === 0;
  return { errors, isvalid };
}
