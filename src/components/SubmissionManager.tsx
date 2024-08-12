import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubmissionTable from './SubmissionTable';
import SubmissionForm from './SubmissionForm';
import { Submission } from '../models/Submission';

const SubmissionManager: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editingSubmission, setEditingSubmission] = useState<Submission | null>(null);
  const navigate = useNavigate();

  const handleSave = (submission: Submission) => {
    if (editingSubmission) {
      // Update existing submission
      setSubmissions(prevSubmissions =>
        prevSubmissions.map(s => (s.id === submission.id ? submission : s))
      );
    } else {
      // Add new submission
      setSubmissions(prevSubmissions => [...prevSubmissions, submission]);
    }
    setEditingSubmission(null); // Reset form after save
    navigate('/'); // Navigate back to the table view after saving
  };

  const handleEdit = (submission: Submission) => {
    setEditingSubmission(submission);
    navigate('/edit'); // Navigate to the form view when editing
  };

  const handleDelete = (id: string) => {
    setSubmissions(prevSubmissions => prevSubmissions.filter(s => s.id !== id));
  };

  return (
    <div>
      {editingSubmission ? (
        <SubmissionForm
          submission={editingSubmission}
          onSave={handleSave}
          onCancel={() => {
            setEditingSubmission(null);
            navigate('/');
          }}
        />
      ) : (
        <SubmissionTable
          submissions={submissions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default SubmissionManager;
