import { Link } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiClock,
  FiUser,
  FiFileText,
} from "react-icons/fi";

const SingleExam = () => {
  const exam = {
    id: 1,
    title: "Final Exam: Web Development",
    description:
      "This is the main content of the exam. The final exam covers all the topics discussed throughout the course. It includes multiple-choice questions, short answers, and coding challenges.",
    duration: "3 hours",
    date: "Mar 16, 2024",
    datetime: "2024-03-16",
    createdBy: {
      name: "Dr. Michael Foster",
      role: "Course Instructor",
    },
    imageUrl: "https://via.placeholder.com/300x300", // Exam image placeholder
    instructions: [
      "Read all the questions carefully.",
      "You can skip and return to questions later.",
      "Ensure you submit your exam before the time limit.",
      "Do not refresh the page during the exam.",
      "Make sure you have a stable internet connection.",
    ],
  };

  return (
    <div className="bg-white py-12 sm:py-24 flex justify-center">
      <div className="max-w-3xl px-6 lg:px-8 w-full flex">
        {/* Left Section - Exam Image */}
        <div className="w-48 h-48 rounded-md overflow-hidden border border-gray-300 mr-8">
          <img
            src={exam.imageUrl}
            alt="Exam"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Right Section - Exam Details */}
        <div className="flex-1">
          <article className="mb-12">
            <header className="mb-6">
              <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
                {exam.title}
              </h1>
              <div className="flex items-center justify-between">
                <time dateTime={exam.datetime} className="text-gray-500">
                  {exam.date}
                </time>
                <p className="text-gray-900 font-medium">
                  Created by: {exam.createdBy.name} ({exam.createdBy.role})
                </p>
              </div>
            </header>

            <section className="mb-6">
              <div className="flex items-center text-gray-700">
                <FiClock className="text-blue-600 h-5 w-5 mr-2" />
                <span className="text-lg font-semibold">
                  Duration: {exam.duration}
                </span>
              </div>
              <p className="text-lg text-gray-700 mt-4">{exam.description}</p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">
                Exam Instructions
              </h2>
              <ul className="list-disc list-inside text-lg text-gray-700">
                {exam.instructions.map((instruction, index) => (
                  <li key={index}>{instruction}</li>
                ))}
              </ul>
            </section>

            <div className="mt-6 flex items-center justify-start">
              <Link
                to="/take-exam"
                className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Take Exam
              </Link>
            </div>

            <footer className="flex justify-between mt-12"></footer>
          </article>
        </div>
      </div>
    </div>
  );
};

export default SingleExam;
