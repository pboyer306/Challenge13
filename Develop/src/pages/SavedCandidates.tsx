import { useState, useEffect } from 'react';
import { Candidate } from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  // This useEffect will run when the component mounts
  useEffect(() => {
    // Load saved candidates from localStorage
    const saved = JSON.parse(localStorage.getItem('potentialCandidates') || '[]');
    setSavedCandidates(saved);
  }, []); 

  return (
    <div>
      <h1>Saved Candidates</h1>
      {savedCandidates.length > 0 ? (
        savedCandidates.map((candidate) => (
          <div key={candidate.id}>
            <img src={candidate.avatar_url} alt={`${candidate.login}'s avatar`} />
            <h2>{candidate.login}</h2>
            <p>Username: {candidate.login}</p>
            <p>Location: {candidate.location || "Location not available"}</p>
            <p>Email: {candidate.email || "Email not available"}</p>
            <p>Company: {candidate.company || "Company not available"}</p>
            <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
              GitHub Profile
            </a>
          </div>
        ))
      ) : (
        <p>No saved candidates.</p>
      )}
    </div>
  );
};

export default SavedCandidates;

