import axios from "axios";
import { Task } from "../atoms/atoms";

export interface sendDataProps {
  values: Task;
}

export const editData = async ({ values }: sendDataProps) => {
  await axios
    .put(`${import.meta.env.VITE_API_KEY}/tasks/update/${values._id}`, {
      name: values.name,
      subject: values.subject,
      priority: values.priority,
      date: values.date || "No Due Date",
      coordinates: {
        longitude: values.coordinates?.longitude || null,
        latitude: values.coordinates?.latitude || null,
      },
    })
    .then((response) => {
      console.log("Task created successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error creating Task:", error);
    });
};
