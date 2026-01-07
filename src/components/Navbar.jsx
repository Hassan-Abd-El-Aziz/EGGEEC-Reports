import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Building2 } from "lucide-react";
import ProjectsMenu from "./ProjectsMenu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "الرئيسية", path: "/" },
    { name: "عن الشركة", path: "/about" },
    { name: "المشاريع", path: "/projects" },
    { name: "الإدارة", path: "/management" },
    { name: "المستندات", path: "/documents" },
  ];

  return (
    <nav className="bg-primary-dark shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 space-x-reverse">
            <Building2 className="h-10 w-10 text-secondary-gold" />
            <div className="text-right">
              <h1 className="text-xl font-bold text-white">مصر الخليج</h1>
              <p className="text-gray-300 text-sm">
                للمصاعد والسلالم الكهربائية
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item) =>
              item.name === "المشاريع" ? (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setProjectsOpen(true)}
                  onMouseLeave={() => setProjectsOpen(false)}
                >
                  <Link
                    to={item.path}
                    className={`flex items-center text-white hover:text-secondary-gold transition-colors ${
                      location.pathname.startsWith("/project")
                        ? "text-secondary-gold font-bold"
                        : ""
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="mr-1 h-4 w-4" />
                  </Link>
                  {projectsOpen && <ProjectsMenu />}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-white hover:text-secondary-gold transition-colors ${
                    location.pathname === item.path
                      ? "text-secondary-gold font-bold"
                      : ""
                  }`}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden bg-primary-blue py-4">
            {navItems.map((item) =>
              item.name === "المشاريع" ? (
                <div key={item.name} className="px-4 py-2">
                  <button
                    onClick={() => setMobileProjectsOpen(!mobileProjectsOpen)}
                    className="flex items-center justify-between w-full text-white font-semibold mb-2 hover:text-secondary-gold"
                  >
                    {item.name}
                    <ChevronDown
                      className={`h-4 w-4 transition-transform ${
                        mobileProjectsOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>
                  {mobileProjectsOpen && (
                    <ProjectsMenu
                      mobile
                      onItemClick={() => {
                        setIsOpen(false);
                        setMobileProjectsOpen(false);
                      }}
                    />
                  )}
                </div>
              ) : (
                <Link
                  key={item.name}
                  to={item.path}
                  className="block px-4 py-2 text-white hover:bg-primary-dark transition-colors"
                  onClick={() => {
                    setIsOpen(false);
                    setMobileProjectsOpen(false);
                  }}
                >
                  {item.name}
                </Link>
              )
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
