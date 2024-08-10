import React from "react";
import {
  FaTwitter,
  FaLinkedin,
  FaList,
  FaThLarge,
  FaRegCreditCard,
  FaQuoteLeft,
  FaUserCircle,
  FaBriefcase,
} from "react-icons/fa";

const people = [
  {
    name: "Leslie Alexander",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    socialHandles: {
      twitter: "@lesliealexander",
      linkedin: "/in/lesliealexander",
    },
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    role: "CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1502767089025-6572583495b9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    socialHandles: {
      twitter: "@michaelfoster",
      linkedin: "/in/michaelfoster",
    },
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Lindsay Walton",
    role: "Chief Marketing Officer",
    imageUrl:
      "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    socialHandles: {
      twitter: "@lindsaywalton",
      linkedin: "/in/lindsaywalton",
    },
    lastSeen: null,
  },
  // More people can be added here...
];

export default function About() {
  const [view, setView] = React.useState("grid");

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8 xl:grid xl:grid-cols-3 xl:gap-x-8">
        <div className="max-w-2xl xl:col-span-1">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Meet Our Team Of Teachers
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Welcome to our "Meet Our Teachers" section, where you can get to
            know the dedicated educators who are at the heart of our learning
            community. Our teachers bring a wealth of knowledge, experience, and
            passion to their classrooms, fostering an environment where students
            are encouraged to explore, discover, and grow. Each teacher is
            committed to providing a supportive and challenging atmosphere that
            not only meets academic standards but also nurtures personal
            development and lifelong learning. With diverse backgrounds and a
            shared dedication to education, our teachers are here to inspire and
            guide students on their journey to success.
          </p>
        </div>

        <div className="xl:col-span-2">
          <div className="flex justify-end">
            <button
              className={`mr-4 ${
                view === "list" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("list")}
            >
              <FaList />
            </button>
            <button
              className={`mr-4 ${
                view === "grid" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("grid")}
            >
              <FaThLarge />
            </button>
            <button
              className={`${
                view === "card" ? "text-indigo-600" : "text-gray-600"
              }`}
              onClick={() => setView("card")}
            >
              <FaRegCreditCard />
            </button>
          </div>

          <ul
            role="list"
            className={`mt-12 grid gap-8 ${
              view === "list"
                ? "grid-cols-1"
                : view === "grid"
                ? "sm:grid-cols-2 lg:grid-cols-3"
                : "sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3"
            }`}
          >
            {people.map((person) => (
              <li
                key={person.name}
                className={`flex ${
                  view === "list"
                    ? "flex-row items-center justify-between gap-x-6 py-5"
                    : "flex-col items-center text-center"
                }`}
                style={
                  view === "card"
                    ? {
                        padding: "20px",
                        border: "1px solid #e5e7eb",
                        borderRadius: "8px",
                      }
                    : {}
                }
              >
                <img
                  alt={person.name}
                  src={person.imageUrl}
                  className={`${
                    view === "list"
                      ? "h-20 w-20"
                      : view === "card"
                      ? "h-40 w-40"
                      : "h-32 w-32"
                  } rounded-lg object-cover`}
                />
                <div
                  className={
                    view === "list" ? "min-w-0 flex-auto" : "mt-4 text-center"
                  }
                >
                  <h3 className="text-lg font-semibold leading-7 text-gray-900">
                    {person.name}
                  </h3>
                  <p className="text-sm font-semibold leading-6 text-indigo-600">
                    {person.role}
                  </p>
                  {view === "list" && (
                    <div className="mt-2 flex space-x-4">
                      <a
                        href={`https://twitter.com/${person.socialHandles.twitter}`}
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <FaTwitter />
                      </a>
                      <a
                        href={`https://linkedin.com${person.socialHandles.linkedin}`}
                        className="text-gray-500 hover:text-gray-900"
                      >
                        <FaLinkedin />
                      </a>
                    </div>
                  )}
                </div>
                {view === "list" && (
                  <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
                    <p className="text-sm leading-6 text-gray-900">
                      {person.role}
                    </p>
                    {person.lastSeen ? (
                      <p className="mt-1 text-xs leading-5 text-gray-500">
                        Last seen{" "}
                        <time dateTime={person.lastSeenDateTime}>
                          {person.lastSeen}
                        </time>
                      </p>
                    ) : (
                      <div className="mt-1 flex items-center gap-x-1.5">
                        <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                          <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        </div>
                        <p className="text-xs leading-5 text-gray-500">
                          Online
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="mt-20 bg-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900">Testimonials</h3>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaQuoteLeft className="text-indigo-600 h-8 w-8 mb-4" />
              <p className="text-gray-700">
                "This school has transformed my child's life. The teachers are
                incredibly supportive and knowledgeable."
              </p>
              <div className="mt-4 flex items-center">
                <FaUserCircle className="text-gray-400 h-10 w-10" />
                <div className="ml-4">
                  <p className="text-gray-900 font-semibold">John Doe</p>
                  <p className="text-gray-500 text-sm">Parent</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaQuoteLeft className="text-indigo-600 h-8 w-8 mb-4" />
              <p className="text-gray-700">
                "The dedication and care from the staff at this school are
                unmatched. My child loves going to school every day."
              </p>
              <div className="mt-4 flex items-center">
                <FaUserCircle className="text-gray-400 h-10 w-10" />
                <div className="ml-4">
                  <p className="text-gray-900 font-semibold">Jane Smith</p>
                  <p className="text-gray-500 text-sm">Parent</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md">
              <FaQuoteLeft className="text-indigo-600 h-8 w-8 mb-4" />
              <p className="text-gray-700">
                "Excellent teaching staff and a nurturing environment for
                children to grow and learn."
              </p>
              <div className="mt-4 flex items-center">
                <FaUserCircle className="text-gray-400 h-10 w-10" />
                <div className="ml-4">
                  <p className="text-gray-900 font-semibold">Samuel Green</p>
                  <p className="text-gray-500 text-sm">Parent</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Our Clients Section */}
      <div className="mt-20 py-12">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <h3 className="text-2xl font-bold text-gray-900">Our Clients</h3>
          <div className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-8">
            <div>
              <img
                className="mx-auto h-16"
                src="https://via.placeholder.com/150"
                alt="Client Logo"
              />
            </div>
            <div>
              <img
                className="mx-auto h-16"
                src="https://via.placeholder.com/150"
                alt="Client Logo"
              />
            </div>
            <div>
              <img
                className="mx-auto h-16"
                src="https://via.placeholder.com/150"
                alt="Client Logo"
              />
            </div>
            <div>
              <img
                className="mx-auto h-16"
                src="https://via.placeholder.com/150"
                alt="Client Logo"
              />
            </div>
          </div>
        </div>
      </div>

      {/* General Details Section */}
      <div className="mt-20 py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center">
            General Information
          </h3>
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="flex items-start">
              <FaBriefcase className="text-indigo-600 h-10 w-10" />
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Our Mission
                </h4>
                <p className="mt-2 text-gray-600">
                  To provide a nurturing environment that helps every student
                  achieve their full potential academically and personally.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaUserCircle className="text-indigo-600 h-10 w-10" />
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Our Vision
                </h4>
                <p className="mt-2 text-gray-600">
                  To be a leader in education, recognized for our innovative
                  teaching methods and commitment to student success.
                </p>
              </div>
            </div>

            <div className="flex items-start">
              <FaTwitter className="text-indigo-600 h-10 w-10" />
              <div className="ml-4">
                <h4 className="text-lg font-semibold text-gray-900">
                  Follow Us
                </h4>
                <p className="mt-2 text-gray-600">
                  Stay connected with us through our social media channels for
                  the latest news and updates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
