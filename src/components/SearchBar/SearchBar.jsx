const SearchBar = ({ handleSearch }) => {


  const handleInputChange = (e) => {
    const value = e.target.value;
    handleSearch(value)
  };

  return (
    <div className='flex items-center'>
      <input
        type='text'
        //value={searchInput}
        onKeyUp={(e) => handleInputChange(e)}
        className='border border-gray-300 rounded-l py-2 px-4 w-64 focus:outline-none focus:ring-2 focus:ring-blue-500'
        placeholder='Search Tasks...'
      />
    </div>
  );
};

export default SearchBar;
