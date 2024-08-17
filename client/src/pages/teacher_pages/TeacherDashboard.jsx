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

export default function TeacherDashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("grid");
  const [classes, setClasses] = useState([]);
  const [exams, setExams] = useState([]);
  const [students, setStudents] = useState([]);
  const [events, setEvents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8; // Number of items to display per page

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        // Fetch classes, exams, students, and events data
        const [classData, examData, studentData, eventData] = await Promise.all(
          [
            axios.get("http://localhost:5000/api/teacher-classes", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:5000/api/teacher-exams", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:5000/api/teacher-students", {
              headers: { Authorization: `Bearer ${token}` },
            }),
            axios.get("http://localhost:5000/api/teacher-events", {
              headers: { Authorization: `Bearer ${token}` },
            }),
          ]
        );

        setClasses(classData.data);
        setExams(examData.data);
        setStudents(studentData.data);
        setEvents(eventData.data);
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, []);

  const filteredItems = [...classes, ...exams, ...students, ...events].filter(
    (item) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      return (
        item.name?.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.email?.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.subject?.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.className?.toLowerCase().includes(lowerCaseSearchTerm) ||
        item.eventName?.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }
  );

  // Pagination logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content */}
      <div className="flex justify-between items-center mb-6 p-6 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900">
          Teacher Dashboard Overview
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
        <Link to="/teacher-classes" className="p-4 bg-white shadow rounded-lg">
          <div className="text-sm font-semibold text-gray-500">
            Total Classes
          </div>
          <div className="mt-2 text-2xl font-bold">{classes.length}</div>
        </Link>
        <Link to="/teacher-exams" className="p-4 bg-white shadow rounded-lg">
          <div className="text-sm font-semibold text-gray-500">Total Exams</div>
          <div className="mt-2 text-2xl font-bold">{exams.length}</div>
        </Link>
        <Link to="/teacher-students" className="p-4 bg-white shadow rounded-lg">
          <div className="text-sm font-semibold text-gray-500">
            Total Students
          </div>
          <div className="mt-2 text-2xl font-bold">{students.length}</div>
        </Link>
        <Link to="/teacher-events" className="p-4 bg-white shadow rounded-lg">
          <div className="text-sm font-semibold text-gray-500">
            Total Events
          </div>
          <div className="mt-2 text-2xl font-bold">{events.length}</div>
        </Link>
      </div>

      {/* Actions Section */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-8 p-6 max-w-7xl mx-auto">
        <Link
          to="/teacher-add-exam"
          className="p-4 bg-gray-700 text-white shadow rounded-lg"
        >
          Add New Exam
        </Link>
        <Link
          to="/teacher-assign-questions"
          className="p-4 bg-gray-200 text-white shadow rounded-lg"
        >
          Assign Questions & Answers
        </Link>
        <Link
          to="/teacher-take-attendance"
          className="p-4 bg-gray-700 text-white shadow rounded-lg"
        >
          Take Attendance
        </Link>
        <Link
          to="/teacher-create-event"
          className="p-4 bg-gray-700 text-white shadow rounded-lg"
        >
          Create Event & Assign Students
        </Link>
        <Link
          to="/teacher-make-report"
          className="p-4 bg-gray-700 text-white shadow rounded-lg"
        >
          Make Exam Report
        </Link>
        <Link
          to="/teacher-make-marksheet"
          className="p-4 bg-gray-700 text-white shadow rounded-lg"
        >
          Create Marksheet
        </Link>
        <Link
          to="/teacher-review-questions"
          className="p-4 bg-gray-700 text-white shadow rounded-lg"
        >
          Review & Respond to Questions
        </Link>
      </div>

      {/* Items List/Grid/Card */}
      <div
        className={`mx-auto grid gap-x-6 gap-y-8 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 p-6 max-w-7xl ${
          view === "grid"
            ? "sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
            : view === "list"
            ? "lg:grid-cols-1"
            : "sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {currentItems.map((item) => {
          const imageUrl = item.image
            ? `http://localhost:5000/${item.image.replace(/\\/g, "/")}`
            : "https://via.placeholder.com/150";

          return (
            <Link
              to={`/single-item/${item._id}`}
              key={item._id}
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
                  alt={item.name || item.className || item.subject}
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
                    {item.name ||
                      item.className ||
                      item.subject ||
                      item.eventName}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {item.role ||
                      item.email ||
                      item.subject ||
                      item.eventDescription}
                  </p>
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
