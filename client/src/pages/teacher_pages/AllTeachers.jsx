//
import React, { useState, useEffect } from "react";
import { FiSearch, FiList, FiGrid, FiSquare } from "react-icons/fi";
import { Link } from "react-router-dom";
import axios from "axios";

export default function AllTeachers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("grid");
  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("No token found, please log in.");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/all-teachers",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setTeachers(response.data);
        } else {
          console.error("Failed to fetch teachers.");
        }
      } catch (err) {
        console.error("Error fetching teachers:", err);
      }
    };
    fetchTeachers();
  }, []);

  const handleApprove = async (teacherId) => {
    const confirmApproval = window.confirm(
      "Are you sure you want to approve this teacher?"
    );
    if (!confirmApproval) return;

    try {
      const token = localStorage.getItem("token");

      await axios.patch(
        `http://localhost:5000/api/approve-teacher/${teacherId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(
        "Teacher status has been approved, and an notification has been sent to teacher."
      );
      setTeachers((prevTeachers) =>
        prevTeachers.map((teacher) =>
          teacher._id === teacherId
            ? { ...teacher, status: "Approved" }
            : teacher
        )
      );
    } catch (err) {
      console.error("Error approving teacher:", err);
      alert("Failed to approve teacher. Please try again.");
    }
  };

  const filteredTeachers = teachers.filter((teacher) => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return (
      teacher.name.toLowerCase().includes(lowerCaseSearchTerm) ||
      teacher.email.toLowerCase().includes(lowerCaseSearchTerm) ||
      teacher.role?.toLowerCase().includes(lowerCaseSearchTerm)
    );
  });

  return (
    <div className="bg-white py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All Teachers
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
          {filteredTeachers.map((teacher) => {
            const imageUrl = teacher.teacher_image
              ? `http://localhost:5000/${teacher.teacher_image.replace(
                  /\\/g,
                  "/"
                )}`
              : "https://via.placeholder.com/150";

            return (
              <div
                key={teacher._id}
                className={`flex flex-col rounded-lg overflow-hidden ${
                  view === "list"
                    ? "sm:flex-row sm:items-start items-center"
                    : "items-center"
                }`}
              >
                <Link
                  to={`/single-teacher/${teacher._id}`}
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
                    alt={teacher.name}
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://via.placeholder.com/150";
                    }}
                  />
                </Link>
                <div
                  className={`${
                    view === "list" ? "sm:ml-6 mt-4 sm:mt-0" : "mt-4"
                  } text-center sm:text-left`}
                >
                  <div className="group relative">
                    <h3 className="text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                      {teacher.name}
                    </h3>
                    <p className="mt-2 text-sm text-gray-600">{teacher.role}</p>
                    <p
                      className={`mt-2 text-sm font-semibold ${
                        teacher.status === "Pending"
                          ? "text-red-500"
                          : "text-green-500"
                      }`}
                    >
                      Status: {teacher.status}
                    </p>
                  </div>
                  <div className="relative mt-2 flex items-center gap-x-4">
                    <div className="text-sm leading-6">
                      <p className="font-semibold text-gray-900">
                        {teacher.email}
                      </p>
                    </div>
                  </div>
                  {teacher.status === "Pending" && (
                    <button
                      onClick={() => handleApprove(teacher._id)}
                      className="mt-4 bg-red-500 text-white py-2 px-4 rounded self-center sm:self-start"
                    >
                      Approve
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
