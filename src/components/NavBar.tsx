import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

const NavBar: React.FC = () => {

  return (
    <AppBar sx={{ backgroundColor: "#343030ff", boxShadow: "none" }}>
      <Toolbar>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/admin-page">
            Admin
          </Button>
          <Button color="inherit" component={Link} to="/tasks-map">
            Map
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
