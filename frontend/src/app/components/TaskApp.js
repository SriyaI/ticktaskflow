import React, { useState } from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskInput from "./TaskInput";
import TaskList from "./TaskList";
import { Accordion, AccordionHeader, AccordionBody } from "@material-tailwind/react";

const TaskApp = () => {
    const { tasks, addTask } = useTaskContext();
    const [newTask, setNewTask] = useState("");
    const [dueDate, setDueDate] = useState(new Date().toISOString().split("T")[0]);
    const [open, setOpen] = useState(null);

    const handleAddTask = () => {
        if (newTask.trim() !== "") {
            addTask(newTask, dueDate);
            setNewTask("");
            setDueDate(new Date().toISOString().split("T")[0]);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleAddTask();
        }
    };

    const completedTasks = tasks.filter((task) => task.completed);
    const notCompletedTasks = tasks.filter((task) => !task.completed);

    const handleOpen = (value) => {
        setOpen((prev) => (prev === value ? null : value)); // Close if already open
    };

    return (
        <>
            <TaskInput
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Enter task description"
                onKeyDown={handleKeyDown}
                dueDate={dueDate}
                setDueDate={setDueDate}
            />

            <Accordion open={open === 1}>
                <AccordionHeader onClick={() => handleOpen(1)}>
                    Not Completed Tasks
                </AccordionHeader>
                <AccordionBody>
                    {open === 1 && <TaskList tasks={notCompletedTasks} />}
                </AccordionBody>
            </Accordion>

            <Accordion open={open === 2}>
                <AccordionHeader onClick={() => handleOpen(2)}>
                    Completed Tasks
                </AccordionHeader>
                <AccordionBody>
                    {open === 2 && <TaskList tasks={completedTasks} />}
                </AccordionBody>
            </Accordion>
        </>
    );
};

export default TaskApp;
