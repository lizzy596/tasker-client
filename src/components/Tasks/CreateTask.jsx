import { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { taskService } from '../../services/task.service';
import { useUserAuth } from '../../services/auth.service';

const CreateTask = () => {
  const userValue = useUserAuth();
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

    await taskService.createTask({
      ...formData,
      dueDate,
      userId: userValue.id,
    });

    setFormData({
      title: '',
    });

    setDueDate(new Date());
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
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
        <label htmlFor='dueDate' className='block text-gray-700 font-bold mb-2'>
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
        Create Task
      </button>
    </form>
  );
};

export default CreateTask;
