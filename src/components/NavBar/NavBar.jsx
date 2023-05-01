import { useNavigate } from 'react-router-dom';
import { authService } from '../../services/auth.service';

const NavBar = () => {
  const userValue = authService.userValue;
  const navigate = useNavigate();

  const handleLoginNav = () => {
    navigate('/login');
  };

  const handleLogout = () => {
    authService.logout();
  };

  return (
    <nav className='bg-blue-500 w-full py-4'>
      <div className='max-w-7xl mx-auto px-4  sm:px-6 lg:px-8 flex justify-between items-center h-16'>
        <div className='flex-shrink-0'>
          <span className='text-purple-800 font-bold text-lg'>TASKER</span>
        </div>
        <div className='flex flex-col items-center'>
          <button
            className='bg-red-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded mr-4'
            onClick={userValue ? handleLogout : handleLoginNav}
          >
            {userValue ? `Logout` : `Login`}
          </button>
          <span className='text-black-500 text-sm py-2'>
            Don't have an account?{' '}
            <a
              href='/register'
              className='text-purple-600 hover:text-crimson-700 font-bold'
            >
              Sign Up
            </a>
          </span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
