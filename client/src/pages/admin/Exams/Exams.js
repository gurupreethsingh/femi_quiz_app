// import React, { useEffect, useState } from "react";
// import PageTitle from "../../../components/PageTitle";
// import { IoAddOutline } from "react-icons/io5";
// import { useNavigate } from "react-router-dom";
// import { Table, message, columns } from "antd";
// import { useDispatch } from "react-redux";
// import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
// import { getAllExams } from "../../../apicalls/exams";

// const Exams = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [exams, setExams] = useState([]);

//   const columns = [
//     { title: "Exam Name", dataIndex: "name" },
//     { title: "Duration", dataIndex: "duration" },
//     { title: "Category", dataIndex: "category" },
//     { title: "Total Marks", dataIndex: "totalMarks" },
//     { title: "Passing Marks", dataIndex: "passingMarks" },
//     {
//       title: "Action",
//       dataIndex: "action",
//       render: (text, record) => {
//         <div>
//           <button>Add </button>
//         </div>;
//       },
//     },
//   ];

//   const getExamsData = async () => {
//     try {
//       dispatch(ShowLoading());
//       const response = await getAllExams();
//       console.log("Fetched Exams:", response.data); // Log fetched data
//       dispatch(HideLoading());
//       if (response.success) {
//         setExams(response.data);
//       } else {
//         message.error(response.message);
//       }
//     } catch (error) {
//       dispatch(HideLoading());
//       message.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getExamsData();
//   }, []);

//   return (
//     <div>
//       <div className="flex justify-between mt-2 mb-2 items-center">
//         <PageTitle title="Exams" />

//         <button
//           className="primary-outlined-btn flex items-center"
//           onClick={() => navigate("/admin/exams/add")}
//         >
//           <IoAddOutline size={20} className="m-1" />
//           Add New Exam
//         </button>
//       </div>
//       <hr />

//       <Table columns={columns} dataSource={exams} />
//     </div>
//   );
// };

// export default Exams;

import React, { useEffect, useState } from "react";
import PageTitle from "../../../components/PageTitle";
import { IoAddOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { Table, message } from "antd";
import { useDispatch } from "react-redux";
import { HideLoading, ShowLoading } from "../../../redux/loaderSlice";
import { getAllExams } from "../../../apicalls/exams";

const Exams = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [exams, setExams] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const columns = [
    { title: "Exam Name", dataIndex: "name" },
    { title: "Duration", dataIndex: "duration" },
    { title: "Category", dataIndex: "category" },
    { title: "Total Marks", dataIndex: "totalMarks" },
    { title: "Passing Marks", dataIndex: "passingMarks" },
    {
      title: "Action",
      dataIndex: "action",
      render: (text, record) => (
        <div className="flex gap-2 items-center ">
          <MdEdit />
          <MdDelete />
        </div>
      ),
    },
  ];

  const getExamsData = async () => {
    try {
      setIsLoading(true);
      dispatch(ShowLoading());
      const response = await getAllExams();
      console.log("Fetched Exams:", response.data);
      dispatch(HideLoading());
      setIsLoading(false);

      if (response.success) {
        setExams(response.data);
      } else {
        setError(response.message); // Set error state with the actual error message
        message.error(response.message);
      }
    } catch (error) {
      setIsLoading(false);
      dispatch(HideLoading());
      setError(error.message); // Set error state with the actual error message
      message.error(error.message);
    }
  };

  useEffect(() => {
    getExamsData(); // Call getExamsData function
  }, []); // Include getExamsData in the dependency array

  return (
    <div>
      <div className="flex justify-between mt-2 mb-2 items-center">
        <PageTitle title="Exams" />

        <button
          className="primary-outlined-btn flex items-center"
          onClick={() => navigate("/admin/exams/add")}
        >
          <IoAddOutline size={20} className="m-1" />
          Add New Exam
        </button>
      </div>
      <hr />

      {error ? (
        <div>Error fetching exams: {error}</div>
      ) : isLoading ? (
        <div>Loading exams...</div>
      ) : exams.length > 0 ? (
        <Table columns={columns} dataSource={exams} />
      ) : (
        <div>No exams found.</div>
      )}
    </div>
  );
};

export default Exams;
