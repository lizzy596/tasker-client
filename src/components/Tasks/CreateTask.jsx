import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useUserAuth } from '../../services/auth.service';
import TaskMessage from './TaskMessage';

const CreateTask = ({
  openModal,
  onCreate,
  isEditing,
  onEdit,
  setEditTask,
}) => {
  const userValue = useUserAuth();
  const [showTaskMessage, setShowTaskMessage] = useState(false);
  const [dueDate, setDueDate] = useState(new Date());

  const [formData, setFormData] = useState({
    title: '',
  });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDateChange = (date) => {
    setDueDate(date);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (isEditing) {
      await onEdit(setEditTask.id, {
        ...formData,
        dueDate,
        userId: userValue.id,
      });
      setFormData({
        title: '',
      });
      setDueDate(new Date());
      setShowTaskMessage(true);
    } else {
      await onCreate({ ...formData, dueDate, userId: userValue.id });
      setFormData({
        title: '',
      });
      setDueDate(new Date());
      setShowTaskMessage(true);
    }
  };

  useEffect(() => {
    if (isEditing) {
      console.log(setEditTask);
      setFormData({ title: setEditTask.title });
      setDueDate(new Date(setEditTask.dueDate));
    }
  }, []);

  useEffect(() => {
    let timeout;
    timeout = setTimeout(() => {
      setShowTaskMessage(false);
    }, 2000);
    return () => {
      clearTimeout(timeout);
    };
  }, [showTaskMessage]);

  return (
    <>
      {showTaskMessage && <TaskMessage />}
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        <div className='flex justify-end pr-4 pt-4'>
          <button onClick={() => openModal()}>X</button>
        </div>
        <h2 className='text-lg text-center font-medium text-gray-900'>
          {isEditing ? 'Edit Task' : 'Create Task'}
        </h2>

        <div className='mb-4'>
          <label htmlFor='title' className='block text-gray-700 font-bold mb-2'>
            Title
          </label>
          <input
            type='text'
            id='title'
            name='title'
            value={formData.title}
            onChange={handleInputChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <div className='mb-4'>
          <label
            htmlFor='dueDate'
            className='block text-gray-700 font-bold mb-2'
          >
            Due Date
          </label>
          <DatePicker
            id='dueDate'
            name='dueDate'
            selected={dueDate}
            onChange={handleDateChange}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-white-700 leading-tight focus:outline-none focus:shadow-outline'
          />
        </div>
        <button
          type='submit'
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
        >
          {isEditing ? 'Edit Task' : 'Create Task'}
        </button>
      </form>
    </>
  );
};

export default CreateTask;
