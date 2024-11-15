import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Sidebar from './components/Sidebar'; 
import { CiMenuBurger } from "react-icons/ci";
import { Submission } from './models/Submission';
import SubmissionTable from './components/SubmissionTable';
import SubmissionForm from './components/SubmissionForm';
import SubmissionManager from './components/SubmissionManager';
import SignInPage from './components/SignInPage';
import './styles/global.css';

const App: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editingSubmission, setEditingSubmission] = useState<Submission | null>(null);
  // track sidebar state!!
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false); 
  const navigate = useNavigate();

  const handleSave = (submission: Submission) => {
    setSubmissions(prev =>
      prev.some(s => s.id === submission.id)
        ? prev.map(s => (s.id === submission.id ? submission : s))
        : [...prev, submission]
    );
    setEditingSubmission(null);
     // navigate back to the submissions table after saving
    navigate('/');
  };

  const handleEdit = (id: string) => {
    setEditingSubmission(submissions.find(s => s.id === id) || null);
    navigate(`/edit/${id}`);
  };

  const handleDelete = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const handleCancel = () => {
    setEditingSubmission(null);
    // go back to the table after canceling
    navigate('/'); 
  };

  const toggleSidebar = () => setSidebarOpen(prev => !prev); // Toggle sidebar open/close

  return (
    <div className="flex">
      <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
      <div className={`sidebar-toggle-wrapper ${sidebarOpen ? 'hidden' : ''}`}>
        <button  className="sidebar-toggle-button">
          <CiMenuBurger size={24} onClick={toggleSidebar}/>
        </button>
      </div>
      <main className={`main-content ${sidebarOpen ? 'sidebar-open' : ''} p-6`}>
        <div className="title-container"> 
          <h2 className="app-title">InkLog</h2>
        </div>
        <Routes>
          <Route
            path="/"
            element={
              <SubmissionTable
                submissions={submissions}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            }
          />
          <Route
            path="/add"
            element={
              <SubmissionForm
                submission={editingSubmission}
                onSave={handleSave}
                onCancel={handleCancel} userId={''}              />
            }
          />
          <Route
            path="/edit/:id"
            element={
              <SubmissionManager
                submissions={submissions}
                onSave={handleSave}
              />
            }
          />
          <Route path="/signin" element={<SignInPage/>} />s
        </Routes>

      </main>
    </div>
  );
};

export default App;