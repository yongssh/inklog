import React, { useState } from 'react';
import { Submission } from './models/Submission';
import SubmissionTable from './components/SubmissionTable';
import SubmissionForm from './components/SubmissionForm';

const App: React.FC = () => {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [editingSubmission, setEditingSubmission] = useState<Submission | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleEdit = (submission: Submission) => {
    setEditingSubmission(submission);
    setShowForm(true);
  };

  const handleSave = (updatedSubmission: Submission) => {
    setSubmissions(submissions.map(sub =>
      sub.id === updatedSubmission.id ? updatedSubmission : sub
    ));
    setEditingSubmission(null);
    setShowForm(false);
  };

  const handleAdd = (newSubmission: Submission) => {
    setSubmissions([...submissions, newSubmission]);
    setShowForm(false);
  };

  const handleCancel = () => {
    setEditingSubmission(null);
    setShowForm(false);
  };

  return (
    <div>
      {showForm ? (
        <SubmissionForm
          submission={editingSubmission}
          onSave={editingSubmission ? handleSave : handleAdd}
          onCancel={handleCancel}
        />
      ) : (
        <>
          <button onClick={() => setShowForm(true)}>Add New Submission</button>
          <SubmissionTable
            submissions={submissions}
            onEdit={handleEdit}
          />
        </>
      )}
    </div>
  );
};

export default App;
