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

  function deleteTaskFromDatabase(id:number){
  
      const token = localStorage.getItem("authToken");
      const aditionalInfos = {
          method: "DELETE",
          headers: {
            "Content-type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        };
      
      fetch(`${BACKEND_URL}/api/tasks/${id}`, aditionalInfos)
      .then(response => {
        if(!response.ok) throw new Error(response.statusText);
  
        if (response.status === 204) {
           setTasksData(prevTasks => prevTasks.filter(task => task.id !== id))
        }
      })
    }

  function listTasks(tasks: TaskData[]) {
    return tasks.map((task, index) => {
      return (
        <li key={index} className="list-none mb-3">
          <Task
            id={task.id}
            title={task.title}
            description={task.description}
            deadline={task.deadline}
            onDelete={deleteTaskFromDatabase}
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
