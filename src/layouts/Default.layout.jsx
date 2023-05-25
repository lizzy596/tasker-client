import { NavBar } from '../components/NavBar';
const DefaultLayout = ({ children }) => {


  // const handleSearch = async (input) => {
  // //   setIsSearching(true);
  // //   //setSearchTerm('');
  // //   //setSearchTerm(input);
   
  // //   const { data }  = await taskService.queryTasks({search:input});
  // //   console.log(data);
  // // setTasks(data);
  // };
  return(
  <>
  {/* <NavBar handleSearch={handleSearch} /> */}
  <div>{children}</div>
  </>);
};

export default DefaultLayout;