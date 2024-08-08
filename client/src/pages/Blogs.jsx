import React, { useState } from "react";

const BlogPage = () => {
  const [openSection, setOpenSection] = useState(null);

  const toggleSection = (section) => {
    setOpenSection(openSection === section ? null : section);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex">
          {/* Sidebar */}
          <aside className="w-1/4 pr-4">
            <div className="bg-white p-4 border shadow-sm">
              <h2 className="text-lg font-semibold mb-4">
                Python Introduction
              </h2>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-blue-600 hover:underline">
                    Get Started With Python
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:underline">
                    Your First Python Program
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:underline">
                    Python Comments
                  </a>
                </li>
              </ul>
              <div className="mt-6">
                <h2
                  onClick={() => toggleSection("fundamentals")}
                  className="text-lg font-semibold mb-4 cursor-pointer flex justify-between items-center"
                >
                  Python Fundamentals
                  <span>{openSection === "fundamentals" ? "-" : "+"}</span>
                </h2>
                {openSection === "fundamentals" && (
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-gray-600 hover:underline">
                        Python Flow Control
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:underline">
                        Python Data Types
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:underline">
                        Python Functions
                      </a>
                    </li>
                    {/* Add more subtopics here */}
                  </ul>
                )}
              </div>
              <div className="mt-6">
                <h2
                  onClick={() => toggleSection("advanced")}
                  className="text-lg font-semibold mb-4 cursor-pointer flex justify-between items-center"
                >
                  Python Advanced Topics
                  <span>{openSection === "advanced" ? "-" : "+"}</span>
                </h2>
                {openSection === "advanced" && (
                  <ul className="space-y-2">
                    <li>
                      <a href="#" className="text-gray-600 hover:underline">
                        Python OOP
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:underline">
                        Python Modules
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-gray-600 hover:underline">
                        Python Exceptions
                      </a>
                    </li>
                    {/* Add more subtopics here */}
                  </ul>
                )}
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 pl-4">
            <div className="bg-white p-6 shadow-sm border rounded-lg">
              <h2 className="text-xl font-bold mb-4">
                Getting Started with Python
              </h2>
              <p className="mb-4">
                Python is a versatile, high-level programming language that is
                widely supported across all major operating systems.
              </p>

              {/* Image Section */}
              <div className="mb-4">
                <img
                  src="https://via.placeholder.com/800x400"
                  alt="Sample Image"
                  className="w-full rounded-md"
                />
                <p className="text-gray-500 text-sm mt-2">
                  Figure 1: Sample image description.
                </p>
              </div>

              <p className="mb-4">
                To execute Python code, you need to have a Python interpreter
                installed on your system. However, if you want to start
                immediately, you can use our free online Python editor that
                enables you to run Python code directly in your browser—no
                installation required.
              </p>

              {/* Code Snippet Section */}
              <div className="bg-gray-800 text-white p-4 rounded mb-4">
                <pre>
                  <code>
                    {`# Python code example
print("Hello, World!")`}
                  </code>
                </pre>
              </div>

              <p className="mb-4">
                For those who prefer to install Python on your computer, this
                guide will walk you through the installation process on Windows,
                macOS, and Linux (Ubuntu).
              </p>

              <h3 className="text-lg font-semibold mb-2">
                Install Python on Windows
              </h3>
              <ol className="list-decimal pl-6 space-y-2">
                <li>Install VS Code</li>
                <li>Download Python Installer File</li>
                <li>Run the Installer</li>
                <li>Install Python</li>
                <li>Verify your installation</li>
              </ol>

              {/* Another Code Snippet Section */}
              <div className="bg-gray-800 text-white p-4 rounded mb-4 mt-4">
                <pre>
                  <code>
                    {`# Python installation verification
python --version`}
                  </code>
                </pre>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
