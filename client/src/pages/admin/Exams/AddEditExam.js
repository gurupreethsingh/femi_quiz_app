import React from "react";
import PageTitle from "../../../components/PageTitle";
import { Col, Form, Row, Select } from "antd";

const AddEditExam = () => {
  const onFinish = (values) => {
    console.log("Form submitted.");
    console.log(values);
  };

  return (
    <div>
      <PageTitle title="Add Exam" />

      <div className="w-75 m-auto mt-5 mb-5">
        <Form layout="vertical" onFinish={onFinish}>
          <Row gutter={[20, 20]}>
            <Col span={8}>
              <Form.Item label="Exam Name" name="name">
                <input type="text" className="form-control" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="Exam Duration" name="duration">
                <input type="number" className="form-control" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Category" name="category">
                <Select defaultValue="Select a category">
                  <Select.Option value="javascript">JavaScript</Select.Option>
                  <Select.Option value="java">Java</Select.Option>
                  <Select.Option value="react">React</Select.Option>
                  <Select.Option value="node">Node</Select.Option>
                  <Select.Option value="mongodb">Mongo DB</Select.Option>
                  <Select.Option value="python">Python</Select.Option>
                </Select>
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Total Marks" name="totalMarks">
                <input type="number" className="form-control" />
              </Form.Item>
            </Col>

            <Col span={8}>
              <Form.Item label="Passing Marks" name="passingMarks">
                <input type="number" className="form-control" />
              </Form.Item>
            </Col>
          </Row>

          <div className="flex justify-end">
            <button className="primary-outlined-btn" type="submit">
              Save
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default AddEditExam;
