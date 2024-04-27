import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import StudentDashboard from './components/StudentDashboard';
import StudentProfile from './components/StudentProfile';
import Learn from './components/Learn';
import ReadContent from './components/ReadContent';
import VideoContent from './components/VideoContent';
import Quiz from './components/Quiz';
import Chat from './components/Chat';
import Subjects from './components/Subjects';
import Units from './components/Units';
import Semister from './components/Semister';
import Interview from './components/Interview';
import Assesments from './components/Assesments';
import LoginForm from './components/LoginForm'; 

function App() {
  const [redirectToNextInterview, setRedirectToNextInterview] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuthenticated(false);
  };

  return (
    <>
      {authenticated && <Navbar />}
      <Routes>
        <Route path='/' element={authenticated ? <Navigate to="/student" /> : <LoginForm   setAuthenticated={setAuthenticated}  />} />
        <Route path="/student" element={<StudentDashboard />} />
        <Route path='/interview' element={<Interview redirectToNextInterview={redirectToNextInterview} />} />
        {redirectToNextInterview && <Navigate to="/interview" replace />}
        <Route path="/student/learn" element={<Semister />} />
        <Route path="/student/learn/:semisterId/*" element={<Subjects />} />
        <Route path="/student/learn/:semisterId/:subjectId/*" element={<Units />} />
        <Route path="/student/learn/:semisterId/:subjectId/:unitId/*" element={<Learn />}>
          <Route index element={<ReadContent />} />
          <Route path="video" element={<VideoContent />} />
          <Route path="quiz" element={<Quiz />} />
          <Route path="chat" element={<Chat />} />
          <Route path='assesment' element={<Assesments/>}/>
        </Route>
        <Route path="/student/student-profile" element={<StudentProfile setAuthenticated={setAuthenticated} />} />
      </Routes>
    </>
  );
}

export default App;
