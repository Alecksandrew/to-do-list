import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import Task from "../components/Task";
import { BACKEND_URL } from "../backendURL";
import { type TaskData } from "../types/task";
import Header from "../components/Header";

const EmptyTasks: TaskData[] = [
  {
    title: "",
    description:
      "",
    deadline: "",
  },
  {
    title: "",
    description: "",
    deadline: null,
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
          navigate("/");
          return;
        }

        const response = await fetch(`${BACKEND_URL}/api/tasks`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
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

  function deleteTaskFromDatabase(id: number) {
    const token = localStorage.getItem("authToken");
    const aditionalInfos = {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    fetch(`${BACKEND_URL}/api/tasks/${id}`, aditionalInfos).then((response) => {
      if (!response.ok) throw new Error(response.statusText);

      if (response.status === 204) {
        setTasksData((prevTasks) => prevTasks.filter((task) => task.id !== id));
      }
    });
  }

  async function handleUpdateTask(
    id: number,
    updatedData: { title: string; description: string | null }
  ) {
    const token = localStorage.getItem("authToken");
    if (!token) return navigate("/");

    try {
      const response = await fetch(`${BACKEND_URL}/api/tasks/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updatedData),
      });

      if (response.status === 204) {
        setTasksData((prevTasks) =>
          prevTasks.map((task) =>
            task.id === id ? { ...task, ...updatedData } : task
          )
        );
      } else {
        throw new Error("Falha ao atualizar a tarefa");
      }
    } catch (error) {
      console.error(error);
    }
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
            onUpdate={handleUpdateTask}
          />
        </li>
      );
    });
  }

  return (
    <>
      <Header/>
      <div className="max-w-3xl mx-auto">
        <TaskForm
          setTasksData={setTasksData}
          tasksData={tasksData}
          className="mb-10"
        />
        <ul>{listTasks(tasksData)}</ul>
      </div>
    </>
  );
}
