import React, { useState, useMemo } from "react";
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

    const completedTasks = useMemo(() => tasks.non_recurring.filter((task) => task.completed), [tasks.non_recurring]);
    const notCompletedTasks = useMemo(() => tasks.non_recurring.filter((task) => !task.completed), [tasks.non_recurring]);
    const recurringTasks = useMemo(() => tasks.recurring, [tasks.recurring]);
    
    const handleOpen = (value) => {
        setOpen((prev) => (prev === value ? null : value)); // Close if already open
    };
    
    const handleAccordionClick = (value) => () => {
        console.log("Toggling accordion:", value); // Check which accordion is being toggled
        handleOpen(value);
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
                <AccordionHeader onClick={handleAccordionClick(1)}>
                    Not Completed Tasks
                </AccordionHeader>
                <AccordionBody>
                    {open === 1 && <TaskList tasks={notCompletedTasks} key="not-completed" isRecurring={false} />}
                </AccordionBody>
            </Accordion>

            <Accordion open={open === 2}>
                <AccordionHeader onClick={handleAccordionClick(2)}>
                    Completed Tasks
                </AccordionHeader>
                <AccordionBody>
                    {open === 2 && <TaskList tasks={completedTasks} key="completed" isRecurring={false} />}
                </AccordionBody>
            </Accordion>

            <Accordion open={open === 3}>
                <AccordionHeader onClick={handleAccordionClick(3)}>
                    Recurring Tasks
                </AccordionHeader>
                <AccordionBody>
                    {open === 3 && <TaskList tasks={recurringTasks} key="recurring" isRecurring={true} />}
                </AccordionBody>
            </Accordion>
        </>
    );
};

export default TaskApp;
