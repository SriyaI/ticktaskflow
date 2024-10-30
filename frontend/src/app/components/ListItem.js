import React, { useEffect } from 'react'
import { Checkbox, Typography } from "@material-tailwind/react";
import { useTaskContext } from '../context/TaskContext';

const ListItem = ({isChecked, setIsChecked, task, onClick, isRecurring}) => {
  const {updateRecurringTask}=useTaskContext();
  
  useEffect(() => {

    if(isRecurring){
      const isToday = (date) => {
        const today = new Date();
        return (
          date.getDate() === today.getDate() &&
          date.getMonth() === today.getMonth() &&
          date.getFullYear() === today.getFullYear()
        );
      };
      
      const nextDate = new Date(task.nextDate); // Example nextDate
      console.log(nextDate)
      // Check if today is the same day as nextDate
      if (isToday(nextDate)) {
        updateRecurringTask(task.id,nextDate);
      }
    }  
    
  }, []);

  return (
    <li>
        <div
          onClick={onClick}
          className="flex w-full cursor-pointer items-center px-3 py-2 hover:bg-purple-800"
        >
          <div className="mr-3">
          <input
            type="checkbox"
            id={task.id}
            checked={isChecked}
            onChange={(e) => setIsChecked(e.target.checked)} // Sync checkbox state
            className="cursor-pointer" // Optional: Add a class for pointer cursor
          />
          </div>
          <div>
            <Typography color="blue-gray" className="font-medium">
              {task.description}
            </Typography>
            <Typography color="blue-gray" className="text-sm">
              Due: {task.due_date || "No due date"}
            </Typography>
            <Typography color="blue-gray" className="text-sm">
              Recurrence: {task.recurrence || "None"}
            </Typography>
          </div>
        </div>
      </li>
  )
}

export default ListItem
