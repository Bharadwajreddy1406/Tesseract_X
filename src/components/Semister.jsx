import React from 'react';
import { NavLink } from 'react-router-dom';

const Semister = () => {
  const semisters = [
    "Semister 1",
    "Semister 2",
    "Semister 3",
    "Semister 4",

  ];

  return (
    <div>
      <h1 className="text-4xl text-center my-10">Semisters</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mx-10">
        {semisters.map((semister, index) => (
          <NavLink
            key={index}
            to={`/student/learn/${semister.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="text-black bg-slate-300 text-center p-10 rounded-lg shadow-md ">
              {semister}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Semister;
