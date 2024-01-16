import React, { useState } from "react";
import { Link } from 'react-router-dom';
import './NavBar.css'; 

function NavBar() {
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const handleLogout = () => {
    fetch(`/logout`, {
      method: 'DELETE'
    })
    .then(() => {
      // Handle logout on the client-side (update state, etc.)
      setIsLoggedOut(true);
    })
    .catch(error => console.error(error)); // Handle errors
  }

  return (
    <nav>
      <div className="nav-title">
        JobQuest
      </div>
      <Link to="/">
        Home
      </Link>
      <Link to="/jobs">
        My Jobs
      </Link>
      <Link to="/add-job">
        Add Job
      </Link>
      <Link to="/learn">
        Learn
      </Link>
      {/* {!isLoggedOut && <button onClick={handleLogout}>Logout</button>} */}
    </nav>
  );
}

export default NavBar;
