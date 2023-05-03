
import Task from './Task'

const Tasks = ({ tasks, onDelete, onComplete }) => {
  return (
    <>
      {tasks.map((task, index) => (
        <Task key={index} task={task} onDelete={onDelete} onComplete={onComplete} />
      ))}
    </>
  )
}

export default Tasks