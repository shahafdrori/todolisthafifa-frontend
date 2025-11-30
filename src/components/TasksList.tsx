import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Dialog,
  Box,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import RoomIcon from "@mui/icons-material/Room";
import { useSetAtom } from "jotai";
import {
  editModeAtom,
  intialDataAtom,
  openFormAtom,
  Task,
} from "../atoms/atoms";
import FetchTasksList from "../hooks/useQuery";
import { useQueryClient } from "@tanstack/react-query";
import OpenLayersMap from "./Map/MapComponent";
import { deleteOneTask } from "../api/deleteOneTask";

interface TasksListProps {
  data: Task[];
}

const TasksList: React.FC<TasksListProps> = ({ data }) => {
  const queryClient = useQueryClient();
  const setFormOpen = useSetAtom(openFormAtom);
  const setEditMode = useSetAtom(editModeAtom);
  const setInitialData = useSetAtom(intialDataAtom);
  const [taskToView, setTaskToView] = useState<Task>();
  const [checkedTasks, setCheckTasks] = useState<string[]>([]);
  const [isMapOpen, setIsMapOpen] = useState<boolean>(false);

  const handleEdit = (task: Task) => {
    setFormOpen(true);
    setEditMode(true);
    setInitialData({
      _id: task._id,
      name: task.name,
      priority: task.priority,
      subject: task.subject,
      date: task.date,
      coordinates: {
        latitude: task.coordinates.latitude,
        longitude: task.coordinates.longitude,
      },
    });
    // queryClient.invalidateQueries(["Tasks"]); //TODO: check this out
  };

  const handleCheckedStatus = (task: Task) => {
    setCheckTasks((prev) =>
      prev.includes(task._id)
        ? prev.filter((id) => id !== task._id)
        : [...prev, task._id]
    );
  };

  const handleCheckLocation = (task: Task) => {
    setIsMapOpen(!isMapOpen);
    setTaskToView(task);
  };

  const handleDelete = async (id: string) => {
    deleteOneTask(id);
    queryClient.invalidateQueries(["Tasks"]);
  };

  const formatDate = (date?: string) => {
    if (!date) return "No due date";
    return new Date(date).toLocaleDateString();
  };

  return (
    <List
      sx={{
        width: "750px",
        bgcolor: "inherit",
        textAlign: "center",
        margin: "auto",
      }}
    >
      <FetchTasksList />
      {data?.map((task) => (
        <ListItem
          key={task._id}
          divider
          sx={{ backgroundColor: "white", color: "black" }}
        >
          <ListItemIcon>
            <input
              type="checkbox"
              onChange={() => handleCheckedStatus(task)}
              style={{ transform: "scale(1.5)", accentColor: "green" }}
              readOnly
            />
          </ListItemIcon>

          <ListItemText
            sx={{ color: checkedTasks.includes(task._id) ? "green" : "red" }}
            primary={task.name}
            secondary={`Subject: ${task.subject} | Priority: ${
              task.priority
            } | Due-Date: ${formatDate(task.date)} 
             | Cords: ${task.coordinates.longitude}, ${
              task.coordinates.latitude
            }`}
          />

          <IconButton
            onClick={() => handleDelete(task._id)}
            aria-label="delete"
            sx={{ color: "red", margin: "auto" }}
          >
            <DeleteIcon />
          </IconButton>

          <IconButton
            onClick={() => handleEdit(task)}
            aria-label="edit"
            sx={{ color: "blue", margin: "auto" }}
          >
            <EditIcon />
          </IconButton>

          <IconButton
            aria-label="location"
            onClick={() => handleCheckLocation(task)}
            sx={{ color: "green", margin: "auto" }}
          >
            <RoomIcon />
          </IconButton>
        </ListItem>
      ))}
      <Dialog
        open={isMapOpen}
        onClose={() => setIsMapOpen(false)}
        maxWidth="lg"
      >
        <Box sx={{ width: "50vw", height: "50vh" }}>
          {taskToView && (
            <OpenLayersMap task={taskToView} formMode={false} mapPage={true} />
          )}
        </Box>
      </Dialog>
    </List>
  );
};

export default TasksList;
