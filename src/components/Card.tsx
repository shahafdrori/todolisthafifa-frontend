import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import CardContent from "@mui/material/CardContent";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RoomIcon from "@mui/icons-material/Room";
import { useAtom } from "jotai";
import {
  completeStatusAtom,
  editModeAtom,
  intialDataAtom,
  tasksAtom,
  openFormAtom,
} from "../atoms/atoms";
import { useSetAtom } from "jotai";
import React from "react";

interface CardProps {
  TaskName: string;
  priority: string;
  subject: string;
  completed: boolean;
}

const CardComponent: React.FC<CardProps> = ({
  TaskName,
  priority,
  subject,
  completed,
}) => {
  const [data, setData] = useAtom(tasksAtom);
  const setFormOpen = useSetAtom(openFormAtom);
  const setEditMode = useSetAtom(editModeAtom);
  const setInitialData = useSetAtom(intialDataAtom);
  const [completeStatus, setCompleteStatus] = useAtom(completeStatusAtom);

  const handleDelete = async () => {
    setData(data.filter((task) => task.name !== TaskName));
  };

  const handleToggleComplete = () => {
    setData(
      data.map((task) =>
        task.name === TaskName ? { ...task, completed: !task.completed } : task
      )
    );
    setCompleteStatus(data.map((task) => task.completed === true));
  };

  const handleEdit = () => {
    setFormOpen(true);
    setEditMode(true);
    setInitialData({
      _id: "",
      name: "",
      priority: "",
      subject: "",
      date: "",
      longitude: 0,
      latitude: 0,
    });
  };

  return (
    <Card
      sx={{
        border: completed ? "4px solid green" : "4px solid red",
        display: "grid",
        marginTop: "10px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            TaskName : {TaskName}
          </Typography>
          <Typography
            variant="subtitle1"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            Subject - {subject} :{priority}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={handleDelete}
            aria-label="delete"
            sx={{ color: "red", margin: "auto" }}
          >
            <DeleteIcon />
          </IconButton>
          <IconButton
            onClick={handleEdit}
            aria-label="edit"
            sx={{ color: "blue", margin: "auto" }}
          >
            <EditIcon />
          </IconButton>
          <IconButton
            aria-label="location"
            sx={{ color: "blue", margin: "auto" }}
          >
            <RoomIcon />
          </IconButton>
          <Checkbox
            checked={completed}
            onChange={handleToggleComplete}
            color="success"
            size="medium"
          />
        </Box>
      </Box>
    </Card>
  );
};

export default CardComponent;
