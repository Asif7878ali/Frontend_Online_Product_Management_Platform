import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icons from "../../utills/Icons";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [token, setToken] = useState(null);

  function toggleMenu() {
    setMenuOpen(!menuOpen);
  }

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    setToken(storedToken);
  }, []);

  return (
    <>
      {token ? (
        <div>My name</div>
      ) : (
        <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-lg border-b border-gray-100 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="bg-rose-600 text-white hover:bg-rose-700 p-1.5 rounded-lg">
                <Icons.Checked className="w-5 h-5 text-white stroke-2" />
              </div>
              <span className="font-bold text-xl tracking-tight text-gray-900">
                Product<span className="textRose">Management</span>
              </span>
            </div>

            {/* Desktop Links */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="#features"
                className="text-gray-600 hover:text-rose-600 font-medium"
              >
                Features
              </a>
              <a
                href="#solutions"
                className="text-gray-600 hover:text-rose-600 font-medium"
              >
                Solutions
              </a>
              <a
                href="#pricing"
                className="text-gray-600 hover:text-rose-600 font-medium"
              >
                Pricing
              </a>
              <a
                href="#resources"
                className="text-gray-600 hover:text-rose-600 font-medium"
              >
                Resources
              </a>
            </div>

            {/* Auth Button */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/auth"
                className="flex items-center gap-2 bg-rose-600 text-white px-5 py-2 rounded-full"
              >
                <Icons.AddUser className="w-4 h-4" />
                Get Started
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 p-2"
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
            className={`fixed top-16 left-0 w-full bg-white transition-all ${
              menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="px-4 py-6 space-y-4 flex flex-col">
              <Link to="/auth">Login</Link>
              <Link to="/auth">Get Started</Link>
            </div>
          </div>
        </nav>
      )}
    </>
  );
};

export default Navbar;
