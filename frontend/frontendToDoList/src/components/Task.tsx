import { FaPen, FaTrash } from "react-icons/fa";
import { type TaskData } from "../types/task";


type TaskProps = {
  onDelete: (id:number) => void
} & TaskData

export default function Task({ id, title, description, deadline, onDelete }: TaskProps) {
  function formatDeadline(rawDate: string | undefined): string {
    if (!rawDate) {
      return "No deadline set";
    }

    const date = new Date(rawDate);

    const formattedDate = date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Para usar o formato AM/PM
    });

    return `${formattedDate} at ${formattedTime}`;
  }

  

  return (
    <div className="flex input items-baseline p-2.5 min-h-[100px]">
      <input type="checkbox" name="isDone" id="" />
      <div className="mx-3">
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-sm mb-3">{description}</p>
        {deadline ? (
          <p className="text-xs italic">Deadline: {formatDeadline(deadline)}</p>
        ) : null}
      </div>
      <div className="flex ml-auto gap-4">
        <button>
          <FaPen size={20} />
        </button>
        <button onClick={() => onDelete(id)}>
          <FaTrash size={20} />
        </button>
      </div>
    </div>
  );
}
