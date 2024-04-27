// Learn.jsx

import React from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";

const Learn = () => {
  const unitName = useParams().unitId;
  return (
    <div
      className="flex justify-between items-start h-sm gap-10"
      style={{ marginRight: "80px" }}
    >
      <div className="container w-1/3 mx-10 my-20 text-xl p-10 rounded-lg shadow-2xl">
        <aside className="aside-tab flex flex-col justify-between h-full">
          <div className="py-9 border-slate-300 border-b-2 text-center text-2xl font-bold">
            {unitName}  
          </div>
          <ul>
            <li className="text-left text-lg p-7 px-10">
              <NavLink to='./' >Read Content</NavLink>
            </li>
            <li className="text-left text-lg p-7 px-10">
              <NavLink to="video">Video</NavLink>
            </li>
            <li className="text-left text-lg p-7 px-10">
              <NavLink to="quiz">Quiz</NavLink>
            </li>
            <li className="text-left text-lg p-7 px-10">
              <NavLink to="assesment">Assesment</NavLink>
            </li>
            <li className="text-left text-lg p-7 px-10">
              <NavLink to="chat">Chat with Me</NavLink>
            </li>
          </ul>
        </aside>
      </div>
      <div className="text-black mt-20 bg-slate-000 w-3/4 h-[600px] flex justify-center items-center text-xl p-5 rounded-lg shadow-2xl">
        <Outlet />
      </div>
    </div>
  );
};

export default Learn;
