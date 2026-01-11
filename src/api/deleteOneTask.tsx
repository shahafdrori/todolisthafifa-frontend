import axios from "axios";

export const deleteOneTask = async (id: string): Promise<boolean> => {
  try {
    const res = await axios.delete(
      `${import.meta.env.VITE_API_KEY}/tasks/delete/${id}`
    );
    return res.status >= 200 && res.status < 300;
  } catch (err) {
    console.error("Failed to delete task:", err);
    return false;
  }
};
