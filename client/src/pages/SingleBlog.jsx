import { useState } from "react";
import { Link } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiChevronDown,
  FiSearch,
} from "react-icons/fi";

const SingleBlog = () => {
  const [showMoreContent, setShowMoreContent] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const toggleMoreContent = () => {
    setShowMoreContent(!showMoreContent);
  };

  const blog = {
    id: 1,
    title: "Boost your conversion rate",
    description:
      "This is the main content of the blog. Illo sint voluptas. Error voluptates culpa eligendi. Hic vel totam vitae illo. Non aliquid explicabo necessitatibus unde. Sed exercitationem placeat consectetur nulla deserunt vel. Iusto corrupti dicta.",
    date: "Mar 16, 2020",
    datetime: "2020-03-16",
    imageUrl: "https://via.placeholder.com/800x400", // Main image
    author: {
      name: "Michael Foster",
      role: "Co-Founder / CTO",
    },
  };

  const categories = ["Marketing", "SEO", "Development", "Design", "Business"];

  const allBlogs = [
    {
      id: 1,
      title: "Boost your conversion rate",
      href: "/single-blog/1",
      imageUrl: "https://via.placeholder.com/150x150",
      category: "Marketing",
    },
    {
      id: 2,
      title: "How to use SEO effectively",
      href: "/single-blog/2",
      imageUrl: "https://via.placeholder.com/150x150",
      category: "SEO",
    },
    {
      id: 3,
      title: "How to become a full stack developer.",
      href: "/single-blog/3",
      imageUrl: "https://via.placeholder.com/150x150",
      category: "Development",
    },
    {
      id: 4,
      title: "Design Principles for Beginners",
      href: "/single-blog/4",
      imageUrl: "https://via.placeholder.com/150x150",
      category: "Design",
    },
    {
      id: 5,
      title: "SEO Tips and Tricks",
      href: "/single-blog/5",
      imageUrl: "https://via.placeholder.com/150x150",
      category: "SEO",
    },
  ];

  const filteredBlogs = allBlogs.filter((blog) =>
    blog.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const previousBlog = {
    id: 0,
    title: "Previous Blog Title",
    href: "/single-blog/0",
  };

  const nextBlog = {
    id: 2,
    title: "Next Blog Title",
    href: "/single-blog/2",
  };

  return (
    <div className="bg-white py-12 sm:py-24 flex justify-center">
      <div className="max-w-3xl px-6 lg:px-8 w-full">
        <article className="mb-12">
          <header className="mb-6">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
              {blog.title}
            </h1>
            <div className="flex items-center justify-between">
              <time dateTime={blog.datetime} className="text-gray-500">
                {blog.date}
              </time>
              <p className="text-gray-900 font-medium">
                Written by: {blog.author.name} ({blog.author.role})
              </p>
            </div>
          </header>

          <section className="mb-6">
            <p className="text-lg text-gray-700">{blog.description}</p>
          </section>

          <section className="mb-8">
            <img
              src={blog.imageUrl}
              alt={blog.title}
              className="w-full h-auto rounded-md mb-4"
            />
          </section>

          <div className="mb-6">
            <button
              onClick={toggleMoreContent}
              className="flex items-center text-indigo-600 hover:text-indigo-800 focus:outline-none"
            >
              <FiChevronDown
                className={`transform transition-transform ${
                  showMoreContent ? "rotate-180" : ""
                }`}
              />
              <span className="ml-2 text-lg">
                {showMoreContent ? "Show Less" : "Read More"}
              </span>
            </button>
            {showMoreContent && (
              <section className="mt-4">
                <p className="text-lg text-gray-700">
                  This is more content that was hidden. Lorem ipsum dolor sit
                  amet, consectetur adipiscing elit. Nulla et euismod nulla.
                </p>
              </section>
            )}
          </div>

          <footer className="flex justify-between mt-12">
            <Link
              to={previousBlog.href}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <FiChevronLeft className="mr-2" />
              <span>{previousBlog.title}</span>
            </Link>
            <Link
              to={nextBlog.href}
              className="flex items-center text-indigo-600 hover:text-indigo-800"
            >
              <span>{nextBlog.title}</span>
              <FiChevronRight className="ml-2" />
            </Link>
          </footer>
        </article>
      </div>

      {/* Sidebar */}
      <aside className="max-w-xs w-full pl-8 hidden lg:block">
        {/* Search Field */}
        <div className="mb-8">
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
        </div>

        {/* Categories */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Categories
          </h3>
          <ul className="space-y-2">
            {categories.map((category) => (
              <li key={category}>
                <Link
                  to="#"
                  className="text-lg text-gray-700 hover:text-indigo-600"
                >
                  {category}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Other Blogs */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            Other Blogs
          </h3>
          <ul className="space-y-4">
            {filteredBlogs.map((otherBlog) => (
              <li key={otherBlog.id} className="flex items-center">
                <img
                  src={otherBlog.imageUrl}
                  alt={otherBlog.title}
                  className="w-16 h-16 rounded-md mr-4"
                />
                <Link
                  to={otherBlog.href}
                  className="text-lg text-gray-700 hover:text-indigo-600"
                >
                  {otherBlog.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default SingleBlog;
