import { Outlet } from "react-router-dom";
import { NavBar } from "../components/index";
import { Box } from "@mui/material";
const PageLayout = () => {
  return (
    <Box>
      <NavBar />
      <Outlet />
    </Box>
  );
};

export default PageLayout;
