import { useState, type SetStateAction, type Dispatch } from "react";
import { type TaskData } from "../types/task";
import { BACKEND_URL } from "../backendURL";

type TaskFormProps = {
  className?: string;
  setTasksData: Dispatch<SetStateAction<TaskData[]>>;
  tasksData: TaskData[];
};

const emptyTaskData: TaskData = {
  title: "",
  description: "",
  deadline: null,
};

export default function TaskForm({
  className,
  tasksData,
  setTasksData,
}: TaskFormProps) {
  const [taskData, setTaskData] = useState<TaskData>(emptyTaskData);

  function handleTaskData(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    propertyName: string
  ): void {
    setTaskData({ ...taskData, [propertyName]: e.target.value });
    console.log(taskData);
  }

  async function createTask() {
    if (!taskData.title.trim()) return;

    try {
      //send to backend store in database
      const token = localStorage.getItem("authToken");

      if(!token) throw new Error("User is not connected");

      const additionalInfos = {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "Authorization": `Bearer ${token}` 
        },
        body: JSON.stringify(taskData),
      };
      const url = `${BACKEND_URL}/api/tasks`;

      const response = await fetch(url, additionalInfos);

      if (!response.ok) throw new Error(response.statusText);
      
      const data = await response.json();
      setTasksData([...tasksData, data]);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form className={`${className} flex flex-col gap-2`}>
      <div className="flex gap-2">
        <label className="flex flex-col text-left flex-7/10">
          Title
          <input
            type="text"
            name="title"
            id=""
            onChange={(e) => handleTaskData(e, "title")}
            placeholder="Ex: I need to go to market"
            className="input"
          />
        </label>
        <label className="flex flex-col text-left">
          Deadline
          <input
            type="datetime-local"
            name="deadline"
            id=""
            onChange={(e) => handleTaskData(e, "deadline")}
            className="input max-w-[165px]"
          />
        </label>
      </div>
      <label className="flex flex-col text-left mb-4">
        Description
        <textarea
          name="description"
          className="input"
          rows={3}
          placeholder="Add more details about your task..."
          onChange={(e) => handleTaskData(e, "description")}
        />
      </label>
      <button
        type="button"
        onClick={createTask}
        className="bg-custom-green rounded p-0.5 text-white font-semibold w-full"
      >
        Create task
      </button>
    </form>
  );
}
