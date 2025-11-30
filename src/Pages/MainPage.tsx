import {
  Title,
  FormComponent,
  ButtonRow,
  TasksList,
  SearchBar,
} from "../components/index";
import { openFormAtom, tasksAtom, searchQueryAtom } from "../atoms/atoms";
import { useAtom, useAtomValue } from "jotai";
import useDebounce from "../hooks/useDebounce";
import { SnackbarProvider } from "notistack";
import { Box } from "@mui/material";

const MainPage = () => {
  const [formOpen, setFormOpen] = useAtom(openFormAtom);
  const searchValue = useAtomValue(searchQueryAtom);
  const data = useAtomValue(tasksAtom);
  const debouncedSearchValue = useDebounce(searchValue, 1000);

  const handleClose = () => {
    setFormOpen(false);
  };
  const filteredData = data.filter((task) =>
    task.name.toLowerCase().includes(debouncedSearchValue.toLowerCase())
  );
  const displayedData = debouncedSearchValue ? filteredData : data;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      sx={{
        textAlign: "center",
        margin: "auto",
        padding: "2rem",
        marginTop: "100px",
      }}
    >
      <Title text="To-Do List" />
      <SearchBar />
      <ButtonRow formOpen={formOpen} setFormOpen={setFormOpen} />
      <TasksList data={displayedData} />
      <SnackbarProvider maxSnack={3} />
      <FormComponent
        open={formOpen}
        setFormOpen={setFormOpen}
        onClose={handleClose}
      />
    </Box>
  );
};

export default MainPage;
