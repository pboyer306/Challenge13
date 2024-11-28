import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li>
          <Link to="/">Home</Link> {/* Link to CandidateSearch (Home) page */}
        </li>
        <li>
          <Link to="/saved">Potential Candidates</Link> {/* Link to SavedCandidates page */}
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
