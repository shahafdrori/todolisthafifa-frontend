import { Box } from "@mui/material";
import {
  ClearAlllTasksButton,
  ShowCompletedButton,
  AddTaskButton,
} from "./index";

interface ButtonRowProps {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
}

const ButtonRow: React.FC<ButtonRowProps> = ({ formOpen, setFormOpen }) => {

  return (
    <Box className="ButtonRow">
      <AddTaskButton formOpen={formOpen} setFormOpen={setFormOpen} />
      <ShowCompletedButton />
      <ClearAlllTasksButton />
    </Box>
  );
};

export default ButtonRow;
