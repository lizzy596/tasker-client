const SearchBar = () => {
  return (
    <div className='flex items-center'>
      <input
        type='text'
        className='border border-gray-300 rounded-l py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Search Tasks...'
      />
      <button className='bg-blue-500 text-white py-2 px-4 mx-3 rounded-r border border-white'>
        Search
      </button>
    </div>
  );
};

export default SearchBar;
