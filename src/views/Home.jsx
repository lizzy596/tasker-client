import { NavBar } from '../components/NavBar';
// import { authService } from '../services/auth.service';
import TaskModal from '../components/Tasks/TaskModal';
import { useUserAuth } from '../services/auth.service';

const Home = () => {
  // const userValue = authService.userValue;
  const userValue = useUserAuth();



  return (
    <>
      <NavBar />
      <div className='flex justify-center items-center'>
        <div className='absolute left-1 top-30'>
          <TaskModal />
        </div>
        <h4 className='text-4xl font-bold text-center my-3 '>
          {`Welcome Back ${
            userValue?.firstName.charAt(0).toUpperCase() +
            userValue?.firstName.slice(1)
          }!`}
        </h4>
      </div>
    </>
  );
};

export default Home;
