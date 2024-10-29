import React, { useState } from "react";

const DatePicker = ({ dueDate, setDueDate, onRecurrenceChange }) => {
  const [recurrence, setRecurrence] = useState("none");

  const handleRecurrenceChange = (e) => {
    const value = e.target.value;
    setRecurrence(value);
    onRecurrenceChange(value);
  };

  return (
    <div>
      <label>Due Date:</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setDueDate(e.target.value)}
      />
      <label>Recurrence:</label>
      <select value={recurrence} onChange={handleRecurrenceChange}>
        <option value="none">None</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
    </div>
  );
};

export default DatePicker;
