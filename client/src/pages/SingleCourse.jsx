import { Link } from "react-router-dom";
import { FiPlay, FiUser } from "react-icons/fi";

const SingleCourse = () => {
  const course = {
    id: 1,
    title: "Java Programming Masterclass",
    description:
      "Learn Java from scratch and become a proficient programmer. This course covers everything from the basics to advanced topics.",
    imageUrl: "https://via.placeholder.com/800x400",
    category: "Development",
    price: "$99.99",
    rating: 4.7,
    instructor: "John Doe",
    date: "Jan 10, 2023",
    duration: "25 hours",
    lessons: "180 lessons",
  };

  return (
    <div className="bg-white py-12 sm:py-24 flex justify-center">
      <div className="max-w-3xl px-6 lg:px-8 w-full">
        <div className="mb-8">
          <img
            src={course.imageUrl}
            alt={course.title}
            className="w-full h-auto rounded-md mb-4"
          />
        </div>
        <div className="mb-8">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 mb-4">
            {course.title}
          </h1>
          <div className="flex items-center justify-between mb-6">
            <p className="text-gray-500">
              <FiUser className="inline-block mr-2" /> {course.instructor}
            </p>
            <p className="text-gray-500">{course.date}</p>
          </div>
          <p className="text-lg text-gray-700 mb-6">{course.description}</p>
          <div className="mb-8">
            <p className="text-gray-500">Category: {course.category}</p>
            <p className="text-gray-500">Duration: {course.duration}</p>
            <p className="text-gray-500">Lessons: {course.lessons}</p>
            <p className="text-gray-500">Rating: {course.rating} ★</p>
          </div>
          <div className="flex space-x-4">
            <Link
              to={`/courses/${course.id}/demo`}
              className="flex items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500"
            >
              <FiPlay className="mr-2" />
              Watch Demo
            </Link>
            <Link
              to={`/courses/${course.id}/enroll`}
              className="flex items-center justify-center rounded-md bg-green-600 px-4 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-green-500"
            >
              Enroll Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
