import { useState, type SetStateAction } from "react";

type TaskForm = {
    className?: string,
    setTasksData: Dispatch<SetStateAction<TaskData[]>>,
    tasksData: TaskData[]
}

export type TaskData = {
    title: string,
    description?: string,
    deadline?:string
}

const emptyTaskData = {
    title: "",
    description: "",
    deadline:""
}

export default function TaskForm({className, tasksData, setTasksData}:TaskForm) {
    const [ taskData, setTaskData ] = useState<TaskData>(emptyTaskData);

    function handleTaskData(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, propertyName:string):void {
        setTaskData({...taskData, [propertyName]: e.target.value});
        console.log(taskData);
    };

    function createTask(){
      if(!taskData.title.trim()) return;
      setTasksData([...tasksData, taskData]);
    }

  return (
    <form className={`${className} flex flex-col gap-2`}>
      <div className="flex gap-2">
          <label className="flex flex-col text-left flex-7/10">
            Title
            <input type="text" name="title" id="" onChange={(e) => handleTaskData(e, "title")} placeholder="Ex: I need to go to market" className="input" />
          </label>
          <label className="flex flex-col text-left">
            Deadline
            <input type="date" name="deadline" id="" onChange={(e) => handleTaskData(e, "deadline")} className="input" />
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
      <button type="button" onClick={createTask} className="bg-custom-green rounded p-0.5 text-white font-semibold w-full">Create task</button>
      
    </form>
  );
}
