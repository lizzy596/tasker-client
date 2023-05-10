import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import FormError from './FormError';
import { validateForm } from '../../utils/validate';
import { loginMessages } from '../../validations/validationMessages';
import { loginValidation } from '../../validations/auth.validation';
import { authService } from '../../services/auth.service';
import AppleLoginButton from './AppleLoginButton';
import GoogleLoginButton from './GoogleLoginButton';
import { GoogleLogin, googleLogout, useGoogleLogin } from '@react-oauth/google';

const LoginForm = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState([]);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const logOut = () => {
    googleLogout();
  };

  const { setUser } = authService.useRedirectLoggedIn(navigate);

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => setUserInfo(tokenResponse),
    onError: (error) => console.log(`Login Failed: ${error}`),
  });

  // const login = useGoogleLogin({
  //   onSuccess: (response) => {
  //     setUserInfo(response)

  //   },
  //   onError: (error) => console.log(`Login Failed: ${error}`),
  // });

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors(validateForm(loginValidation, loginMessages, formData));
    if (Object.keys(errors).length > 0) {
      return;
    } else {
      const loggedIn = await authService.login(formData);
      setUser(loggedIn);

      // handleRegisterUser(formData);
      // navigate('/login')
    }
  };

  const handleGoogleLogin = async (accessToken) => {
    login();
    console.log(userInfo);

    // const user = await authService.loginWithGoogleToken(accessToken);
    console.log('pappy');
    // console.log(userInfo);
  };

  // useEffect(() => {
  //   if (userInfo.length > 0) {
  //     handleGoogleLogin();
  //   }
  // }, [userInfo]);

  return (
    <>
      <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
        <h1 className='text-4xl font-bold text-center text-black my-4'>
          Login
        </h1>
        <div className='mb-4'>
          <label className='block text-gray-700 font-bold mb-2' htmlFor='email'>
            Email
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='email'
            type='email'
            name='email'
            placeholder='john@example.com'
            value={formData.email}
            onChange={handleInputChange}
          />
          {errors?.email && <FormError text={errors.email} />}
        </div>
        <div className='mb-6'>
          <label
            className='block text-gray-700 font-bold mb-2'
            htmlFor='password'
          >
            Password
          </label>
          <input
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
            id='password'
            name='password'
            type='password'
            value={formData.password}
            onChange={handleInputChange}
          />
          {errors?.password && <FormError text={errors.password} />}
        </div>
        <div className='flex items-center justify-between'>
          <button
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Login
          </button>
        </div>
      </form>
      <div>
        <AppleLoginButton />
        <GoogleLoginButton onPress={handleGoogleLogin} />
        {/* <GoogleLogin
            onSuccess={credentialResponse => {
              console.log(credentialResponse);
            }}
          
            onError={() => {
              console.log('Login Failed');
            }}
          
          /> */}
      </div>
    </>
  );
};

export default LoginForm;
