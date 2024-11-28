import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav style={{ padding: "1rem", borderBottom: "1px solid #ccc" }}>
      <ul style={{ listStyleType: "none", display: "flex", gap: "1rem", margin: 0, padding: 0 }}>
        <li>
          <Link to="/">Candidate Search</Link>
        </li>
        <li>
          <Link to="/saved-candidates">Saved Candidates</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
