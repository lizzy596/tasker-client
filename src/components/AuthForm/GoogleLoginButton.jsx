import React from 'react';
import GoogleIcon from './assets/Google.svg';

const GoogleLoginButton = ({onPress}) => {
  return (
    <div className='flex space-evenly my-4 bg-gray-200 border-gray-800 py-2 rounded w-1/2'>
      <img src={GoogleIcon} alt='Apple Icon' className='px-4' onClick={()=>onPress()}/>
      <h4>Login with Google</h4>
    </div>
  );
};

export default GoogleLoginButton;
