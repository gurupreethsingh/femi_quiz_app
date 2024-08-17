// pagination admin dashboard

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

export default function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("grid");
  const [admins, setAdmins] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 8; // Number of users to display per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        // Fetch the counts for admins, teachers, and students
        const response = await axios.get(
          "http://localhost:5000/api/all-users",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const {
          admins: adminCount,
          teachers: teacherCount,
          students: studentCount,
          totalUsers,
        } = response.data;

        // Now we need to fetch details for each type of user based on their counts
        const [adminDetails, teacherDetails, studentDetails] =
          await Promise.all([
            axios.get("http://localhost:5000/api/all-admins", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:5000/api/all-teachers", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:5000/api/all-students", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]);

        setAdmins(adminDetails.data);
        setTeachers(teacherDetails.data);
        setStudents(studentDetails.data);
        setTotalUsers(totalUsers);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const filteredUsers = [...admins, ...teachers, ...students].filter((user) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      user.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.role?.toLowerCase().includes(lowerCaseSearchTerm) ||
      user.address?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  // Pagination logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex justify-between items-center mb-6 p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Admin Dashboard Overview
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
              className={`p-2 rounded ${view === "list" ? "bg-gray-200" : ""}`}
              onClick={() => setView("list")}
            >
              <FiList className="h-6 w-6 text-gray-600" />
            </button>
            <button
              className={`p-2 rounded ${view === "grid" ? "bg-gray-200" : ""}`}
              onClick={() => setView("grid")}
            >
              <FiGrid className="h-6 w-6 text-gray-600" />
            </button>
            <button
              className={`p-2 rounded ${view === "card" ? "bg-gray-200" : ""}`}
              onClick={() => setView("card")}
            >
              <FiSquare className="h-6 w-6 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8 p-6 max-w-7xl mx-auto">
        <Link to="#" className="p-4 bg-white shadow rounded-lg">
          <div className="text-sm font-semibold text-gray-500">Total Users</div>
          <div className="mt-2 text-2xl font-bold">{totalUsers}</div>
        </Link>
        <Link to="/api/all-admins" className="p-4 bg-white shadow rounded-lg">
          <div className="text-sm font-semibold text-gray-500">
            Total Admins
          </div>
          <div className="mt-2 text-2xl font-bold">{admins.length}</div>
          <div className="mt-2 text-sm font-semibold text-gray-500">
            View All Admins
          </div>
        </Link>
        <Link to="/api/all-teachers" className="p-4 bg-white shadow rounded-lg">
          <div className="text-sm font-semibold text-gray-500">
            Total Teachers
          </div>
          <div className="mt-2 text-2xl font-bold">{teachers.length}</div>
          <div className="mt-2 text-sm font-semibold text-gray-500">
            View All Teachers
          </div>
        </Link>
        <Link
          to="/admin-dashboard/students"
          className="p-4 bg-white shadow rounded-lg"
        >
          <div className="text-sm font-semibold text-gray-500">
            Total Students
          </div>
          <div className="mt-2 text-2xl font-bold">{students.length}</div>
        </Link>
      </div>

      {/* Users List/Grid/Card */}
      <div
        className={`mx-auto grid gap-x-6 gap-y-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 p-6 max-w-7xl ${
          view === "grid"
            ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : view === "list"
            ? "lg:grid-cols-1"
            : "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {currentUsers.map((user) => {
          const imageUrl = user.user_image
            ? `http://localhost:5000/${user.user_image.replace(/\\/g, "/")}`
            : "https://via.placeholder.com/150";

          return (
            <Link
              to={`/single-user/${user._id}`}
              key={user._id}
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
                  alt={user.name}
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
                    {user.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {user.role}
                  </p>
                </div>
                <div className="relative mt-2 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">{user.email}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6 p-6 max-w-7xl mx-auto">
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
  );
}
