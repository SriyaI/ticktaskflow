const client=require("../connection");

async function calculateNextDate(startDate, type, interval, id) {
   console.log(startDate)
    let nextDate = new Date(startDate);
    console.log(type)
    switch (type||"") {
      case 'daily':
        nextDate.setDate(nextDate.getDate() + interval);
        break;
      case 'weekly':
        nextDate.setDate(nextDate.getDate() + interval * 7);
        console.log("hi")
        break;
      case 'monthly':
        if (recurrence.nthDay) {
          nextDate.setMonth(nextDate.getMonth() + interval);
          nextDate.setDate(recurrence.nthDay);
        } else {
          nextDate.setMonth(nextDate.getMonth() + interval);
        }
        break;
      case 'yearly':
        nextDate.setFullYear(nextDate.getFullYear() + interval);
        break;
    }
  
    // For weekly recurrence, ensure it's a specified day
    // if (recurrence.type === 'weekly' && recurrence.specificDays) {
    //   while (!recurrence.specificDays.includes(nextDate.getDay())) {
    //     nextDate.setDate(nextDate.getDate() + 1);
    //   }
    // }

    nextDate.setDate(nextDate.getDate()+1);
    console.log(nextDate)
    // try{
    //     const result = await client.query(
    //       "UPDATE recurrence SET nextDate = $1 WHERE id = $2 RETURNING *",
    //       [nextDate, parseInt(id, 10)]  // Ensure id is an integer
    //   );
    // }catch (err) {
    //   console.error('Error updating nextDate:', err);
    // }
  
    return nextDate;
  }
  

  async function updateNextDate(taskId) {
    try {
      const newNextDate = calculateNextDate(currentNextDate, recurrence);
  
      // Step 3: Update the nextDate in the database
      await client.query('UPDATE tasks SET nextDate = $1 WHERE id = $2', [newNextDate, taskId]);
  
      console.log(`Updated nextDate for task ID ${taskId} to ${newNextDate}`);
    } catch (err) {
      console.error('Error updating nextDate:', err);
    }
  }
  
  // Example function to be called when a task is displayed on the frontend
  async function onTaskDisplay(taskId) {
    // Logic to display the task...
    console.log(`Displaying task ID: ${taskId}`);
  
    // Update the nextDate when the task is displayed
    await updateNextDate(taskId);
  }

module.exports=calculateNextDate;