import React from "react";
import { useNavigate } from "react-router-dom";

import { BottomNavigation, BottomNavigationAction } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import CategoryIcon from "@mui/icons-material/Category";
import PostAddIcon from "@mui/icons-material/PostAdd";

function Navbar() {
  const navigate = useNavigate();
  const [value, setValue] = React.useState(0);

  return (
    <BottomNavigation
      value={value}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      showLabels={true}
      style={{ width: "100%", position: "fixed", bottom: 0, zIndex: 1000 }}
    >
      <BottomNavigationAction
        label="Home"
        icon={<HomeIcon />}
        onClick={() => navigate("/")}
      />
      <BottomNavigationAction
        label="Categories"
        icon={<CategoryIcon />}
        onClick={() => navigate("/categories")}
      />
      <BottomNavigationAction
        label="Create Category"
        icon={<PostAddIcon />}
        onClick={() => navigate("/categories/new")}
      />
      <BottomNavigationAction
        label="Posts"
        icon={<HomeIcon />}
        onClick={() => navigate("/posts")}
      />
      <BottomNavigationAction
        label="Create Post"
        icon={<PostAddIcon />}
        onClick={() => navigate("/posts/new")}
      />
    </BottomNavigation>
  );
}

export default Navbar;
