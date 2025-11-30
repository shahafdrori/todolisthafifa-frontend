import { Button } from "@mui/material";
import { intialDataAtom } from "../atoms/atoms";
import { useSetAtom } from "jotai";

interface AddTaskButtonProps {
  formOpen: boolean;
  setFormOpen: (open: boolean) => void;
}

const AddTaskButton: React.FC<AddTaskButtonProps> = ({
  formOpen,
  setFormOpen,
}) => {
  const setInitialData = useSetAtom(intialDataAtom);
  const handleClick = () => {
    setInitialData({
      _id: "",
      name: "",
      priority: "",
      subject: "",
      date: "",
      coordinates: {
        longitude: 0,
        latitude: 0,
      },
    });
    setFormOpen(!formOpen);
  };

  return (
    <Button
      variant="contained"
      sx={{ marginTop: "10px" }}
      onClick={handleClick}
    >
      Add Task
    </Button>
  );
};

export default AddTaskButton;
