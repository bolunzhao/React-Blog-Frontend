import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from "../pages/auth/UserContext";
import { Button } from '@mui/material';
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import Logout from '../pages/auth/Logout';

function UserInfoBar() {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 20px', backgroundColor: '#f0f0f0' }}>
      {/* Text section */}
      <span>
        {user ? `Hi, ${user.username}` : 'Login to use Blog'}
      </span>

      {/* Button section */}
      {user ? (
        <Logout />
      ) : (
        <div>
          <Button startIcon={<LoginIcon />} onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button startIcon={<AppRegistrationIcon />} onClick={() => navigate('/register')}>
            Register
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserInfoBar;
