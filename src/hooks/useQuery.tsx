import { useQuery } from "@tanstack/react-query";
import { fetchAllTasks } from "../api/getAllTasks";
import { Task, tasksAtom } from "../atoms/atoms";
import { useSetAtom } from "jotai";
import { useEffect } from "react";

const FetchTasksList = () => {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["Tasks"],
    queryFn: fetchAllTasks,
  });

  const setTasks = useSetAtom(tasksAtom);

  useEffect(() => {
    if (data) {
      setTasks(data);
    }
  }, [data, setTasks]);

  if (isLoading) return <div>Loading tasks...</div>;
  if (isError) return <div>Error: {String(error)}</div>;

  return null;
};

export default FetchTasksList;
