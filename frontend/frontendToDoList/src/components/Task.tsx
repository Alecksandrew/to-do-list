import { FaPen, FaTrash} from "react-icons/fa";
import { type TaskData } from "../types/task";
import { useState } from "react";


type TaskProps = {
  onDelete: (id:number) => void
  onUpdate: (id: number, updatedTask: { title: string; description: string | null; deadline: string | null;  }) => void;
} & TaskData

export default function Task({ id, title, description, deadline, onDelete, onUpdate }: TaskProps) {
  const [ isEditing, setIsEditing ] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const [editedDescription, setEditedDescription] = useState(description);
  const [editedDeadline, setEditedDeadline] = useState(deadline);

   function handleSave() {
    if(!id) return;
    onUpdate(id, { title: editedTitle, description: editedDescription, deadline: editedDeadline  });
    setIsEditing(false); // Exit edit mode after saving
  }

  function handleCancel() {
    setIsEditing(false); // Exit edit mode
    // Reset changes back to original values
    setEditedTitle(title);
    setEditedDescription(description);
    setEditedDeadline(deadline);
  }
  
  
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
      <div className="mx-3 flex-1  [@media(max-width:400px)]:max-w-60">
        {isEditing ? (
          // --- EDIT MODE ---
          <div className="flex flex-col gap-2">
            <input
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="input font-bold text-xl"
            />
            <textarea
              value={editedDescription || ""}
              onChange={(e) => setEditedDescription(e.target.value)}
              className="input text-sm"
              rows={2}
            />
            <input 
              type="datetime-local"
              value={editedDeadline || ''} // Use string vazia se for nulo
              onChange={(e) => setEditedDeadline(e.target.value)}
              className="input text-sm"
            />
          </div>
        ) : (
          // --- VIEW MODE ---
          <div>
            <h3 className="font-bold text-xl">{title}</h3>
            <p className="text-sm mb-3">{description}</p>
            {deadline ? (
              <p className="text-xs italic">Deadline: {formatDeadline(deadline)}</p>
            ) : null}
          </div>
        )}
      </div>
      <div className="flex ml-auto gap-4">
        {isEditing ? (
          // --- EDIT MODE BUTTONS ---
          <div className="flex flex-col sm:flex-row gap-2 ">
            <button onClick={handleSave} className="bg-custom-green text-white font-semibold rounded p-1 w-20">
              Save
            </button>
            <button onClick={handleCancel} className="bg-red-500 text-white font-semibold rounded p-1 w-20">
              Cancel
            </button>
          </div>
        ) : (
          // --- VIEW MODE BUTTONS ---
          <>
            <button onClick={() => setIsEditing(true)} >
              <FaPen size={20} className="hover:fill-custom-green" />
            </button>
            <button onClick={() => {
              if(!id)return
              onDelete(id)
            }
            }>
              <FaTrash size={20} className=" hover:text-red-700" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
