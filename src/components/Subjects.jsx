import React, { useEffect } from 'react';
import { NavLink, useParams } from 'react-router-dom';

const Subjects = ({ semisterId }) => {
  const semId = useParams();
  

  const subjects = [
    "Operating systems",
    "Database management system",
    "Statistical mathametics",
    "Java",
    "Atomata and compiler design",
  ];

  return (
    <div>
      <h1 className="text-4xl text-center my-10">Subjects To be completed</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mx-10">
        {subjects.map((subject, index) => (
          <NavLink
            key={index}
            to={`/student/learn/${semId.semisterId}/${subject.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="text-black bg-slate-300 text-center p-10 rounded-lg shadow-md ">
              {subject}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Subjects;
