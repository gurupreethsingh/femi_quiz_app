import React from "react";
import { Link } from "react-router-dom";

const TeacherApprovalPending = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-4">
      <div className="text-center max-w-2xl">
        <h1 className="text-4xl font-bold mb-6">
          Thank You for Registering as a Teacher
        </h1>
        <p className="text-lg mb-6">
          Your registration is currently pending approval from the Admin. Once
          approved, you will be able to access the Teacher's dashboard and other
          teacher-related pages.
        </p>

        <p className="mt-10 text-lg">
          Until your account is approved, you won't be able to visit any
          teacher-specific pages or access teacher functionalities.
        </p>
        <div className="mt-8">
          <Link
            to="/"
            className="inline-block text-lg transition-transform transform hover:scale-110 hover:text-yellow-300"
          >
            Go to Home Page &rarr;
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TeacherApprovalPending;
