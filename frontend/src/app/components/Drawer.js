import React from "react";
import { Drawer } from "@material-tailwind/react";
import DateInput from "./DateInput";
import { useTaskContext } from "../context/TaskContext";
import { Checkbox } from "@material-tailwind/react";

export function DrawerDefault({ task, onClose, onUpdate, onDelete, isOpen, setIsChecked, isChecked }) {
  const [description, setDescription] = React.useState(task.description || "");
  const [dueDate, setDueDate] = React.useState(task.dueDate || new Date().toISOString().split("T")[0]);
  const [startDate, setStartDate] = React.useState(task.dueDate || new Date().toISOString().split("T")[0]);
  const [recurrence, setRecurrence] = React.useState(task.recurrence || "");
  const [interval, setInterval]=React.useState(task.interval || 1)
  const {updateChecked}=useTaskContext();

  React.useEffect(() => {
    setDescription(task.description || "");
    setDueDate(task.dueDate || new Date().toISOString().split("T")[0]);
    setRecurrence(task.recurrence || "");
  }, [task]);

  return (
    <div className="relative">
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-40" onClick={onClose}></div>
      )}
      <Drawer
        open={isOpen}
        onClose={onClose}
        className="p-4 z-50" // Ensure z-index is higher than the backdrop
        placement="right"
      >
        <h5 className="mb-6 text-2xl font-bold text-purple-900">Edit Task</h5>
        <button onClick={onClose} className="absolute top-4 right-4 text-purple-900 text-lg hover:text-gray-600 transition duration-200">
          &times; {/* Close icon */}
        </button>
        <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="block mb-4 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Task description..."
            style={{ color: '#6B21A8' }} // Purple-900 color for the input text value
        />

        <DateInput
          id={task.id}
          dueDate={dueDate}
          setDueDate={setDueDate}
          setRecurrence={setRecurrence}
          recurrence={recurrence}
          interval={interval}
          setInterval={setInterval}
          startDate={startDate}
          setStartDate={setStartDate}
        />
        <br></br>
        <br></br>
        <br></br>
        <button 
          onClick={() => onUpdate({ id: task.id, description, dueDate, recurrence, completed: isChecked, interval, startDate })} 
          className="bg-blue-700 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-200 mr-2"
        >
          Save
        </button>
        <button 
          onClick={() => onDelete(task.id)} 
          className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition duration-200"
        >
          Delete
        </button>
        <br></br>
        <br></br>
        <br></br>
        <Checkbox
              id={task.id}
              checked={isChecked}
              ripple={true} // Enable ripple effect
              onChange={(e) => setIsChecked(e.target.checked)} // Sync checkbox state
              containerProps={{
                className: "p-0",
              }}
            />
      </Drawer>
    </div>
  );
}
