
import Task from './Task'

const Tasks = ({ tasks, onDelete, onComplete, onEdit, isComplete }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} onEdit={onEdit} onComplete={onComplete} isComplete={isComplete} />
      ))}
    </>
  )
}

export default Tasks