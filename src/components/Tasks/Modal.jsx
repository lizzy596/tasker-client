import React from 'react'


const Modal = ({ isOpen, buttonText }) => {
  //const [isOpen, setIsOpen] = useState(false);

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
     {buttonText}
      </button>

      {isOpen && (
        <div className='fixed z-10 inset-0 overflow-y-auto'>
          <div className='flex items-center justify-center min-h-screen'>
            <div className='bg-gray-100 rounded-lg border border-gray-700 w-96'>
              <div className='flex justify-end pr-4 pt-4'>
                <button onClick={closeModal}>X</button>
              </div>

              <div className='px-4 py-3'>
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
}

export default Modal