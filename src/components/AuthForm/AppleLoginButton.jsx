import React from 'react';
import AppleIcon from './assets/Apple.svg';

const AppleLoginButton = () => {
  return (
    <div className='flex space-evenly my-4 bg-gray-200 border-gray-800 py-2 rounded w-1/2'>
      <img src={AppleIcon} alt='Apple Icon' className='px-4' />
      <h4>Login with Apple</h4>
    </div>
  );
};

export default AppleLoginButton;
