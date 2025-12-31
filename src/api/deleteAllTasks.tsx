import axios from "axios";

export const deleteAllTasks = async (): Promise<boolean> => {
  try {
    const res = await axios.delete(`${import.meta.env.VITE_API_KEY}/tasks/deleteAll`);
    return res.status >= 200 && res.status < 300;
  } catch (err) {
    console.error("Failed to delete all tasks:", err);
    return false;
  }
};

