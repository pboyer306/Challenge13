import { useState, useEffect } from 'react';
import { Candidate } from "../interfaces/Candidate.interface";



const SavedCandidates = () => {

  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    const candidates = localStorage.getItem("savedCandidates");
    if (candidates) {
      setSavedCandidates(JSON.parse(candidates) as Candidate[]);
    }
  }, []);

  const handleRemove = (username: string) => {
    const updatedCandidates = savedCandidates.filter((candidate) => candidate.login !== username);
    setSavedCandidates(updatedCandidates);
    localStorage.setItem("savedCandidates", JSON.stringify(updatedCandidates));
  };
  return (
    <div>
      <h1>Potential Candidates</h1>
      {savedCandidates.length > 0 ? (
        <div>
          {savedCandidates.map((candidate) => (
            <div key={candidate.login} style={{ border: "1px solid #ccc", padding: "1rem", margin: "1rem 0" }}>
              <img
                src={candidate.avatar_url}
                alt={`${candidate.name || candidate.login}'s avatar`}
                style={{ width: "100px", borderRadius: "50%" }}
              />
              <h2>{candidate.name || "Name not provided"}</h2>
              <p>
                <strong>Username:</strong> {candidate.login}
              </p>
              <p>
                <strong>Location:</strong> {candidate.location || "Not provided"}
              </p>
              <p>
                <strong>Email:</strong> {candidate.email || "Not provided"}
              </p>
              <p>
                <strong>Company:</strong> {candidate.company || "Not provided"}
              </p>
              <a href={candidate.html_url} target="_blank" rel="noopener noreferrer">
                GitHub Profile
              </a>
              <div>
                <button onClick={() => handleRemove(candidate.login)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No candidates have been accepted yet.</p>
      )}
    </div>
  );
};

export default SavedCandidates;

