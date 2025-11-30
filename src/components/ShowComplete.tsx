import { Button } from "@mui/material";
import { useAtom } from "jotai";
import { showCompletedAtom } from "../atoms/atoms";

const ShowCompletedButton = () => {
  const [completedToggle, setCompletedToggle] = useAtom(showCompletedAtom);
  const handleShowCompleted = () => {
    setCompletedToggle(!completedToggle);
  };

  return (
    <Button
      variant="contained"
      sx={{ marginTop: "10px", marginLeft: "5px", backgroundColor: "green" }}
      onClick={handleShowCompleted}
    >
      Show Completed
    </Button>
  );
};

export default ShowCompletedButton;
