import React, { useState, useEffect } from "react";
import {
  FiSearch,
  FiList,
  FiGrid,
  FiSquare,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AllAdmins() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("grid");
  const [admins, setAdmins] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const adminsPerPage = 8;

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/all-admins",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setAdmins(response.data);
        } else {
          console.error("Failed to fetch admins.");
        }
      } catch (err) {
        console.error("Error fetching admins:", err);
      }
    };
    fetchAdmins();
  }, []);

  const filteredAdmins = admins.filter((admin) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      admin.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      admin.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      admin.role?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // Pagination logic
  const indexOfLastAdmin = currentPage * adminsPerPage;
  const indexOfFirstAdmin = indexOfLastAdmin - adminsPerPage;
  const currentAdmins = filteredAdmins.slice(
    indexOfFirstAdmin,
    indexOfLastAdmin
  );
  const totalPages = Math.ceil(filteredAdmins.length / adminsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All Admins
          </h2>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <input
                type="text"
                placeholder="Search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full rounded-md border border-gray-300 bg-white py-2 pl-10 pr-3 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
              <FiSearch className="absolute top-1/2 transform -translate-y-1/2 left-3 h-5 w-5 text-gray-500" />
            </div>
            <div className="flex space-x-2">
              <button
                className={`p-2 rounded ${
                  view === "list" ? "bg-gray-200" : ""
                }`}
                onClick={() => setView("list")}
              >
                <FiList className="h-6 w-6 text-gray-600" />
              </button>
              <button
                className={`p-2 rounded ${
                  view === "grid" ? "bg-gray-200" : ""
                }`}
                onClick={() => setView("grid")}
              >
                <FiGrid className="h-6 w-6 text-gray-600" />
              </button>
              <button
                className={`p-2 rounded ${
                  view === "card" ? "bg-gray-200" : ""
                }`}
                onClick={() => setView("card")}
              >
                <FiSquare className="h-6 w-6 text-gray-600" />
              </button>
            </div>
          </div>
        </div>

        <div
          className={`mx-auto mt-10 grid max-w-2xl gap-x-6 gap-y-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none ${
            view === "grid"
              ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : view === "list"
              ? "lg:grid-cols-1"
              : "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          {currentAdmins.map((admin) => {
            const imageUrl = admin.admin_image
              ? `http://localhost:5000/${admin.admin_image.replace(/\\/g, "/")}`
              : "https://via.placeholder.com/150";

            return (
              <Link
                to={`/single-admin/${admin._id}`}
                key={admin._id}
                className={`flex flex-col rounded-lg overflow-hidden ${
                  view === "list"
                    ? "sm:flex-row sm:items-start items-center"
                    : "items-center"
                }`}
              >
                <div
                  className={`${
                    view === "list"
                      ? "aspect-square w-24 sm:w-32"
                      : view === "grid"
                      ? "aspect-square w-full sm:w-full"
                      : "aspect-square w-full sm:w-full"
                  } bg-gray-200 rounded-md overflow-hidden flex items-center justify-center`}
                >
                  <img
                    src={imageUrl}
                    alt={admin.name}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </div>
                <div
                  className={`${
                    view === "list" ? "sm:ml-6 mt-4 sm:mt-0" : "mt-4"
                  } text-center sm:text-left`}
                >
                  <div className="group relative">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      {admin.name}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                      {admin.role}
                    </p>
                  </div>
                  <div className="relative mt-2 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        {admin.email}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-6">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="p-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            <FiChevronLeft className="h-6 w-6 text-gray-600" />
          </button>
          <span className="text-gray-500">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="p-2 bg-gray-300 rounded-md disabled:opacity-50"
          >
            <FiChevronRight className="h-6 w-6 text-gray-600" />
          </button>
        </div>
      </div>
    </div>
  );
}