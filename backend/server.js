const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const client = require("./connection"); // Import the PostgreSQL client
const calculateNextDate=require("./utils/dateChanges")

const app = express();
const PORT = 5000;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Endpoint to get PostgreSQL version (for testing)
app.get("/version", async (req, res) => {
  try {
    const result = await client.query("SELECT VERSION()");
    res.json(result.rows[0]);
  } catch (error) {
    console.error("Error retrieving version:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Endpoint to get all tasks
app.get("/tasks", async (req, res) => {
    try {
      const query = `
        SELECT tasks.id AS task_id, recurrence.id AS recurrence_id, tasks.*, recurrence.* 
        FROM tasks
        LEFT JOIN recurrence ON tasks.id = recurrence.task_id
        ORDER BY tasks.id DESC
      `;

      const query2 = `
        SELECT * 
        FROM recurrence
      `;
      
      const result = await client.query(query);
      const result2 = await client.query(query2);
      result2.rows.map(task=>console.log(task))
      const tasks = result.rows.map(task => ({
        id: task.task_id,
        description: task.description,
        created_at: task.created_at,
        due_date: task.due_date,
        recurrence: task.type, 
        interval:task.interval,
        completed: task.completed
      }));
  
      res.json(tasks);
    } catch (error) {
      console.error("Error retrieving tasks:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

app.get("/create", async (req, res) => {
    try {
      const result = await client.query("DELETE FROM tasks WHERE id > 0;");
      res.json(result);
    } catch (error) {
      console.error("Error retrieving tasks:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

// Endpoint to add a new task
app.post("/tasksPost", async (req, res) => {
    const { description, due_date, nextDate } = req.body;
  
    if (!description) {
      return res.status(400).json({ error: "Description is required" });
    }
  
    try {
      const result = await client.query(
        "INSERT INTO tasks (description, due_date, nextDate) VALUES ($1, $2, $3) RETURNING *",
        [description, due_date, nextDate]
      );
      res.json(result.rows[0]);
    } catch (error) {
      console.error("Error adding task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }); 
  
  app.put("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    const { description, due_date, recurrence, checked, interval, startDate } = req.body;
  
    console.log("Updating Task - ID:", id);
    console.log("Description:", description);
    console.log("Due Date:", due_date);
    console.log("Recurrence:", recurrence);
    console.log("Checked:", checked);
  
    try {
        const result = await client.query(
            "UPDATE tasks SET description = $1, due_date = $2, completed = $3 WHERE id = $4 RETURNING *",
            [description, due_date, checked, parseInt(id, 10)]
          );
          
          if (recurrence) {
            const type=recurrence;
            const nextDate=await calculateNextDate(startDate,type,interval);
            console.log("kjsdvjkbf "+nextDate);
            // Update or insert recurrence based on task_id
            const recResult=await client.query(
                "UPDATE recurrence SET type = $2, interval = $3, nextDate = $4 WHERE task_id = $1 RETURNING *",
                [parseInt(id, 10), type, interval, nextDate]
              );
          //await calculateNextDate(startDate,type,interval, id)
        }

      const updatedTask = result.rows[0];
      res.json(updatedTask);
    } catch (error) {
      console.error("Error updating task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

  app.put("/tasks/:id/checked", async (req, res) => {
    const { id } = req.params;
    const { isChecked } = req.body;

    console.log("Updating Task Checked Status - ID:", id);
    console.log("Is Checked:", isChecked);

    try {
        const result = await client.query(
            "UPDATE tasks SET completed = $1 WHERE id = $2 RETURNING *",
            [isChecked, parseInt(id, 10)]  // Ensure id is an integer
        );
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating task checked status:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

  app.post("/tasks/recurring/:id", async (req, res) => {
    const { id } = req.params; // task_id from the URL
    const { type, interval } = req.body; // recurrence type and interval from the request body
  
    try {
      // Check if the task exists
      const taskCheck = await client.query("SELECT * FROM tasks WHERE id = $1", [id]);
      if (taskCheck.rows.length === 0) {
        return res.status(404).json({ error: "Task not found" });
      }
  
      // Insert the recurrence data
      const result = await client.query(
        "INSERT INTO recurrence (task_id, type, interval) VALUES ($1, $2, $3) RETURNING *",
        [id, type, interval]
      );
  
      res.status(201).json(result.rows[0]); // Return the newly created recurrence record
    } catch (error) {
      console.error("Error adding recurring task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
});
  
  
  app.delete("/tasks/:id", async (req, res) => {
    const { id } = req.params;
    try {
      await client.query("DELETE FROM tasks WHERE id = $1", [id]);
      res.sendStatus(204);
    } catch (error) {
      console.error("Error deleting task:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
