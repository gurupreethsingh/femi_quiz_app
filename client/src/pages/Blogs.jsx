import { useState } from "react";
import { FiSearch, FiList, FiGrid, FiSquare } from "react-icons/fi"; // Importing icons from react-icons
import { Link } from "react-router-dom"; // Importing Link from react-router-dom

const posts = [
  {
    id: 1,
    title: "Boost your conversion rate",
    href: "/blogs/1", // Updated href for linking to single blog page
    description:
      "Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl: "https://via.placeholder.com/400x400", // Adjusted image URL to be square
    category: { title: "Marketing", href: "#" },
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 2,
    title: "How to use SEO effectively",
    href: "/blogs/2", // Updated href for linking to single blog page
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla.",
    date: "Apr 22, 2021",
    datetime: "2021-04-22",
    imageUrl: "https://via.placeholder.com/400x400", // Adjusted image URL to be square
    category: { title: "SEO", href: "#" },
    author: {
      name: "Alex Johnson",
      role: "SEO Specialist",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
  {
    id: 3,
    title: "How to become a full stack developer.",
    href: "/blogs/3", // Updated href for linking to single blog page
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla et euismod nulla.",
    date: "Apr 22, 2021",
    datetime: "2022-04-22",
    imageUrl: "https://via.placeholder.com/400x400", // Adjusted image URL to be square
    category: { title: "FULL STACK DEVELOPER", href: "#" },
    author: {
      name: "Alex Johnson",
      role: "DEVELOPER Specialist",
      href: "#",
      imageUrl:
        "https://images.unsplash.com/photo-1506784983877-45594efa4cbe?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    },
  },
];

export default function Blogs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [view, setView] = useState("grid");

  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0 flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the Blog
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
          {filteredPosts.map((post) => (
            <Link
              to={post.href} // Link to the single blog page
              key={post.id}
              className={`flex flex-col ${
                view === "list" ? "sm:flex-row sm:items-start" : "items-start"
              }`}
            >
              <img
                src={post.imageUrl}
                alt={post.title}
                className={`${
                  view === "list"
                    ? "w-48 h-48 object-cover rounded-md"
                    : "w-full h-48 object-cover rounded-t-md"
                }`}
              />
              <div className={`${view === "list" ? "sm:ml-6" : "mt-6"}`}>
                <div className="flex items-center gap-x-4 text-xs sm:mt-0">
                  <time dateTime={post.datetime} className="text-gray-500">
                    {post.date}
                  </time>
                  <a
                    href={post.category.href}
                    className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 hover:bg-gray-100"
                  >
                    {post.category.title}
                  </a>
                </div>
                <div className="group relative">
                  <h3 className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    {post.title}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-sm leading-6 text-gray-600">
                    {post.description}
                  </p>
                </div>
                <div className="relative mt-4 flex items-center gap-x-4">
                  <img
                    alt={post.author.name}
                    src={post.author.imageUrl}
                    className="h-10 w-10 rounded-full bg-gray-50"
                  />
                  <div className="text-sm leading-6">
                    <p className="font-semibold text-gray-900">
                      {post.author.name}
                    </p>
                    <p className="text-gray-600">{post.author.role}</p>
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
