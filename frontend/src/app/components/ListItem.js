import React from 'react'
import { Checkbox, Typography } from "@material-tailwind/react";

const ListItem = ({isChecked, setIsChecked, task, onClick}) => {
  return (
    <li>
        <div
          onClick={onClick}
          className="flex w-full cursor-pointer items-center px-3 py-2 hover:bg-purple-800"
        >
          <div className="mr-3">
            <Checkbox
              id={task.id}
              checked={isChecked}
              ripple={true} // Enable ripple effect
              onChange={(e) => setIsChecked(e.target.checked)} // Sync checkbox state
              containerProps={{
                className: "p-0",
              }}
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
