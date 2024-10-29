import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import DatePicker from "./DatePicker";

const TaskForm = () => {
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState("");
  const { addNewTask } = useTaskContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description.trim()) return;
    addNewTask({ description, due_date: dueDate });
    setDescription("");
    setDueDate("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add a new task"
      />
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
        placeholder="Due Date"
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
