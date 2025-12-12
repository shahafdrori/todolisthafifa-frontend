import axios from "axios";
import { Task } from "../atoms/atoms";

export interface sendDataProps {
  values: Task;
}

export const sendData = async ({ values }: sendDataProps) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_KEY}/tasks/add`,
      values
    );
    console.log("Task created successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating Task:", error);
    // re-throw so Form.handleSubmit can show "Operation failed"
    throw error;
  }
};