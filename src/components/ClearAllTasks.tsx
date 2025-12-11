import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { deleteAllTasks } from "../api/deleteAllTasks";
import { useQueryClient } from "@tanstack/react-query";

const ClearAlllTasksButton = () => {
  const queryClient = useQueryClient();

  const handleClearAll = () => {
    deleteAllTasks();
    queryClient.invalidateQueries(["Tasks"]);
    enqueueSnackbar("All tasks cleared", { variant: "warning" });
  };

  return (
    <Button
      variant="contained"
      sx={{ marginTop: "10px", marginLeft: "5px", backgroundColor: "red" }}
      onClick={handleClearAll}
      data-test='clear-all-button'
    >
      Clear All
    </Button>
  );
};

export default ClearAlllTasksButton;
