import React, { useEffect, useState } from "react";
import { message } from "antd";
import { getUserInfo } from "../apicalls/users";
import { useDispatch, useSelector } from "react-redux";
import { SetUser } from "../redux/usersSlice.js";
import { IoClose } from "react-icons/io5";
import { CiHome } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import { IoStatsChartOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { IoLogOutOutline } from "react-icons/io5";
import { RxHamburgerMenu } from "react-icons/rx";
import { PiExam } from "react-icons/pi";

const ProtectedRoute = ({ children }) => {
  const [menu, setMenu] = useState([]);
  const [collapsed, setCollapsed] = useState(false);
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // make the function getUserData()

  // create menu items.
  const userMenu = [
    {
      title: "Home",
      paths: ["/"],
      icon: <CiHome />,
      onClick: () => navigate("/"),
    },

    {
      title: "Reports",
      paths: ["/reports"],
      icon: <IoStatsChartOutline />,
      onClick: () => navigate("/reports"),
    },

    {
      title: "Profile",
      paths: ["/profile"],
      icon: <CgProfile />,
      onClick: () => navigate("/profile"),
    },

    {
      title: "Logout",
      paths: ["/logout"],
      icon: <IoLogOutOutline />,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const adminMenu = [
    {
      title: "Home",
      paths: ["/"],
      icon: <CiHome />,
      onClick: () => navigate("/"),
    },

    {
      title: "Exams",
      paths: ["/admin/exams", "/admin/exams/add"],
      icon: <PiExam />,
      onClick: () => navigate("/admin/exams"),
    },

    {
      title: "Reports",
      paths: ["/reports"],
      icon: <IoStatsChartOutline />,
      onClick: () => navigate("/admin/reports"),
    },

    {
      title: "Profile",
      paths: ["/profile"],
      icon: <CiHome />,
      onClick: () => navigate("/profile"),
    },

    {
      title: "Logout",
      paths: ["/logout"],
      icon: <IoLogOutOutline />,
      onClick: () => {
        localStorage.removeItem("token");
        navigate("/login");
      },
    },
  ];

  const getUserData = async () => {
    try {
      const response = await getUserInfo();
      if (response.success) {
        // message.success(response.message);
        dispatch(SetUser(response.data));
        if (response.data.isAdmin) {
          setMenu(adminMenu);
        } else {
          setMenu(userMenu);
        }
      } else {
        message.error(response.message);
      }
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    // call the getUserData() function.
    getUserData();
  }, []);

  // find the active route or page.
  const activeRoute = window.location.pathname;

  const getIsActiveOrNot = (paths) => {
    if (paths.includes(activeRoute)) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="layout">
      <div className="flex gap-2 w-full h-full h-100">
        <div className="sidebar">
          <div className="text-xl text-white">
            <div className="menu">
              {menu.map((item, index) => {
                return (
                  <div
                    className={`menu-item ${
                      getIsActiveOrNot(item.paths) && "active-menu-item"
                    }`}
                    key={index}
                    onClick={item.onClick}
                  >
                    {item.icon}
                    {!collapsed && (
                      <span className="text-white">{item.title}</span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="body">
          <div className="header flex justify-between items-center">
            {!collapsed && <IoClose onClick={() => setCollapsed(true)} />}

            {collapsed && (
              <RxHamburgerMenu onClick={() => setCollapsed(false)} size={30} />
            )}

            <h1 className="text-2xl">Femi Quiz App</h1>

            <div className="flex justify-between items-center gap-1">
              <CgProfile size={25} />
              <h1 className="text-2xl text-white mr-5 underline">
                {user?.name}
              </h1>
            </div>
          </div>
          <div className="content">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProtectedRoute;
