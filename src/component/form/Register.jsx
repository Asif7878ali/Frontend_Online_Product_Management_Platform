import { useState } from "react";
import { Button } from "../form_components/Buttons";
import Input from "../form_components/Input";
import Password from "../form_components/Password";
import Checkbox from "../form_components/Checkbox";
import endPoint from "../../lib/endpoint";

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
    checked: false,
  });
  const [errors, setErrors] = useState({});

  function handleChange(e) {
    const { name, type, checked, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors, isvalid } = signInValidation(formData);
    setErrors(errors);

    const collectform = {
      name: formData.name,
      email: formData.email,
      password: formData.password,
    };

    if (isvalid == true) {
      try {
        const response = await fetchapi({
          endpoint: endPoint.signin,
          method: "POST",
          payload: collectform,
        });

        const { data } = response;

        if (!data?.success) {
          showAlert(data.msg || "Something Went Wrong", msg.err);
          return;
        }

        sessionStorage.setItem("user", JSON.stringify(data.user));
        showAlert(data?.msg || "Register SuccesFully", msg.sucs);
        router.push("/auth/verifyEmail");
      } catch (error) {
        showAlert("Internal Server Error", msg.err);
        console.error("Signin error:", error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div id="email">
        <Input
          type="email"
          name="email"
          label="E-mail"
          placeholder="Enter Email"
          required
          value={formData.email}
          onChange={handleChange}
          error={errors?.email}
        />
      </div>

      <div id="password">
        <Password
          name="password"
          label="Password"
          placeholder="Enter Password"
          required
          value={formData.password}
          onChange={handleChange}
          copy={true}
          error={errors?.password}
          tooltip={true}
          hints={true}
        />
      </div>

      <div id="c_password">
        <Password
          name="c_password"
          label="Confirm Pasword"
          placeholder="Confirm Your Password"
          required
          value={formData.c_password}
          onChange={handleChange}
          paste={true}
          error={errors?.c_password}
          originalPass={formData.password}
          confirmPassMatch={true}
        />
      </div>

      <div className="checked">
        <Checkbox
          id="terms"
          name="checked"
          label="Accept Terms & Condition"
          checked={formData.checked}
          onChange={handleChange}
          error={errors?.checked}
        />
      </div>

      <Button className="w-full cursor-pointer" variant="primary">
        Register
      </Button>
      <p className="text-sm  text-center">Already a Account</p>
    </form>
  );
};

export default Register;
