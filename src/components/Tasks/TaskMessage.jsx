import React from 'react';

const TaskMessage = ({ isEditing }) => {
  return <h4 className='text-center text-violet-700 font-bold'>{isEditing? 'Task Edited': 'Task created!!'}</h4>;
}

export default TaskMessage;
