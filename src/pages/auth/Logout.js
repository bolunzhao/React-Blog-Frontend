import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";

import { Button } from "@mui/material";
import LogoutIcon from '@mui/icons-material/Logout';

function Logout() {
  const navigate = useNavigate();
  const { setUser } = useUser(); // Destructure setUser from the context

  const handleLogout = () => {
    // Remove the token
    localStorage.removeItem("token");

    // Update user context to null
    setUser(null);

    // Optionally clear other stored data or perform other cleanup

    // Redirect to the login page or home page
    navigate("/login");
  };

  return (
    <Button
      onClick={handleLogout}
      startIcon={<LogoutIcon />}
    >
      Logout
    </Button>
  );
}

export default Logout;
