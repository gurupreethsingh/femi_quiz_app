import React, { useState, useEffect } from "react";
import { FiCamera } from "react-icons/fi";
import axios from "axios";

export default function Profile() {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    designation: "",
    role: "",
  });
  const [profileImage, setProfileImage] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch user data when the component loads
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          setError("No token found, please log in.");
          return;
        }

        const response = await axios.get(
          "http://localhost:5000/api/user/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status === 200) {
          setUserData(response.data);
          setProfileImage(response.data.profileImage);
        } else {
          setError("Failed to fetch user data.");
        }
      } catch (err) {
        setError("Failed to fetch user data.");
        console.error("Error fetching user data:", err);
      }
    };
    fetchUserData();
  }, []);

  // Handle input changes
  const handleChange = (e) => {
    setUserData({
      ...userData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile image upload
  const handleProfileImageUpload = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const token = localStorage.getItem("token");
    if (!token) {
      setError("No token found, please log in.");
      return;
    }

    const formData = new FormData();
    formData.append("name", userData.name || "");
    formData.append("email", userData.email || "");
    formData.append("password", userData.password || "");
    formData.append("phone", userData.phone || "");
    formData.append("address", userData.address || "");
    formData.append("designation", userData.designation || "");
    formData.append("role", userData.role || "");

    if (profileImage) formData.append("profileImage", profileImage);

    try {
      const response = await axios.put(
        "http://localhost:5000/updateUser",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 200) {
        alert("Profile updated successfully!");
        setUserData(response.data); // Set all the updated data
        setProfileImage(response.data.profileImage); // Update profile image
      } else {
        setError("Failed to update profile.");
        console.error("Unexpected response status:", response.status);
      }
    } catch (err) {
      setError("Failed to update profile.");
      console.error("Error updating profile:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white py-12 sm:py-24 flex justify-center">
      <div className="max-w-4xl px-6 lg:px-8 w-full">
        <h2 className="text-3xl font-semibold text-gray-900 mt-2 mb-2">
          User Profile
        </h2>

        <div className="flex items-start mb-12">
          <div className="w-48 h-48 rounded-md overflow-hidden border border-gray-300">
            <img
              src={
                profileImage
                  ? URL.createObjectURL(profileImage)
                  : userData.profileImage
                  ? userData.profileImage
                  : "https://via.placeholder.com/150"
              }
              alt="Profile"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="ml-10 flex-1">
            <h1 className="text-4xl font-bold text-gray-900">
              {userData.name}
            </h1>
            <p className="text-blue-600 text-lg mt-2">{userData.role}</p>
            <div className="mt-6 flex items-center gap-x-3">
              <label
                htmlFor="profileImage"
                className="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-blue-500 cursor-pointer"
              >
                Change Photo
              </label>
              <input
                type="file"
                id="profileImage"
                name="profileImage"
                accept="image/*"
                className="hidden"
                onChange={handleProfileImageUpload}
              />
              <FiCamera className="text-blue-600 h-6 w-6" />
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                <div className="sm:col-span-3">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <div className="mt-2">
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={userData.name || ""}
                      onChange={handleChange}
                      autoComplete="given-name"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-4">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={userData.email || ""}
                      onChange={handleChange}
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Phone
                  </label>
                  <div className="mt-2">
                    <input
                      id="phone"
                      name="phone"
                      type="text"
                      value={userData.phone || ""}
                      onChange={handleChange}
                      autoComplete="tel"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="col-span-full">
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Address
                  </label>
                  <div className="mt-2">
                    <input
                      id="address"
                      name="address"
                      type="text"
                      value={userData.address || ""}
                      onChange={handleChange}
                      autoComplete="street-address"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label
                    htmlFor="designation"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Designation
                  </label>
                  <div className="mt-2">
                    <input
                      id="designation"
                      name="designation"
                      type="text"
                      value={userData.designation || ""}
                      onChange={handleChange}
                      autoComplete="organization-title"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {loading && <p className="text-blue-500 mt-4">Updating profile...</p>}

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
