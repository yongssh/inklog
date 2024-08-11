import React, { useState } from 'react';
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
    <div className="container">
      <SubmissionTable
        submissions={submissions}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
      <SubmissionForm
        submission={editingSubmission}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default App;
