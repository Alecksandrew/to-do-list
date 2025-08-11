import { FaPen, FaTrash } from "react-icons/fa";



export type Task = {
  title: string;
  description?: string;
  rawDate?: string;
};

export default function Task({ title, description, rawDate }: Task) {
  function formatDate(rawDate: string) {
    if (!rawDate) return;
    const [year, month, day] = rawDate.split("-");
    return `${month}-${day}-${year}`; // english format
  }

  return (
    <div className="flex input items-baseline p-2.5 min-h-[100px]">
      <input type="checkbox" name="isDone" id="" />
      <div className="mx-3">
        <h3 className="font-bold text-xl">{title}</h3>
        <p className="text-sm mb-3">{description}</p>
        {rawDate ? <p className="text-xs italic">Deadline: {formatDate(rawDate)}</p> : null}
      </div>
      <div className="flex ml-auto gap-4">
          <button >
              <FaPen size={20}/>
          </button>
          <button>
              <FaTrash size={20}/>
          </button>
      </div>
    </div>
  );
}
