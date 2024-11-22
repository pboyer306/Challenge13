import { useState, useEffect } from 'react';
import { searchGithub, searchGithubUser } from '../api/API';

type GitHubUser = {
  login: string;
  avatar_url: string;
  name: string | null;
  location: string | null;
  email: string | null;
  html_url: string;
  company: string | null;
};

const [loading, setLoading] = useState<boolean>(false); //makes setLoading work
const [username, setUsername] = useState<string>(''); //makes username work


const CandidateSearch = () => {
    const [currentCandidate, setCurrentCandidate] = useState<GitHubUser | null>(null);
    const [savedCandidates, setSavedCandidates] = useState<GitHubUser[]>([]);
    const [remainingCandidates, setRemainingCandidates] = useState<GitHubUser[]>([]);

    useEffect(() => {
      const fetchCandidates = async () => {
        try {
          const candidates = await searchGithub();
          setRemainingCandidates(candidates);
          if (candidates.length > 0) {
            setCurrentCandidate(candidates[0]);
          }
        } catch (error) {
          console.error("Error fetching candidates:", error);
        }
      };
      fetchCandidates();
    }, []);

    const saveCandidate = (candidate: GitHubUser) => {
      const updatedSavedCandidates = [...savedCandidates, candidate];
      setSavedCandidates(updatedSavedCandidates);
      localStorage.setItem("savedCandidates", JSON.stringify(updatedSavedCandidates));
    };

    const handleAccept = () => {
      if (currentCandidate) {
        saveCandidate(currentCandidate);
        showNextCandidate();
      }
    };

    const handleReject = () => {
      showNextCandidate();
    };

    const showNextCandidate = () => {
      const updatedCandidates = remainingCandidates.slice(1);
      setRemainingCandidates(updatedCandidates);
      setCurrentCandidate(updatedCandidates.length > 0 ? updatedCandidates[0] : null);
    };

    const handleSearch = async () => {
      if (username.trim() === '') {
        return;
      }
  
      setLoading(true);
      try {
        const user = await searchGithubUser(username);
        setCurrentCandidate(user);
        setRemainingCandidates([]);
      } catch (error) {
        console.error("Error searching for user:", error);
      } finally {
        setLoading(false);
      }
    };
    
    return (
      <div>
        <h1>Candidate Search</h1>
        
        <input 
          type="text" 
          placeholder="Enter GitHub username" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
        
        {loading ? (
          <p>Loading candidates...</p>
        ) : (
          <>
            {currentCandidate ? (
              <div>
                <img
                  src={currentCandidate.avatar_url}
                  alt={`${currentCandidate.name}'s avatar`}
                  style={{ width: '150px', borderRadius: '50%' }}
                />
                <h2>{currentCandidate.name}</h2>
                <p><strong>Username:</strong> {currentCandidate.login}</p>
                <p><strong>Location:</strong> {currentCandidate.location || 'Not provided'}</p>
                <p><strong>Email:</strong> {currentCandidate.email || 'Not provided'}</p>
                <p><strong>Company:</strong> {currentCandidate.company || 'Not provided'}</p>
                <a href={currentCandidate.html_url} target="_blank" rel="noopener noreferrer">
                  GitHub Profile
                </a>
                <div>
                  <button onClick={handleAccept}>+</button>
                  <button onClick={handleReject}>-</button>
                </div>
              </div>
            ) : (
              <p>{remainingCandidates.length === 0 ? "No more candidates available." : "Loading..."}</p>
            )}
          </>
        )}
      </div>
    );
  };
  
  export default CandidateSearch;