import React, { useState } from "react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const SingleTutorial = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  const topics = {
    "Getting Started with Python": [
      "Introduction",
      "Installation",
      "Hello World",
    ],
    "Python Basics": ["Variables", "Data Types", "Operators"],
    "Advanced Python": ["Decorators", "Generators", "Concurrency"],
  };

  return (
    <div className="min-h-screen bg-white px-6 py-12 sm:py-24 lg:px-8 flex justify-center">
      <div className="max-w-7xl w-full flex">
        {/* Sidebar */}
        <aside className="w-64 p-6 border-1">
          <h2 className="text-lg font-semibold mb-2 p-2">Blog Topics</h2>
          <hr />
          {Object.keys(topics).map((section) => (
            <div key={section} className="m-4">
              <h3
                className="text-md font-semibold cursor-pointer flex justify-between items-center"
                onClick={() => toggleSection(section)}
              >
                {section}
                {openSection === section ? (
                  <FiChevronUp className="ml-2" />
                ) : (
                  <FiChevronDown className="ml-2" />
                )}
              </h3>
              {openSection === section && (
                <ul className="mt-2 pl-4 space-y-1">
                  {topics[section].map((topic) => (
                    <li key={topic}>
                      <a href="#" className="hover:underline  border-b">
                        {topic}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </aside>

        {/* Main Content */}
        <div className="flex-1 p-4">
          <div className="mb-8">
            <h1 className="text-4xl font-bold tracking-tight mb-4">
              Getting Started with Python
            </h1>
            <div className="mb-8">
              <p className="text-lg mb-6">
                Python is a versatile, high-level programming language that is
                widely supported across all major operating systems.
              </p>
              <p className="text-lg mb-6">
                To execute Python code, you need to have a Python interpreter
                installed on your system. However, if you want to start
                immediately, you can use our free online Python editor that
                enables you to run Python code directly in your browser—no
                installation required.
              </p>
              <p className="text-lg mb-6">
                For those who prefer to install Python on your computer, this
                guide will walk you through the installation process on Windows,
                macOS, and Linux (Ubuntu).
              </p>

              {/* Example Image Section */}
              <div className="mb-8">
                <img
                  src="https://via.placeholder.com/800x400"
                  alt="Python Installation"
                  className="w-full h-auto rounded-md mb-4"
                />
                <p className="text-sm">Fig 1: Python Installation Process</p>
              </div>

              {/* Example Code Snippet Section */}
              <div className="p-4 rounded-md mb-8">
                <h2 className="text-lg font-semibold mb-2">Example Code:</h2>
                <pre className="bg-gray-200 p-4 rounded-md overflow-x-auto">
                  {`# This is a simple Python program
print("Hello, World!")`}
                </pre>
              </div>

              {/* Add more content sections as needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleTutorial;
