import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Standard email pattern
    return emailRegex.test(email) && !/\s/.test(email); // No spaces allowed
  };

  const validatePassword = (password) => {
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[^\s]{8,}$/;
    return passwordRegex.test(password) && !/\s/.test(password); // No spaces allowed
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    if (!validateEmail(email)) {
      setError("Invalid email address. Email cannot contain spaces.");
      return;
    }

    if (!validatePassword(password)) {
      setError(
        "Invalid password. Password must be at least 8 characters long, contain one uppercase letter, one lowercase letter, one number, one special character, and cannot contain spaces."
      );
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/admin-login", {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Store token and user information in localStorage
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));

        // Navigate based on user role
        switch (user.role) {
          case "admin":
            navigate("/admin-dashboard");
            break;
          case "teacher":
            navigate("/teacher-dashboard");
            break;
          case "hr":
            navigate("/hr-dashboard");
            break;
          case "student":
            navigate("/student-dashboard");
            break;
          default:
            navigate("/profile");
        }
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Login failed. Please try again."
      );
    }
  };

  return (
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <div className="flex justify-center items-center">
          <FiLogIn className="h-10 w-10 text-indigo-600" />
        </div>
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-500">
          Admin Login
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {error && <div className="text-red-500 text-sm">{error}</div>}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in as Admin
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
