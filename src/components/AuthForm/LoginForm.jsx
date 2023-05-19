import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormError from './FormError';
import { validateForm } from '../../utils/validate';
import { loginMessages } from '../../validations/validationMessages';
import { loginValidation } from '../../validations/auth.validation';
import { authService } from '../../services/auth.service';
import AppleLoginButton from './AppleLoginButton';
import GoogleLoginButton from './GoogleLoginButton';
import { useGoogleLogin } from '@react-oauth/google';

const LoginForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { setUser } = authService.useRedirectLoggedIn(navigate);

  const loginGoogle = useGoogleLogin({
    onSuccess: async ({ code }) => {
      await authService.loginWithGoogleToken({ code });
    },
    onError: (error) => console.log(`Login Failed: ${error}`),
    flow: 'auth-code',
  });

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
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',

        alignItems: 'center',
      }}
    >
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
            style={{ width: '700%' }}
            className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
            type='submit'
          >
            Login
          </button>
        </div>
      </form>
      <div
        style={{
          width: '20%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <AppleLoginButton />
        <GoogleLoginButton onPress={loginGoogle} />
      </div>
    </div>
  );
};

export default LoginForm;
