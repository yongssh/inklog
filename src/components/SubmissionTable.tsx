import React, { useState } from 'react';
import { Submission } from '../models/Submission'; // Ensure the path is correct

interface SubmissionTableProps {
  submissions: Submission[];
  onEdit: (submission: Submission) => void;
}

const SubmissionTable: React.FC<SubmissionTableProps> = ({ submissions, onEdit }) => {
  const [filter, setFilter] = useState<string>('');

  const filteredSubmissions = submissions.filter(sub =>
    sub.journal.toLowerCase().includes(filter.toLowerCase()) ||
    sub.pieces.some(piece => piece.toLowerCase().includes(filter.toLowerCase()))
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Filter by journal or piece"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Journal</th>
            <th>Submission Date</th>
            <th>Pieces</th>
            <th>Response Date</th>
            <th>Response Decision</th>
            <th>Edit</th>
          </tr>
        </thead>
        <tbody>
          {filteredSubmissions.map(submission => (
            <tr key={submission.id}>
              <td>{submission.journal}</td>
              <td>{new Date(submission.submissionDate).toLocaleDateString()}</td>
              <td>{submission.pieces.join(', ')}</td>
              <td>{submission.responseDate ? new Date(submission.responseDate).toLocaleDateString() : 'Pending'}</td>
              <td>{submission.responseDecision || 'Pending'}</td>
              <td>
                <button onClick={() => onEdit(submission)}>Edit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SubmissionTable;
