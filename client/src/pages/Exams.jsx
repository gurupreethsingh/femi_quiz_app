import { useState } from "react";
import { FiSearch, FiList, FiGrid, FiSquare } from "react-icons/fi";
import { Link } from "react-router-dom";

const exams = [
  {
    id: 1,
    title: "Math Midterm Exam",
    href: "/exams/math-midterm",
    description:
      "The comprehensive midterm exam covering algebra, geometry, and calculus.",
    date: "Jan 10, 2024",
    datetime: "2024-01-10",
    imageUrl: "https://via.placeholder.com/400x400",
    category: "Math",
  },
  {
    id: 2,
    title: "Physics Final Exam",
    href: "/exams/physics-final",
    description:
      "A final exam testing knowledge on mechanics, electricity, and magnetism.",
    date: "Feb 14, 2024",
    datetime: "2024-02-14",
    imageUrl: "https://via.placeholder.com/400x400",
    category: "Physics",
  },
  {
    id: 3,
    title: "Chemistry Quiz",
    href: "/exams/chemistry-quiz",
    description:
      "A short quiz covering the basics of organic and inorganic chemistry.",
    date: "Mar 21, 2024",
    datetime: "2024-03-21",
    imageUrl: "https://via.placeholder.com/400x400",
    category: "Chemistry",
  },
  {
    id: 4,
    title: "History Assessment",
    href: "/exams/history-assessment",
    description:
      "An assessment on world history, covering ancient to modern times.",
    date: "Apr 15, 2024",
    datetime: "2024-04-15",
    imageUrl: "https://via.placeholder.com/400x400",
    category: "History",
  },
  {
    id: 5,
    title: "Biology Lab Exam",
    href: "/exams/biology-lab",
    description:
      "A practical lab exam testing knowledge on human anatomy and physiology.",
    date: "May 20, 2024",
    datetime: "2024-05-20",
    imageUrl: "https://via.placeholder.com/400x400",
    category: "Biology",
  },
  // Add more exams here as needed
];

export default function Exams() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("grid");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredExams = exams.filter(
    (exam) =>
      exam.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (activeCategory === "All" || exam.category === activeCategory)
  );

  const categories = [
    "All",
    "Math",
    "Physics",
    "Chemistry",
    "History",
    "Biology",
  ];

  return (
    <div className="bg-white py-12 sm:py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            All Exams
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

        {/* Category Filters */}
        <div className="flex flex-wrap mb-8">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`mr-2 mb-2 px-3 py-1.5 text-sm font-medium rounded ${
                activeCategory === category
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-200 text-gray-700"
              }`}
            >
              {category}
            </button>
          ))}
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
          {filteredExams.map((exam) => (
            <Link
              to={exam.href}
              key={exam.id}
              className={`flex flex-col ${
                view === "list" ? "sm:flex-row sm:items-start" : "items-start"
              }`}
            >
              <img
                src={exam.imageUrl}
                alt={exam.title}
                className={`${
                  view === "list"
                    ? "w-48 h-48 object-cover rounded-md"
                    : "w-full h-48 object-cover rounded-t-md"
                }`}
              />
              <div className={`${view === "list" ? "sm:ml-6" : "mt-6"}`}>
                <div className="flex items-center gap-x-4 text-xs sm:mt-0">
                  <time dateTime={exam.datetime} className="text-gray-500">
                    {exam.date}
                  </time>
                  <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600">
                    {exam.category}
                  </span>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    {exam.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {exam.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
