import { Link, useLocation } from "react-router-dom";
import { FiHome, FiUsers, FiCheckSquare, FiLogIn, FiMenu, FiX } from "react-icons/fi";
import { useState } from "react";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: "/", name: "Home", icon: <FiHome /> },
    { path: "/customers", name: "Customers", icon: <FiUsers /> },
    { path: "/tasks", name: "Tasks", icon: <FiCheckSquare /> },
    { path: "/login", name: "Login", icon: <FiLogIn /> },
  ];

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Logo and desktop navigation */}
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <span className="text-xl font-bold text-blue-600 dark:text-blue-400">CRM Pro</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-8">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                    location.pathname === link.path
                      ? "border-blue-500 text-gray-900 dark:text-white"
                      : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 dark:hover:text-gray-300"
                  }`}
                >
                  <span className="mr-1">{link.icon}</span>
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="-mr-2 flex items-center md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 dark:hover:bg-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`md:hidden ${mobileMenuOpen ? "block" : "hidden"}`}>
        <div className="pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className={`block pl-3 pr-4 py-2 border-l-4 text-base font-medium ${
                location.pathname === link.path
                  ? "bg-blue-50 border-blue-500 text-blue-700 dark:bg-gray-700 dark:text-white"
                  : "border-transparent text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 dark:hover:bg-gray-700 dark:text-gray-300"
              }`}
            >
              <div className="flex items-center">
                <span className="mr-2">{link.icon}</span>
                {link.name}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;