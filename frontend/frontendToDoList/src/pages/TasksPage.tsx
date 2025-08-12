import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import Task from "../components/Task";
import { BACKEND_URL } from "../backendURL";
import { type TaskData } from "../types/task";

const EmptyTasks: TaskData[] = [
  {
    title: "Aprender TypeScript",
    description:
      "Estudar os conceitos básicos como tipos, interfaces e genéricos.",
    deadline: "2025-08-15",
  },
  {
    title: "Finalizar o projeto To-Do List",
    description: "Conectar o front-end em React com o backend em .NET.",
    deadline:null,
  },
];

export default function TasksPage() {
  const [tasksData, setTasksData] = useState<TaskData[]>(EmptyTasks);
  const navigate = useNavigate();
  console.log(tasksData);

  useEffect(() => {
    async function fetchTasks() {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) {
          navigate("/")
          return;
        }

        const response = await fetch(`${BACKEND_URL}/api/tasks`, {
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });

        if (!response.ok) {
          throw new Error("Falha ao buscar as tarefas");
        }

        const data = await response.json();
        setTasksData(data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchTasks();

  }, []);

  function listTasks(tasks: TaskData[]) {
    return tasks.map((task, index) => {
      return (
        <li key={index} className="list-none mb-3">
          <Task
            title={task.title}
            description={task.description}
            deadline={task.deadline}
          />
        </li>
      );
    });
  }

  return (
    <div className="max-w-3xl mx-auto">
      <TaskForm setTasksData={setTasksData} tasksData={tasksData} className="mb-10" />
      <ul>{listTasks(tasksData)}</ul>
    </div>
  );
}
