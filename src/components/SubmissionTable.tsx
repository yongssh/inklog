// components/SubmissionTable.tsx
import React, { useState } from 'react';
import { CompactTable } from '@table-library/react-table-library/compact';
import { useTheme } from '@table-library/react-table-library/theme';
import { getTheme } from '@table-library/react-table-library/baseline';
import { Submission } from '../models/Submission';
import { useNavigate } from 'react-router-dom';
import '../styles/global.css';

// get SVGs
import EditIcon from '../icons/edit.svg';
import DeleteIcon from '../icons/delete.svg';

interface SubmissionTableProps {
  submissions: Submission[];
  onEdit: (id: string) => void; 
  onDelete: (id: string) => void;
}

const SubmissionTable: React.FC<SubmissionTableProps> = ({ submissions, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); 

  // filter submissions based on search term
  const filteredSubmissions = submissions.filter((submission) =>
    submission.journal.toLowerCase().includes(searchTerm.toLowerCase()) ||
    submission.pieces.some(piece => piece.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const data = { nodes: filteredSubmissions };

  const theme = useTheme([
    getTheme(),
    {
      HeaderRow: `
        background-color: #eaf5fd;
      `,
      Row: `
        &:nth-of-type(odd) {
          background-color: #d2e9fb;
        }

        &:nth-of-type(even) {
          background-color: #eaf5fd;
        }
      `,
    },
  ]);

  const COLUMNS = [
    { label: 'Journal', renderCell: (item: Submission) => item.journal },
    {
      label: 'Submission Date',
      renderCell: (item: Submission) =>
        item.submissionDate.toLocaleDateString('en-US', {
          year: 'numeric',
          month: '2-digit',
          day: '2-digit',
        }),
    },
    { label: 'Pieces', renderCell: (item: Submission) => item.pieces.join(', ') },
    {
      label: 'Response Date',
      renderCell: (item: Submission) =>
        item.responseDate ? item.responseDate.toLocaleDateString('en-US') : '',
    },
    { label: 'Response Decision', renderCell: (item: Submission) => item.responseDecision || 'N/A' },
    {
      label: 'Actions',
      renderCell: (item: Submission) => (
        <div className="actions">
          <img
            src={EditIcon}
            alt="Edit"
            className="icon-button edit-icon"
            // navigate with entry ID!!
            onClick={() => navigate(`/edit/${item.id}`)} 
          />
          <img
            src={DeleteIcon}
            alt="Delete"
            className="icon-button delete-icon"
            onClick={() => onDelete(item.id)}
          />
        </div>
      ),
    },
  ];

  return (
    <div>
      {/* Search Input */}
      <div className="search-bar-container">
        <input
          type="text"
          placeholder="Search by Journal or Piece"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar-text"
          style={{ width: '33%', margin: '0 auto', display: 'block' }} // Centered and takes 1/3 of the width
        />
      </div>

      <CompactTable columns={COLUMNS} data={data} theme={theme} />
    </div>
  );
};

export default SubmissionTable;
