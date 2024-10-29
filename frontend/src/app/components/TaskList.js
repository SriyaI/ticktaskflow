import React from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = ({ tasks }) => {
    const { loading } = useTaskContext();
    
    if (loading) return <div>Loading...</div>;
    if (!tasks || tasks.length === 0) return <div>No tasks available</div>;

    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} />
            ))}
        </ul>
    );
};

export default TaskList;
