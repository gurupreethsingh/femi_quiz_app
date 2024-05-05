import React from "react";
import { Form } from "antd";
import { Link } from "react-router-dom";

const Login = () => {
  // onFinish function.
  const onFinish = (values) => {
    console.log(values);
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
