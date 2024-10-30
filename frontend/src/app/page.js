"use client";

import React from "react";
import TaskApp from "./components/TaskApp";
import { TaskProvider } from "./context/TaskContext";

const App = () => {
  return (
    <TaskProvider>
      <TaskApp />
    </TaskProvider>
  );
};

export default App;
