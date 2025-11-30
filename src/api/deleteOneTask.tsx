import axios from "axios";
import { Task } from "../atoms/atoms";

export const deleteOneTask = async (id: string) => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_KEY}/tasks/delete/${id}`);
  } catch (err) {
    console.error("Failed to delete task:", err);
  }
};
