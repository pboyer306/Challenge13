import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { Candidate } from '../interfaces/Candidate.interface';
import Nav from '../components/Nav';

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [currentCandidate, setCurrentCandidate] = useState<Candidate | null>(null);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const loadCandidates = async () => {
      const fetchedCandidates: Candidate[] = await searchGithub();
      setCandidates(fetchedCandidates);
      setCurrentCandidate(fetchedCandidates[0] || null);
    };
    loadCandidates();
  }, []);

  const saveCandidate = () => {
    if (currentCandidate) {
      const updatedCandidates = [...potentialCandidates, currentCandidate];
      setPotentialCandidates(updatedCandidates);
      localStorage.setItem('potentialCandidates', JSON.stringify(updatedCandidates));
      showNextCandidate();
    }
  };

  const showNextCandidate = () => {
    const nextIndex = index + 1;
    if (nextIndex < candidates.length) {
      setIndex(nextIndex);
      setCurrentCandidate(candidates[nextIndex]);
    } else {
      setCurrentCandidate(null);
    }
  };

  return (
    <div>
      <Nav /> {/* Render Nav component here */}
      <h1>Candidate Search</h1>
      {currentCandidate ? (
        <div>
          <img src={currentCandidate.avatar_url} alt={`${currentCandidate.login}'s avatar`} />
          <h2>{currentCandidate.login}</h2>
          <p>Username: {currentCandidate.login}</p>
          <p>Location: {currentCandidate.location || "Location not available"}</p>
          <p>Email: {currentCandidate.email || "Email not available"}</p>
          <p>Company: {currentCandidate.company || "Company not available"}</p>
          <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
            GitHub Profile
          </a>
          <button onClick={saveCandidate}>+</button>
          <button onClick={showNextCandidate}>-</button>
        </div>
      ) : (
        <p>No more candidates available to review.</p>
      )}
    </div>
  );
};

export default CandidateSearch;

