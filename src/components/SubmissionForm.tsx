import React, { useState, useEffect } from 'react';
import { Submission } from '../models/Submission';

interface SubmissionFormProps {
  submission: Submission | null;
  onSave: (submission: Submission) => void;
  onCancel: () => void;
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ submission, onSave, onCancel }) => {
  const [journal, setJournal] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [pieces, setPieces] = useState('');
  const [responseDate, setResponseDate] = useState('');
  const [responseDecision, setResponseDecision] = useState('');

  useEffect(() => {
    if (submission) {
      setJournal(submission.journal);
      setSubmissionDate(submission.submissionDate.toISOString().split('T')[0]);
      setPieces(submission.pieces.join(', '));
      setResponseDate(submission.responseDate ? submission.responseDate.toISOString().split('T')[0] : '');
      setResponseDecision(submission.responseDecision || '');
    } else {
      // Reset form fields when adding a new submission
      setJournal('');
      setSubmissionDate('');
      setPieces('');
      setResponseDate('');
      setResponseDecision('');
    }
  }, [submission]);

  const handleSave = () => {
    let parsedSubmissionDate: Date;
    let parsedResponseDate: Date | undefined;

    try {
      parsedSubmissionDate = new Date(submissionDate);
      if (isNaN(parsedSubmissionDate.getTime())) throw new Error('Invalid submission date');
    } catch (e) {
      console.error('Invalid submission date', e);
      return;
    }

    try {
      parsedResponseDate = responseDate ? new Date(responseDate) : undefined;
      if (parsedResponseDate && isNaN(parsedResponseDate.getTime())) throw new Error('Invalid response date');
    } catch (e) {
      console.error('Invalid response date', e);
      return;
    }

    const newSubmission = new Submission(
      submission ? submission.id : Date.now().toString(), // Use a unique ID for new submissions
      journal,
      parsedSubmissionDate,
      pieces.split(',').map(piece => piece.trim()),
      parsedResponseDate,  // Can be undefined
      responseDecision || undefined // Can be undefined
    );
    onSave(newSubmission);
  };

  return (
    <div>
      <h2>{submission ? 'Edit Submission' : 'Add New Submission'}</h2>
      <input
        type="text"
        value={journal}
        onChange={(e) => setJournal(e.target.value)}
        placeholder="Journal Name"
      />
      <input
        type="date"
        value={submissionDate}
        onChange={(e) => setSubmissionDate(e.target.value)}
      />
      <input
        type="text"
        value={pieces}
        onChange={(e) => setPieces(e.target.value)}
        placeholder="Pieces (comma-separated)"
      />
      <input
        type="date"
        value={responseDate}
        onChange={(e) => setResponseDate(e.target.value)}
      />
      <select
        value={responseDecision}
        onChange={(e) => setResponseDecision(e.target.value)}
      >
        <option value="">Select Response Decision</option>
        <option value="Accepted">Accepted</option>
        <option value="Declined">Declined</option>
      </select>
      <button onClick={handleSave}>{submission ? 'Save' : 'Add'}</button>
      <button onClick={onCancel}>Cancel</button>
    </div>
  );
};

export default SubmissionForm;
