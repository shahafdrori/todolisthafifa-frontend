import axios from "axios";

export const deleteAllTasks = async () => {
  try {
    await axios.delete(`${import.meta.env.VITE_API_KEY}/tasks/deleteAll`);
  } catch (err) {
    console.error("Failed to delete task:", err);
  }
};
