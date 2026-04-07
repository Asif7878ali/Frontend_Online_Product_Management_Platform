import { useState } from "react";
import Input from "../form_components/Input";
import { Button } from "../form_components/Buttons";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "name") {
      const numericValue = value.replace(/[^0-9]/g, ""); // Remove non-numeric characters
      if (numericValue.length <= 8) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      email: formData.email,
      password: formData.password,
    };
    console.log("data", payload);
  };
  return (
    <form onSubmit={handleSubmit} id="LoginForm">
      <div className="flex flex-col gap-4">
        <Input
          type="email"
          label="E-mail"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter Your E-mail"
          required
        />
        <Input
          type="password"
          label="Passowrd"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Enter Password"
          required
        />
        <Button className="w-full cursor-pointer" variant="primary">
          Login
        </Button>
        <p className="text-sm text-center">Forget Password?</p>
      </div>
    </form>
  );
};

export default Login;
