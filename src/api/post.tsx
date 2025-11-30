import axios from "axios";
import { Task } from "../atoms/atoms";

export interface sendDataProps {
  values: Task;
}

export const sendData = async ({ values }: sendDataProps) => {
  await axios
    .post(`${import.meta.env.VITE_API_KEY}/tasks/add`, values)
    .then((response) => {
      console.log("Task created successfully:", response.data);
    })
    .catch((error) => {
      console.error("Error creating Task:", error);
    });
};
