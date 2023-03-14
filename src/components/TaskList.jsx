import Task from "./Task"

const TaskList = ({ tasks,onDelete,onToggle}) => {
  return (
    <>
    {tasks.map((task,index) => (
      <Task key={index} task={task}
      onDelete={onDelete} OnToggle={onToggle}/>
    ))}    
    </>
  )
}

export default TaskList