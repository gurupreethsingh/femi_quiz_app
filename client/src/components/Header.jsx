import { useState, useEffect } from "react";
import {
  FiMenu,
  FiX,
  FiChevronDown,
  FiUser,
  FiLogOut,
  FiBarChart2,
  FiMonitor,
  FiShield,
  FiLayers,
  FiRefreshCw,
  FiPhone,
  FiPlayCircle,
} from "react-icons/fi";
import ecoders_logo from "../assets/ecoders_logo.png"; // Ensure this path is correct

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(null);
  const [avatarDropdownOpen, setAvatarDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };
  const toggleAvatarDropdown = () => setAvatarDropdownOpen(!avatarDropdownOpen);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setUser(null);
  };

  const allprojects = [
    {
      name: "All Projects",
      description: "Get a better understanding of your traffic",
      href: "/projects",
      icon: FiBarChart2,
    },
    {
      name: "Java Projects",
      description: "Speak directly to your customers",
      href: "#",
      icon: FiMonitor,
    },
    {
      name: "Mern Stack Projects",
      description: "Your customers' data will be safe and secure",
      href: "#",
      icon: FiShield,
    },
    {
      name: "AI projects",
      description: "Connect with third-party tools",
      href: "#",
      icon: FiLayers,
    },
    {
      name: "Wordpress Projects",
      description: "Build strategic funnels that will convert",
      href: "#",
      icon: FiRefreshCw,
    },
  ];

  const allcourses = [
    {
      name: "All Courses",
      description: "Get a better understanding of your traffic",
      href: "/all-courses",
      icon: FiBarChart2,
    },
    {
      name: "Python",
      description: "Speak directly to your customers",
      href: "#",
      icon: FiMonitor,
    },
    {
      name: "Mern Stack",
      description: "Your customers' data will be safe and secure",
      href: "#",
      icon: FiShield,
    },
    {
      name: "AI projects",
      description: "Connect with third-party tools",
      href: "#",
      icon: FiLayers,
    },
    {
      name: "Wordpress",
      description: "Build strategic funnels that will convert",
      href: "#",
      icon: FiRefreshCw,
    },
  ];

  const allexams = [
    {
      name: "All Exams",
      description: "Get a better understanding of your traffic",
      href: "/all-exams",
      icon: FiBarChart2,
    },
    {
      name: "Java Exam",
      description: "Speak directly to your customers",
      href: "#",
      icon: FiMonitor,
    },
    {
      name: "Pyhton Exam",
      description: "Your customers' data will be safe and secure",
      href: "#",
      icon: FiShield,
    },
    {
      name: "Semister Exam",
      description: "Connect with third-party tools",
      href: "#",
      icon: FiLayers,
    },
    {
      name: "Monthly Exam",
      description: "Build strategic funnels that will convert",
      href: "#",
      icon: FiRefreshCw,
    },
  ];

  const callsToAction = [
    { name: "Watch demo", href: "#", icon: FiPlayCircle },
    { name: "Contact sales", href: "#", icon: FiPhone },
  ];

  const navigation = [
    { name: "Home", href: "/", current: true },
    { name: "About", href: "/about", current: false },
    { name: "Contact", href: "/contact", current: false },
    ...(isLoggedIn
      ? [
          {
            name: "Projects",
            dropdown: true,
            content: allprojects,
          },
          {
            name: "Courses",
            dropdown: true,
            content: allcourses,
          },
          {
            name: "Exams",
            dropdown: true,
            content: allexams,
          },
        ]
      : []),
  ];

  function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest(".dropdown")) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center sm:hidden">
            {/* Mobile menu button */}
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              {menuOpen ? (
                <FiX className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center justify-center sm:justify-start">
            <img className="h-10 w-auto" src={ecoders_logo} alt="Logo" />
            <span>
              <h2 className="text-black-900 text-bold">ECODERS</h2>
            </span>
          </div>

          {/* Right-side content for mobile view */}
          <div className="flex items-center sm:hidden">
            {isLoggedIn ? (
              <div className="ml-3 relative">
                <button
                  onClick={toggleAvatarDropdown}
                  className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
                >
                  <span className="sr-only">Open user menu</span>
                  <img
                    alt=""
                    src={user.avatar || "https://via.placeholder.com/150"}
                    className="h-8 w-8 rounded-full"
                  />
                </button>
                {avatarDropdownOpen && (
                  <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      <FiUser className="inline mr-2" /> Your Profile
                    </a>
                    <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                    >
                      <FiLogOut className="inline mr-2" /> Sign out
                    </a>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center">
                <a
                  href="/login"
                  className="text-sm text-gray-700 hover:text-black px-3 py-2"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="text-sm text-gray-700 hover:text-black px-3 py-2"
                >
                  Register
                </a>
              </div>
            )}
          </div>

          {/* Desktop Menu Items */}
          <div className="hidden sm:flex sm:space-x-4 sm:ml-6">
            {navigation.map((item) =>
              item.dropdown ? (
                <div key={item.name} className="relative dropdown">
                  <button
                    className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900 mt-1"
                    onClick={() => toggleDropdown(item.name)}
                  >
                    <span>{item.name}</span>
                    <FiChevronDown aria-hidden="true" className="h-5 w-5" />
                  </button>

                  <div
                    className={`absolute left-1/2 z-10 mt-2 w-screen max-w-lg -translate-x-1/2 transition-all duration-200 ease-out transform ${
                      openDropdown === item.name
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 -translate-y-4"
                    } ${openDropdown !== item.name && "pointer-events-none"}`}
                  >
                    <div className="w-full flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                      <div className="p-4">
                        {item.content.map((contentItem) => (
                          <div
                            key={contentItem.name}
                            className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50"
                          >
                            <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                              <contentItem.icon
                                aria-hidden="true"
                                className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                              />
                            </div>
                            <div>
                              <a
                                href={contentItem.href}
                                className="font-semibold text-gray-900"
                              >
                                {contentItem.name}
                                <span className="absolute inset-0" />
                              </a>
                              <p className="mt-1 text-gray-600">
                                {contentItem.description}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                        {callsToAction.map((ctaItem) => (
                          <a
                            key={ctaItem.name}
                            href={ctaItem.href}
                            className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
                          >
                            <ctaItem.icon
                              aria-hidden="true"
                              className="h-5 w-5 flex-none text-gray-400"
                            />
                            {ctaItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  aria-current={item.current ? "page" : undefined}
                  className={classNames(
                    item.current
                      ? "bg-gray-200 text-black"
                      : "text-gray-700 hover:bg-gray-100 hover:text-black",
                    "rounded-md px-3 py-2 text-sm font-medium"
                  )}
                >
                  {item.name}
                </a>
              )
            )}
          </div>

          {/* Right-side content for larger screens */}
          <div className="hidden sm:flex sm:items-center">
            {isLoggedIn ? (
              <>
                <div className="ml-3 relative">
                  <button
                    onClick={toggleAvatarDropdown}
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2 focus:ring-offset-white"
                  >
                    <span className="sr-only">Open user menu</span>
                    <img
                      alt=""
                      src={user.avatar || "https://via.placeholder.com/150"}
                      className="h-8 w-8 rounded-full"
                    />
                  </button>
                  {avatarDropdownOpen && (
                    <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-10">
                      <a
                        href="/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        <FiUser className="inline mr-2" /> Your Profile
                      </a>
                      <a
                        onClick={handleLogout}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                      >
                        <FiLogOut className="inline mr-2" /> Sign out
                      </a>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <a
                  href="/login"
                  className="text-sm text-gray-700 hover:text-black px-3 py-2"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="text-sm text-gray-700 hover:text-black px-3 py-2"
                >
                  Register
                </a>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="sm:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-900 hover:text-indigo-600 block px-3 py-2 rounded-md text-base font-medium"
              >
                {item.name}
              </a>
            ))}
          </div>
          {isLoggedIn && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-2 space-y-1">
                <a
                  href="/profile"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600"
                >
                  Your Profile
                </a>
                <a
                  onClick={handleLogout}
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600 cursor-pointer"
                >
                  Sign out
                </a>
              </div>
            </div>
          )}
          {!isLoggedIn && (
            <div className="pt-4 pb-3 border-t border-gray-200">
              <div className="px-2 space-y-1">
                <a
                  href="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600"
                >
                  Login
                </a>
                <a
                  href="/register"
                  className="block px-3 py-2 rounded-md text-base font-medium text-gray-900 hover:text-indigo-600"
                >
                  Register
                </a>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}
