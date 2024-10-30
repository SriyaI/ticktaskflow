import React, { useState } from "react";
import "./styles.css"
import { useTaskContext } from "../context/TaskContext";
import { DrawerDefault } from "./Drawer";

import ListItem from "./ListItem";
const TaskItem = ({ task, isRecurring }) => {
  const { updateTask, deleteTask } = useTaskContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(task.completed || false);
  console.log("helloooo")
  const handleUpdate = (updatedTask) => {
    console.log(updatedTask)
    const { id, description, dueDate, recurrence, completed, interval, startDate } = updatedTask;
    updateTask(id, description, dueDate, recurrence, completed, interval, startDate);
    setIsDrawerOpen(false); // Close drawer after update
  };

  const handleClick = () => {
    setIsDrawerOpen(true); // Open the drawer
  };

  return (
    <>
      <ListItem key={task.id} isChecked={isChecked} setIsChecked={setIsChecked} onClick={handleClick} task={task} isRecurring={isRecurring}/>
      {isDrawerOpen && (
          <DrawerDefault
            task={task}
            onClose={() => setIsDrawerOpen(false)}
            onUpdate={handleUpdate}
            onDelete={deleteTask}
            isOpen={isDrawerOpen}
            setIsChecked={setIsChecked}
            isChecked={isChecked}
          />
        )}
    </>
  );
};

export default TaskItem;
