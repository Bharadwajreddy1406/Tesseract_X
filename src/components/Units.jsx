// Units.jsx
import { useEffect } from 'react'; // Importing useEffect from React
import { NavLink, useParams } from 'react-router-dom';

const Units = () => {
  const { semisterId, subjectId } = useParams();

  useEffect(() => {
    console.log("Semester ID:", semisterId);
    console.log("Subject ID:", subjectId);
  }, [semisterId, subjectId]); // Make sure to include semisterId and subjectId in the dependency array

  const units = ["Unit 1- ", "Unit 2", "Unit 3", "Unit 4", "Unit 5"];

  return (
    <div>
      <h1 className="text-4xl text-center my-10">Units</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mx-10">
        {units.map((unit, index) => (
          <NavLink
            key={index}
            to={`/student/learn/${semisterId}/${subjectId}/${unit.toLowerCase().replace(/\s+/g, "-")}`}
          >
            <div className="text-black bg-slate-200 text-center p-10 rounded-lg shadow-md ">
              {unit}
            </div>
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default Units;