import React from "react";
import { Form, message } from "antd";
import { Link } from "react-router-dom";
import { registerUser } from "../../../apicalls/users";

const Register = () => {
  // onFinish function.
  const onFinish = async (values) => {
    try {
      const response = await registerUser(values);
      if (response.success) {
        message.success(response.message);
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen w-screen">
      <div className="card w-400 p-5">
        <div className="flex flex-col">
          <h1 className="text-3xl font-semibold pb-3 text-gray-500">
            Register
          </h1>
          <div className="divider"></div>

          <Form
            layout="vertical pt-3"
            className="text-gray-500"
            onFinish={onFinish}
          >
            <Form.Item name="name" label="Name">
              <input type="text" required />
            </Form.Item>

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
              REGISTER
            </button>

            <div className="mt-3">
              <Link to="/login" className="underline">
                Have an account ? Login
              </Link>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
