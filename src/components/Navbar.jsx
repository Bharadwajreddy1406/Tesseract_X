import React from "react";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="flex justify-between p-7 items-center shadow-md">
        <div>
            <h1 className="logo font-bold text-4xl text-blue-500 px-4">EduGenie</h1>
        </div>
        <div className="flex items-center ">
          <ul className="flex gap-6 ">
            <li>
              <NavLink to="/student" className=" font-medium text-blue-600">
                Dashboard
              </NavLink>
            </li>
            <li>
              <NavLink to="/student/learn" className="font-medium mr-7 text-blue-600">
                Learn
              </NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to="/student/student-profile" className="font-medium text-blue-600">
                Profile
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
