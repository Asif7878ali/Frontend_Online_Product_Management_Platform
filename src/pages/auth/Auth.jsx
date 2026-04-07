import { useState } from "react";
import FormLayout from "../../component/layouts/FormLayout";
import Login from "../../component/auth_component/Login";
import Register from "../../component/auth_component/Register";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <FormLayout>
      <h1 className="text-xl md:text-3xl flex gap-3 font-bold text-center mb-6 tracking-tight">
        Welcome To
        <div className="flex items-baseline mt-1">
          <p className="font-mono text-sm md:text-2xl textgray8">Product</p>
          <span className="textRose italic text-sm ml-1">Management</span>
        </div>
      </h1>

      {/* Tabs */}
      <div className="flex justify-center border-b borderStone mb-8">
        <button
          className={`w-1/2 py-3 text-lg font-medium transition-colors duration-200 cursor-pointer ${
            activeTab === "login"
              ? "border-b-2 borderRose"
              : "textgray6 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("login")}
        >
          Login
        </button>
        <button
          className={`w-1/2 py-3 text-lg font-medium transition-colors duration-200 cursor-pointer ${
            activeTab === "signup"
              ? "border-b-2 borderRose"
              : "textgray6 hover:text-gray-700"
          }`}
          onClick={() => setActiveTab("signup")}
        >
          Register
        </button>
      </div>

      {/* Tab Content */}
      <div className="animate-fade-in">
        {activeTab === "login" ? <Login /> : <Register />}
      </div>
    </FormLayout>
  );
};

export default Auth;
