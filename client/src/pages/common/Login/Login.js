import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { loginUser } from "../../../apicalls/users";
import { useDispatch } from "react-redux";
import { ShowLoading, HideLoading } from "../../../redux/loaderSlice";

const Login = () => {
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    try {
      dispatch(ShowLoading());
      const response = await loginUser(values);
      dispatch(HideLoading());
      if (response.success) {
        message.success(response.message);
        localStorage.setItem("token", response.data);
        // after successful login take the user to the home page.
        window.location.href = "/";
      } else {
        message.error(response.message);
      }
    } catch (error) {
      dispatch(HideLoading);
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="card w-400 p-5">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold pb-3 text-gray-500">Sign In</h1>
          <div className="divider"></div>

          <Form
            layout="vertical pt-3"
            className="text-gray-500"
            onFinish={onFinish}
          >
            <Form.Item name="email" label="Email">
              <input type="email" required />
            </Form.Item>

            <Form.Item name="password" label="Password">
              <input type="password" required />
            </Form.Item>

            <button
              type="submit"
              className="primary-contained-btn font-semibold rounded w-100"
            >
              LOGIN
            </button>

            <div className="mt-3">
              <Link to="/register" className="underline">
                Need Account ? Register
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
