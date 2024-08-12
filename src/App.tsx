/*
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { HiTable, HiPlus } from 'react-icons/hi';

import { Submission } from './models/Submission';
import SubmissionTable from './components/SubmissionTable';
import SubmissionForm from './components/SubmissionForm';
import './styles/global.css'; // Ensure this is imported

const App: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editingSubmission, setEditingSubmission] = useState<Submission | null>(null);

  const handleSave = (submission: Submission) => {
    setSubmissions(prev =>
      prev.some(s => s.id === submission.id)
        ? prev.map(s => (s.id === submission.id ? submission : s))
        : [...prev, submission]
    );
    setEditingSubmission(null);
  };

  const handleEdit = (submission: Submission) => {
    setEditingSubmission(submission);
  };

  const handleDelete = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const handleCancel = () => {
    setEditingSubmission(null);
  };

  return (
    <Router>
      <div className="flex">
        <Sidebar aria-label="Sidebar" className="sidebar">          
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item as={Link} to="/" icon={HiTable}>
                Submissions
              </Sidebar.Item>
              <Sidebar.Item as={Link} to="/add" icon={HiPlus}>
                Add Submission
              </Sidebar.Item>
              
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </Sidebar>
        <main className="flex-1 p-6">
          <Routes>
            <Route path="/" element={<SubmissionTable submissions={submissions} onEdit={handleEdit} onDelete={handleDelete} />} />
            <Route path="/add" element={<SubmissionForm submission={editingSubmission} onSave={handleSave} onCancel={handleCancel} />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
*/import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import {SidebarWithHamburger} from './components/Sidebar';
import SubmissionTable from './components/SubmissionTable';
import SubmissionForm from './components/SubmissionForm';
import { Submission } from './models/Submission';
import './styles/global.css'; // Ensure this is imported


const App: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editingSubmission, setEditingSubmission] = useState<Submission | null>(null);

  const handleSave = (submission: Submission) => {
    setSubmissions(prev =>
      prev.some(s => s.id === submission.id)
        ? prev.map(s => (s.id === submission.id ? submission : s))
        : [...prev, submission]
    );
    setEditingSubmission(null);
  };

  const handleEdit = (submission: Submission) => {
    setEditingSubmission(submission);
  };

  const handleDelete = (id: string) => {
    setSubmissions(prev => prev.filter(s => s.id !== id));
  };

  const handleCancel = () => {
    setEditingSubmission(null);
  };

  return (
    <Router>
      <div className="flex">
        <SidebarWithHamburger />
        <div className="flex-1 ml-64 p-6">
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
              path="/submissions"
              element={
                <SubmissionForm
                  submission={editingSubmission}
                  onSave={handleSave}
                  onCancel={handleCancel}
                />
              }
            />
            {/* Add routes for Sign In and Statistics when available */}
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
