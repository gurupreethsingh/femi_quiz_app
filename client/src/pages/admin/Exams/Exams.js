import React from "react";
import PageTitle from "../../../components/PageTitle";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const Exams = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div className="flex justify-between mt-2">
        <PageTitle title="Exams" />

        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/exams/add")}
        >
          <IoAddOutline size={20} className="m-1" />
          Add New Exam
        </button>
      </div>
    </div>
  );
};

export default Exams;
