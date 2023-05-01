import { useState } from 'react';
import dayjs from 'dayjs';
import 'dayjs/locale/en';

const Task = ({ task, onDelete, onEdit, onComplete }) => {
  const formattedDate = dayjs(task.dueDate).format('D MMMM, YYYY');
  return (
    <div className='flex items-center justify-between py-4 px-4 my-4 border-b border-gray-200'>
      <div className='flex items-center' key={task.id}>
        <input
          type='checkbox'
          checked={task.isCompleted}
          onChange={() => onComplete(task.id, task)}
          className='h-5 w-5 border border-blue-500 rounded-md checked:bg-blue-500 checked:border-transparent mr-8'
        />
        <div className={`${task.isCompleted ? 'line-through' : ''}`}>
          <h1 className='text-black-800 font-bold font-lg'>{task.title}</h1>
          <div className='text-gray-500'>{formattedDate}</div>
        </div>
      </div>
      <div>
        <button
          onClick={() => onEdit(task.id)}
          className='bg-green-500 hover:bg-green-600 text-white py-1 px-4 mx-4 rounded-full'
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className='bg-red-500 hover:bg-red-600 text-white py-1 px-4 mx-4 rounded-full'
        >
          X
        </button>
      </div>
    </div>
  );
};

export default Task;
