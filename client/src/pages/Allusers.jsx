import { useState } from "react";
import { FiSearch, FiList, FiGrid, FiSquare } from "react-icons/fi"; // Importing icons from react-icons
import { Link } from "react-router-dom"; // Importing Link from react-router-dom

const users = [
  {
    id: 1,
    name: "Michael Foster",
    role: "Co-Founder / CTO",
    email: "michael@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 2,
    name: "Alex Johnson",
    role: "SEO Specialist",
    email: "alex@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
  {
    id: 3,
    name: "Jane Doe",
    role: "Software Engineer",
    email: "jane@example.com",
    imageUrl:
      "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
  },
];

export default function AllUsers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("grid");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All Users
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
          className={`mx-auto mt-10 grid max-w-2xl gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none ${
            view === "grid"
              ? "lg:grid-cols-3"
              : view === "list"
              ? "lg:grid-cols-1"
              : "lg:grid-cols-2"
          }`}
        >
          {filteredUsers.map((user) => (
            <Link
              to={`/single-user/${user.id}`} // Link to the single user page
              key={user.id}
              className={`flex flex-col ${
                view === "list" ? "sm:flex-row sm:items-start" : "items-start"
              }`}
            >
              <img
                src={user.imageUrl}
                alt={user.name}
                className={`${
                  view === "list"
                    ? "w-48 h-48 object-cover rounded-md"
                    : "w-full h-48 object-cover rounded-t-md"
                }`}
              />
              <div className={`${view === "list" ? "sm:ml-6" : "mt-6"}`}>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    {user.name}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {user.role}
                  </p>
                </div>
                <div className="relative mt-4 flex items-center gap-x-4">
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">{user.email}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
