// StudentProfile.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

const StudentProfile = ({ setAuthenticated }) => {
  // Dummy data
  const student = {
    name: 'John Doe',
    rollNumber: '123456',
    year: '2022',
    section: 'A',
  };

  const navigate = useNavigate();

  const handleLogout = () => {
    // Perform logout logic here (e.g., clear session)
    // Call the parent component's logout function
    setAuthenticated(false)
    // Redirect to login page
    navigate('/');
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-1/2">
        <img
          src="/greenbadge.png" 
          alt="Avatar"
          className="w-32 h-32 rounded-full mx-auto mb-14"
        />
        <div className="mb-6">
          <label className="text-gray-800 font-bold mr-2">Name:</label>
          <span className="text-gray-600">{student.name}</span>
        </div>
        <div className="mb-6">
          <label className="text-gray-800 font-bold mr-2">Roll Number:</label>
          <span className="text-gray-600">{student.rollNumber}</span>
        </div>
        <div className="mb-6">
          <label className="text-gray-800 font-bold mr-2">Year:</label>
          <span className="text-gray-600">{student.year}</span>
        </div>
        <div className="mb-6">
          <label className="text-gray-800 font-bold mr-2">Section:</label>
          <span className="text-gray-600">{student.section}</span>
        </div>
        <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
};

export default StudentProfile;
