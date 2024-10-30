import React from "react";
import { useTaskContext } from "../context/TaskContext";
import TaskItem from "./TaskItem";

const TaskList = React.memo(({ tasks, isRecurring }) => {
    const { loading } = useTaskContext();
    console.log("hiiiiiiiii")
    if (loading) return <div>Loading...</div>;
    if (!tasks || tasks.length === 0) return <div>No tasks available</div>;

    return (
        <ul>
            {tasks.map((task) => (
                <TaskItem key={task.id} task={task} isRecurring={isRecurring}/>
            ))}
        </ul>
    );
},(prevProps, nextProps) => {
    return prevProps.tasks === nextProps.tasks && prevProps.isRecurring === nextProps.isRecurring;
});

export default TaskList;
