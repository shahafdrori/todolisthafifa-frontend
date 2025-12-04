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
          <Button data-test='nav-home' color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button data-test='nav-admin' color="inherit" component={Link} to="/admin-page">
            Admin
          </Button>
          <Button data-test='nav-map' color="inherit" component={Link} to="/tasks-map">
            Map
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
