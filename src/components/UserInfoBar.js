import React from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "../pages/auth/UserContext";
import { Button } from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Logout from "../pages/auth/Logout";

import { jwtDecode } from "jwt-decode";

function UserInfoBar() {
  // const { user } = useUser();
  const navigate = useNavigate();

  let isAdmin = false;
  let user = '';
  const token = localStorage.getItem("token");
  const jwtToken = token ? jwtDecode(token) : null;
  if (jwtToken) {
    isAdmin = jwtToken.roles && jwtToken.roles === "ROLE_ADMIN";
    user = jwtToken.sub;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0, // or width: "100%"
        zIndex: 999, // ensure it appears above other content
        height: "40px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 20px",
        backgroundColor: "#f0f0f0",
      }}
    >
      {/* Text section */}
      <span>
        {user
          ? `Hi, ${user}${isAdmin ? " (Admin)" : " (Regular User)"}`
          : "Login to use Blog"}
      </span>

      {/* Button section */}
      {user ? (
        <Logout />
      ) : (
        <div>
          <Button startIcon={<LoginIcon />} onClick={() => navigate("/login")}>
            Login
          </Button>
          <Button
            startIcon={<AppRegistrationIcon />}
            onClick={() => navigate("/register")}
          >
            Register
          </Button>
        </div>
      )}
    </div>
  );
}

export default UserInfoBar;
