import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Icons from "../../utills/Icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer">
          <div className="bg-indigo-600 p-1.5 rounded-lg">
            <Icons.Checked className="w-5 h-5 text-white stroke-2" />
          </div>
          <span className="font-bold text-xl tracking-tight text-gray-900">
            Product<span className="text-indigo-600">Management</span>
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            Features
          </a>
          <a
            href="#solutions"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            Solutions
          </a>
          <a
            href="#pricing"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            Pricing
          </a>
          <a
            href="#resources"
            className="text-gray-600 hover:text-indigo-600 font-medium transition-colors"
          >
            Resources
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <Link to="/auth" className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-full font-medium transition-all shadow-md shadow-indigo-200">
            <Icons.AddUser className="w-4 h-4" />
            Get Started
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-gray-600 cursor-pointer p-2"
          onClick={toggleMenu}
        >
          {menuOpen ? (
            <Icons.Cross className="w-6 h-6" />
          ) : (
            <Icons.Humberger className="w-6 h-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={`fixed top-16 left-0 w-full bg-white border-b border-gray-100 shadow-xl overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-4 py-6 space-y-4 flex flex-col">
          <a
            href="#features"
            className="text-gray-700 font-medium hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50"
          >
            Features
          </a>
          <a
            href="#solutions"
            className="text-gray-700 font-medium hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50"
          >
            Solutions
          </a>
          <a
            href="#pricing"
            className="text-gray-700 font-medium hover:text-indigo-600 p-2 rounded-lg hover:bg-gray-50"
          >
            Pricing
          </a>

          <div className="h-px bg-gray-100 my-2"></div>

          <Link to="/auth" className="w-full text-center text-gray-700 font-medium py-3 border border-gray-200 rounded-lg hover:bg-gray-50 block">
            Log in
          </Link>
          <Link to="/auth" className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white py-3 rounded-lg font-medium hover:bg-indigo-700">
            <Icons.AddUser className="w-5 h-5" />
            Get Started Free
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
