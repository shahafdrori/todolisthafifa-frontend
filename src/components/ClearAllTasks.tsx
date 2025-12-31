import { Button } from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { deleteAllTasks } from "../api/deleteAllTasks";
import { useQueryClient } from "@tanstack/react-query";

const ClearAlllTasksButton = () => {
  const queryClient = useQueryClient();

  const handleClearAll = async () => {
    const ok = await deleteAllTasks();

    if (!ok) {
      enqueueSnackbar("Failed to clear tasks", { variant: "error" });
      return;
    }
    // instant UI update (FetchTasksList will see data change and set tasksAtom to [])
    queryClient.setQueryData(["Tasks"], []);
    // sync with backend (forces refetch of active queries)
    await queryClient.invalidateQueries({ queryKey: ["Tasks"] });
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
