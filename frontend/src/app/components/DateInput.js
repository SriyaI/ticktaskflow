import React, { useState } from "react";

const DatePicker = ({ id, dueDate, setDueDate, setRecurrence, recurrence, interval, setInterval, startDate, setStartDate }) => {

  const handleRecurrenceChange = (e) => {
    const value = e.target.value;
    setRecurrence(value);
  };

  return (
    <>
      <label className="text-purple-900">Due Date:</label>
      <input
        type="date"
        value={dueDate}
        onChange={(e) => setStartDate(e.target.value)}
        style={{ color: '#6B21A8' }}
        disabled={recurrence === "none" || !recurrence}
      />
      <br></br>
      <br></br>
      <br></br>
      <h6 className="mt-6 mb-4 text-lg font-semibold text-purple-900">Recurrence Settings</h6>
      <label className="text-purple-900">Recurrence:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ color: '#6B21A8' }}
        
      />
        <select
        value={recurrence}
        onChange={handleRecurrenceChange}
        className="text-purple-900 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        >
        <option value="none">None</option>
        <option value="daily">Daily</option>
        <option value="weekly">Weekly</option>
        <option value="monthly">Monthly</option>
        <option value="yearly">Yearly</option>
      </select>
      <input
            type="text"
            value={interval}
            onChange={(e) => setInterval(e.target.value)}
            className="block mb-4 w-full border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
            placeholder="Set Interval"
            style={{ color: '#6B21A8' }} // Purple-900 color for the input text value
            disabled={recurrence === "none" || !recurrence}
        />
    </>
  );
};

export default DatePicker;
