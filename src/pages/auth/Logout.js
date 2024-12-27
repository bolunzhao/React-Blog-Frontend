import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useUser();  // Destructure setUser from the context

  const handleLogout = () => {
    // Remove the token
    localStorage.removeItem('token');

    // Update user context to null
    setUser(null);

    // Optionally clear other stored data or perform other cleanup

    // Redirect to the login page or home page
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
}

export default Logout;
