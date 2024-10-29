import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);  // Initialize tasks as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/tasks"); // Adjust URL if needed
        console.log(response.data);
        setTasks(response.data);  // Update tasks with response data
      } catch (error) {
        console.error("Error fetching tasks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (description, dueDate) => {
    try {
      const response = await axios.post("http://localhost:5000/tasksPost", {
        description,
        due_date: dueDate,
        nextDate: new Date()
      });
      setTasks((prevTasks) => [response.data, ...prevTasks]);  // Add new task to state
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateRecurringTask = async (id, recurrence) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, {
        description,
        due_date: dueDate,
        recurrence,
        checked,  // Include checked status in the request body
      });
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? response.data : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const addRecurringTask = async (id, type, interval) => {
    try {
      const response = await axios.post(`http://localhost:5000/tasks/recurring/${id}`, {
        type,
        interval,
        task_id:id
      });
      setTasks((prevTasks) => [response.data, ...prevTasks]);  // Add new task to state
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (id, description, dueDate, recurrence, checked, interval, startDate) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${id}`, {
        description,
        due_date: dueDate,
        recurrence,
        checked,  // Include checked status in the request body
        interval,
        startDate
      });
  
      setTasks((prevTasks) =>
        prevTasks.map((task) =>
          task.id === id ? response.data : task
        )
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };
  
  const updateChecked = async (id, isChecked) => {
    try {
        const response = await fetch(`http://localhost:5000/tasks/${id}/checked`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isChecked }),  // Send the updated checked status
        });

        if (!response.ok) {
            throw new Error('Failed to update task checked status');
        }
        
        const updatedTask = await response.json();
        console.log("Updated Task:", updatedTask); // Log the updated task if needed

    } catch (error) {
        console.error("Error updating checked status:", error);
    }
};
  

  return (
    <TaskContext.Provider value={{ tasks, addTask, loading, updateTask, updateChecked, addRecurringTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
