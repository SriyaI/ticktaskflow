import axios from "axios";

const BASE_URL = "http://localhost:5000";

export const getTasks = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/tasks`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const addTask = async (description, due_date) => {
    try {
      const response = await axios.post(`${BASE_URL}/tasksPost`, { description, due_date });
      return response.data;
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };
  
