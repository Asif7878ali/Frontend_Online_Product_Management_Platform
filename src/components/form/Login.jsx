import { useState } from "react";
import Input from "../form-components/Input";
import { Button } from "../form-components/Buttons";
import Loader from "../ui/Loader";
import { logInValidation } from "../../lib/validation";
import axios from "axios";
import configCenter from "../../lib/config";
import endPoint from "../../lib/endpoint";
import { notification } from "antd";
import { useNavigate } from "react-router-dom";
import Password from "../form-components/Password";
import { navigateByRole } from "../../lib/roleNavigation";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { errors, isvalid } = logInValidation(formData);
    setErrors(errors);

    if (!isvalid) {
      return;
    }

    const payload = {
      email: formData.email,
      password: formData.password,
    };
    console.log("data", payload);

    if (isvalid == true) {
      setLoading(true);

      try {
        await new Promise((resolve) => setTimeout(resolve, 5000));

        const response = await axios.post(
          `${configCenter.urls.base}${endPoint.login}`,
          payload,
        );

        const { data } = response;
        const role = data?.user?.role;

        if (!data?.status) {
          notification.error({
            title: "Error",
            description: data.message || "Something Went Wrong",
          });
          return;
        }

        notification.success({
          title: "Success",
          description: data.message || "Login SuccesFully",
        });

        // store data in session storage
        sessionStorage.setItem("user", JSON.stringify(data.user));
        sessionStorage.setItem("token", data.token);

        setFormData({
          email: "",
          password: "",
        });
        setErrors({});
        navigateByRole(role, navigate);
      } catch (error) {
        if (error.response.status === 401) {
          notification.error({
            title: "Error",
            description: error.response.data.message,
          });
          return;
        }
        notification.error({
          title: "Error",
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
        <form onSubmit={handleSubmit} id="LoginForm">
          <div className="flex flex-col gap-4">
            <Input
              type="email"
              label="E-mail"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter Your E-mail"
              error={errors?.email}
              required
            />
            <Password
              label="Passowrd"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter Password"
              error={errors?.password}
              required
            />
            <Button className="w-full cursor-pointer" variant="primary">
              Login
            </Button>
            <p className="text-sm text-center">Forget Password?</p>
          </div>
        </form>
      )}
    </>
  );
};

export default Login;
