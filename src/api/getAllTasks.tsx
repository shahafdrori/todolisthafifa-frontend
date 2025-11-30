import axios from "axios";

export const fetchAllTasks = async () => {
  const response = await axios.get(`${import.meta.env.VITE_API_KEY}/tasks/all`);
  if (!response) {
    console.error("error getting tasks");
  }
  return response.data;
};
