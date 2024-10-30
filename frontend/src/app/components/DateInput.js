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
      <label className="mt-6 mb-4 text-lg font-semibold text-purple-900">Recurrence:</label>
      <br></br>
      <br></br>
      <label className="mt-6 mb-4 text-base font-semibold text-purple-900" style={{ marginRight: '7px' }} >Start Date:</label>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setDueDate(e.target.value)}
        style={{ color: '#6B21A8' }}
        
      />
      <br></br>
      <br></br>
        <select
          value={recurrence}
          onChange={handleRecurrenceChange}
          className="text-purple-900 border border-gray-300 p-2 pr-8 rounded-lg focus:outline-none focus:ring focus:ring-blue-500 appearance-none"
          style={{ marginRight: '16px' }} 
        >
          <option value="none">None</option>
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
          <option value="yearly">Yearly</option>
        </select>

      {recurrence==="weekly"&&<select
        value={recurrence}
        onChange={handleRecurrenceChange}
        className="text-purple-900 border border-gray-300 p-2 pl-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        >
        <option value="monday">Monday</option>
        <option value="tuesday">Tuesday</option>
        <option value="wednesday">Wednesday</option>
        <option value="thursday">Thursday</option>
        <option value="friday">Friday</option>
        <option value="saturday">Saturday</option>
        <option value="sunday">Sunday</option>
      </select>}
      {recurrence==="monthly"&&
      <select
        value={recurrence}
        onChange={handleRecurrenceChange}
        className="text-purple-900 border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        >
        {Array.from({ length: 30 }, (_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1}</option>
        ))}
      </select>}
      {recurrence==="yearly"&&<select
        value={recurrence}
        onChange={handleRecurrenceChange}
        className="text-purple-900 border border-gray-300 p-2 pl-4 rounded-lg focus:outline-none focus:ring focus:ring-blue-500"
        >
        <option value="january">January</option>
        <option value="february">February</option>
        <option value="march">March</option>
        <option value="april">April</option>
        <option value="may">May</option>
        <option value="june">June</option>
        <option value="july">July</option>
        <option value="august">August</option>
        <option value="september">September</option>
        <option value="october">October</option>
        <option value="november">November</option>
        <option value="december">December</option>
      </select>}
      <br></br>
      <br></br>
      <label className="mt-6 mb-4 text-base font-semibold text-purple-900" style={{ marginRight: '7px' }} >Interval:</label>
      <br></br>
      <br></br>
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
