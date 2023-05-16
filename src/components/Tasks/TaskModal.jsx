import { useState } from 'react';
import CreateTask from './CreateTask';

const TaskModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button
        className='bg-purple-500 text-white py-2 px-4 rounded'
        onClick={openModal}
      >
        Add Task
      </button>

      {isOpen && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen'>
            <div className='bg-gray-100 rounded-lg border border-gray-700 w-96'>
              <div className='flex justify-end pr-4 pt-4'>
                <button onClick={closeModal}>X</button>
              </div>

              <div className='px-4 py-3'>
                <h2 className='text-lg text-center font-medium text-gray-900'>
                  Create Task
                </h2>
                <div className='px-4 py-3'>
                  <CreateTask/>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskModal;
