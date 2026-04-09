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

export function createProductValidation(formData) {
  const errors = {};

  if (!formData?.image) {
    errors.image = "Image is Required";
  }

  if (!formData?.title) {
    errors.title = "Title is Required";
  } else if (formData?.title?.length < 3) {
    errors.title = "Title must be at least 3 characters";
  }

  if (!formData?.description) {
    errors.description = "Description is Required";
  } else if (formData?.description?.length < 10) {
    errors.description = "Description must be at least 10 characters";
  }

  if (!formData?.price) {
    errors.price = "Price is Required";
  } else if (formData?.price < 0) {
    errors.price = "Price must be at least 0";
  }

  if (!formData?.stock) {
    errors.stock = "Stock is Required";
  } else if (formData?.stock < 0) {
    errors.stock = "Stock must be at least 0";
  }

  if (!formData?.category) {
    errors.category = "Category is Required";
  }

  const isvalid = Object.keys(errors).length === 0;
  return { errors, isvalid };
}

export function editProductValidation(formData) {
  const errors = {};

  if (!formData?.title) {
    errors.title = "Title is Required";
  } else if (formData?.title?.length < 3) {
    errors.title = "Title must be at least 3 characters";
  }

  if (!formData?.description) {
    errors.description = "Description is Required";
  } else if (formData?.description?.length < 10) {
    errors.description = "Description must be at least 10 characters";
  }

  if (!formData?.price) {
    errors.price = "Price is Required";
  } else if (formData?.price < 0) {
    errors.price = "Price must be at least 0";
  }

  if (!formData?.stock) {
    errors.stock = "Stock is Required";
  } else if (formData?.stock < 0) {
    errors.stock = "Stock must be at least 0";
  }

  if (!formData?.category) {
    errors.category = "Category is Required";
  }

  const isvalid = Object.keys(errors).length === 0;
  return { errors, isvalid };
}
