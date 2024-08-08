import { FiMail, FiMapPin, FiHome, FiGlobe, FiUser } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function SingleUser() {
  return (
    <div className="bg-white py-12 sm:py-24 flex justify-center">
      <div className="max-w-4xl px-6 lg:px-8 w-full">
        <div className="flex items-start mb-12">
          <div className="w-48 h-48 rounded-md overflow-hidden border border-gray-300">
            <img
              src="https://via.placeholder.com/150" // Dummy image placeholder
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-10 flex-1">
            <h1 className="text-4xl font-bold text-gray-900">Jeremy Rose</h1>
            <p className="text-blue-600 text-lg mt-2">Product Designer</p>
            <div className="mt-4 flex items-center text-gray-700">
              <FiMapPin className="text-blue-600 h-5 w-5 mr-2" />
              <span className="text-xl font-semibold">New York, NY</span>
            </div>
            <div className="mt-4 flex items-center text-gray-700">
              <FiGlobe className="text-blue-600 h-5 w-5 mr-2" />
              <span className="text-lg">United States</span>
            </div>
          </div>
        </div>

        <div>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <h2 className="text-3xl font-semibold text-gray-900">
                Personal Information
              </h2>
              <p className="mt-1 text-lg text-gray-600">
                Below is the personal information of the user.
              </p>

              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    <FiUser className="inline mr-2" />
                    First Name
                  </label>
                  <p className="mt-1 text-lg text-gray-900">Jeremy</p>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    <FiUser className="inline mr-2" />
                    Last Name
                  </label>
                  <p className="mt-1 text-lg text-gray-900">Rose</p>
                </div>

                <div className="sm:col-span-4">
                  <label className="block text-sm font-medium text-gray-700">
                    <FiMail className="inline mr-2" />
                    Email Address
                  </label>
                  <p className="mt-1 text-lg text-gray-900">
                    hello@jeremyrose.com
                  </p>
                </div>

                <div className="sm:col-span-3">
                  <label className="block text-sm font-medium text-gray-700">
                    <FiHome className="inline mr-2" />
                    Country
                  </label>
                  <p className="mt-1 text-lg text-gray-900">United States</p>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium text-gray-700">
                    <FiMapPin className="inline mr-2" />
                    Street Address
                  </label>
                  <p className="mt-1 text-lg text-gray-900">
                    525 E 68th Street, New York, NY 10021-78 156-187-60
                  </p>
                </div>

                <div className="sm:col-span-2 sm:col-start-1">
                  <label className="block text-sm font-medium text-gray-700">
                    <FiMapPin className="inline mr-2" />
                    City
                  </label>
                  <p className="mt-1 text-lg text-gray-900">New York</p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <FiMapPin className="inline mr-2" />
                    State / Province
                  </label>
                  <p className="mt-1 text-lg text-gray-900">NY</p>
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-sm font-medium text-gray-700">
                    <FiMapPin className="inline mr-2" />
                    ZIP / Postal Code
                  </label>
                  <p className="mt-1 text-lg text-gray-900">10021</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex items-center justify-end gap-x-6">
          <Link
            to="/all-users"
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Back to All Users
          </Link>
        </div>
      </div>
    </div>
  );
}
