import React, { useState } from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Sidebar } from 'flowbite-react';
import { HiTable, HiPlus } from 'react-icons/hi';

import { Submission } from './models/Submission';
import SubmissionTable from './components/SubmissionTable';
import SubmissionForm from './components/SubmissionForm';
import SubmissionManager from './components/SubmissionManager';
import './styles/global.css'; // Ensure this is imported

const App: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editingSubmission, setEditingSubmission] = useState<Submission | null>(null);
  const navigate = useNavigate(); // Use the useNavigate hook

  const handleSave = (submission: Submission) => {
    setSubmissions(prev =>
      prev.some(s => s.id === submission.id)
        ? prev.map(s => (s.id === submission.id ? submission : s))
        : [...prev, submission]
    );
    setEditingSubmission(null);
    navigate('/'); // Navigate back to the table after saving
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
    navigate('/'); // Navigate back to the table after canceling
  };

  return (
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
      <main className="flex-1 ml-64 p-6">
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
                onCancel={handleCancel}
              />
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
        </Routes>
      </main>
    </div>
  );
};

export default App;
