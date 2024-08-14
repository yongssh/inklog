// SubmissionManager.tsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SubmissionForm from './SubmissionForm';
import { Submission } from '../models/Submission';

interface SubmissionManagerProps {
  submissions: Submission[];
  onSave: (submission: Submission) => void;
}

const SubmissionManager: React.FC<SubmissionManagerProps> = ({ submissions, onSave }) => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const submission = submissions.find(s => s.id === id) || null;

  const handleCancel = () => {
    // if canceled, go back to sub stable
    navigate('/'); 
  };

  return (
    <div>
      <SubmissionForm
        submission={submission}
        onSave={onSave}
        onCancel={handleCancel}
      />
    </div>
  );
};

export default SubmissionManager;
