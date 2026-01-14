import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Building2 } from "lucide-react";
import ProjectsMenu from "./ProjectsMenu";
import React, { useState, useRef, useEffect } from "react";
import { gsap } from "gsap";

const Navbar = () => {
  const location = useLocation();
  const logoRef = useRef(null);
  const menuRef = useRef([]);
  const btnRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [projectsOpen, setProjectsOpen] = useState(false);
  const [mobileProjectsOpen, setMobileProjectsOpen] = useState(false);
  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      btnRef.current,
      { x: -30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
      "=0.4"
    )
      .fromTo(
        logoRef.current,
        { x: 30, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.6, ease: "power3.out" },
        "-=0.4"
      )
      .fromTo(
        menuRef.current,
        { y: -10, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.4,
          stagger: 0.1,
          ease: "power3.out",
        },
        "-=0.3"
      );
  }, [location.pathname]);

  const navItems = [
    { name: "الرئيسية", path: "/" },
    { name: "عن الشركة", path: "/about" },
    { name: "المشاريع", path: "/projects" },
    { name: "الإدارة", path: "/management" },
    { name: "المستندات", path: "/documents" },
  ];
  React.useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "auto";
  }, [isOpen]);

  return (
    <nav className="bg-primary-dark shadow-lg fixed w-full top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link
            ref={logoRef}
            to="/"
            className="flex items-center space-x-3 space-x-reverse"
          >
            <Building2 className="h-10 w-10 text-secondary-gold" />
            <div className="text-right pr-2">
              <h1 className="text-xl font-bold text-white">مصر الخليج</h1>
              <p className="text-gray-300 text-sm">
                للمصاعد والسلالم الكهربائية
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8 space-x-reverse">
            {navItems.map((item, index) =>
              item.name === "المشاريع" ? (
                <div
                  key={item.name}
                  ref={(el) => (menuRef.current[index] = el)}
                  className="relative group opacity-0"
                  onMouseEnter={() => setProjectsOpen(true)}
                  onMouseLeave={() => setProjectsOpen(false)}
                >
                  <Link
                    to={item.path}
                    ref={(el) => (menuRef.current[index] = el)}
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
                  ref={(el) => (menuRef.current[index] = el)}
                  to={item.path}
                  className={`text-white mr-5 hover:text-secondary-gold transition-colors ${
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
            ref={btnRef}
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
        {/* Mobile Full Screen Menu */}
        <div
          className={`fixed inset-0 z-40 md:hidden transition-all duration-500 ease-in-out ${
            isOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
        >
          {/* Background Overlay */}
          <div
            className={`absolute inset-0 bg-blue-950/80 backdrop-blur-lg transition-opacity duration-500 ${
              isOpen ? "opacity-100" : "opacity-0"
            }`}
            onClick={() => {
              setIsOpen(false);
              setMobileProjectsOpen(false);
            }}
          />

          {/* Menu Content */}
          <div
            className={`relative z-50 h-full w-full max-w-full bg-transparent transform transition-all duration-500 ease-out ${
              isOpen ? "translate-y-0" : "-translate-y-6"
            }`}
          >
            <div className="h-full flex flex-col">
              {/* Header */}
              <div className="flex items-center justify-between px-6 py-5 border-b border-white/10">
                <h2 className="text-xl font-bold text-white">القائمة</h2>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    setMobileProjectsOpen(false);
                  }}
                  className="text-white hover:text-secondary-gold transition-colors"
                >
                  <X size={30} />
                </button>
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4">
                {navItems.map((item) =>
                  item.name === "المشاريع" ? (
                    <div
                      key={item.name}
                      className="transition-all duration-300 "
                    >
                      <button
                        onClick={() =>
                          setMobileProjectsOpen(!mobileProjectsOpen)
                        }
                        className="flex items-center justify-between w-full text-white text-lg font-semibold py-3 hover:text-secondary-gold transition-colors"
                      >
                        {item.name}
                        <ChevronDown
                          className={`h-5 w-5 transition-transform duration-300 ${
                            mobileProjectsOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <div
                        className={`overflow-hidden transition-all duration-300 ${
                          mobileProjectsOpen
                            ? "max-h-[600px] opacity-100"
                            : "max-h-0 opacity-0"
                        }`}
                      >
                        <ProjectsMenu
                          mobile
                          onItemClick={() => {
                            setIsOpen(false);
                            setMobileProjectsOpen(false);
                          }}
                        />
                      </div>
                    </div>
                  ) : (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="block text-white text-lg font-medium py-3 border-b border-white/10  hover:text-secondary-gold transition-colors"
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
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
