import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../form_components/Buttons";
import Input from "../form_components/Input";
import Password from "../form_components/Password";
import Checkbox from "../form_components/Checkbox";
import endPoint from "../../lib/endpoint";
import { signInValidation } from "../../lib/validation";
import axios from "axios";
import configCenter from "../../lib/config";
import { notification } from "antd";
import Loader from "../resuable_components/Loader";

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
    checked: false,
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

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
      setLoading(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const response = await axios.post(
          `${configCenter.urls.base}${endPoint.signin}`,
          collectform,
        );

        const { data } = response;

        if (!data?.success) {
          notification.error({
            message: "Error",
            description: data.msg || "Something Went Wrong",
          });
          return;
        }

        sessionStorage.setItem("user", JSON.stringify(data.user));
        notification.success({
          message: "Success",
          description: data.msg || "Register SuccesFully",
        });
      } catch (error) {
        notification.error({
          message: "Error",
          description: "Internal Server Error",
        });
        console.error("Signin error:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div id="name">
            <Input
              type="text"
              name="name"
              label="Name"
              placeholder="Enter Name"
              required
              value={formData.name}
              onChange={handleChange}
              error={errors?.name}
            />
          </div>
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
          <p className="text-sm  text-center">Already an Account?</p>
        </form>
      )}
    </>
  );
};

export default Register;
