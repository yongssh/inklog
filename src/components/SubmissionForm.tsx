import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Submission } from '../models/Submission';
import { getFirebaseToken } from "../firebase";
import '../styles/global.css';

interface SubmissionFormProps {
  submission: Submission | null;
  onSave: (submission: Submission) => void;
  onCancel: () => void;
  userId: string; // Add userId to send it with the submission
}

const SubmissionForm: React.FC<SubmissionFormProps> = ({ submission, onSave, onCancel, userId }) => {
  const [journal, setJournal] = useState('');
  const [submissionDate, setSubmissionDate] = useState('');
  const [pieces, setPieces] = useState('');
  const [responseDate, setResponseDate] = useState('');
  const [responseDecision, setResponseDecision] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    if (submission) {
      setJournal(submission.journal);
      setSubmissionDate(submission.submissionDate.toISOString().split('T')[0]);
      setPieces(submission.pieces.join(', '));
      setResponseDate(submission.responseDate ? submission.responseDate.toISOString().split('T')[0] : '');
      setResponseDecision(submission.responseDecision || '');
    } else {
      setJournal('');
      setSubmissionDate('');
      setPieces('');
      setResponseDate('');
      setResponseDecision('');
    }
  }, [submission]);

  const handleSave = async () => {
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
      submission ? submission.id : Date.now().toString(),
      journal,
      parsedSubmissionDate,
      pieces.split(',').map(piece => piece.trim()),
      parsedResponseDate,
      responseDecision || undefined
    );

    try {
      const token = await getFirebaseToken(); // Replace with actual Firebase token fetching method
      const response = await fetch(`/api/users/${userId}/submissions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`, // Attach the token
      },
      body: JSON.stringify({
        journalName: journal,
        submissionDate: parsedSubmissionDate,
        submittedPieces: pieces.split(',').map(piece => piece.trim()),
        responseDate: parsedResponseDate,
        responseStatus: responseDecision,
      }),
      });


      if (!response.ok) {
        throw new Error('Failed to add submission');
      }

      const savedSubmission = await response.json();
      onSave(savedSubmission); // Notify parent component about the saved submission
      navigate('/'); // Redirect to the submissions table or desired page
    } catch (error) {
      console.error('Error saving submission:', error);
      // Optionally, you could show an error message to the user here
    }
  };

  return (
    <div className="form-container">
      <h2>{submission ? 'Edit Submission' : 'Add New Submission'}</h2>
      <div className="form-group">
        <label htmlFor="journal">Journal Name</label>
        <input
          id="journal"
          type="text"
          value={journal}
          onChange={(e) => setJournal(e.target.value)}
          placeholder="Journal Name"
          className="input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="submissionDate">Submission Date</label>
        <input
          id="submissionDate"
          type="date"
          value={submissionDate}
          onChange={(e) => setSubmissionDate(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="pieces">Pieces (comma-separated)</label>
        <input
          id="pieces"
          type="text"
          value={pieces}
          onChange={(e) => setPieces(e.target.value)}
          placeholder="Pieces (comma-separated)"
          className="input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="responseDate">Response Date</label>
        <input
          id="responseDate"
          type="date"
          value={responseDate}
          onChange={(e) => setResponseDate(e.target.value)}
          className="input"
        />
      </div>
      <div className="form-group">
        <label htmlFor="responseDecision">Response Decision</label>
        <select
          id="responseDecision"
          value={responseDecision}
          onChange={(e) => setResponseDecision(e.target.value)}
          className="select"
        >
          <option value="">Select Response Decision</option>
          <option value="Accepted">Accepted</option>
          <option value="Declined">Declined</option>
        </select>
      </div>
      <div className="button-group">
        <button className="button" onClick={handleSave}>{submission ? 'Save' : 'Add'}</button>
        <button className="button button-cancel" onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default SubmissionForm;
