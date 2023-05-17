
import Task from './Task'

const Tasks = ({ tasks, onDelete, onComplete, onEdit }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} onEdit={onEdit} onComplete={onComplete} />
      ))}
    </>
  )
}

export default Tasks