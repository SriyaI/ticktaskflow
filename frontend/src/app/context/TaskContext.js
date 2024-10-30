import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState({ recurring: [], non_recurring: [] });  // Initialize tasks as an empty array
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:5000/tasks"); // Adjust URL if needed
        const { recurring, non_recurring } = response.data;
        console.log(response.data);
        setTasks({recurring,non_recurring});  // Update tasks with response data
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
      console.log(response.data)
      setTasks((prevTasks) => ({
        ...prevTasks,
        non_recurring: [response.data, ...prevTasks.non_recurring],
    }));
      // Add new task to state
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateRecurringTask = async (id, date) => {
    try {
        console.log(id,date)
      const response = await axios.put(`http://localhost:5000/tasks/rucurring-date/${id}`, {
        date:new Date(date)
      });
      console.log(new Date())
      console.log(response.data)
      const updatedTask = response.data;
      setTasks((prevTasks) => {
        return {
          ...prevTasks,
          recurring: prevTasks.recurring.map((task) =>
            task.id === id
              ? { ...task, nextDate: updatedTask.nextdate }
              : task
          ),
        };
      });
      
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
        completed: checked,  // Pass checked status as completed
        interval,
        startDate
      });
      console.log(response.data);
  
      // Update tasks based on category
      setTasks((prevTasks) => {
        const updatedTask = response.data;
  
        // Update recurring or non_recurring based on recurrence value
        if (recurrence) {
          return {
            ...prevTasks,
            recurring: prevTasks.recurring.map((task) =>
              task.id === id ? updatedTask : task
            )
          };
        } else {
          return {
            ...prevTasks,
            non_recurring: prevTasks.non_recurring.map((task) =>
              task.id === id ? updatedTask : task
            )
          };
        }
      });
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
    <TaskContext.Provider value={{ tasks, addTask, loading, updateTask, updateChecked, addRecurringTask, updateRecurringTask }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => useContext(TaskContext);
