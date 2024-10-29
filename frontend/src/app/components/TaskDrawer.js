// src/components/TaskDrawer.js
import React from 'react';

const TaskDrawer = ({ task, isOpen, onClose }) => {
  return (
    <div className={`drawer ${isOpen ? '' : 'hide'}`}>
      <button className="close-btn" onClick={onClose}>
        Close
      </button>
      <h2>Task Details</h2>
      {task && (
        <>
          <p>Description: {task.description}</p>
          <p>Due Date: {task.due_date}</p>
          <p>Recurrence: {task.recurrence || 'N/A'}</p>
        </>
      )}
    </div>
  );
};

export default TaskDrawer;
