import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FormError from './FormError';
import { registerMessages } from '../../validations/validationMessages';
import { validateForm } from '../../utils/validate';
import { authService } from '../../services/auth.service';
import { registerValidation } from '../../validations/auth.validation';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
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

  const handleRegisterUser = async (data) => {
    try {
      await authService.register(data);
    } catch (e) {
      console.log(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors(validateForm(registerValidation, registerMessages, formData));
    if (Object.keys(errors)) {
      return;
    } else {
      delete formData['confirmPassword'];

      handleRegisterUser(formData);
      navigate('/login');
    }
  };

  return (
    <form onSubmit={handleSubmit} className='max-w-md mx-auto'>
      <h1 className='text-4xl font-bold text-center text-black my-4'>
        Register
      </h1>
      <div className='mb-4'>
        <label
          className='block text-gray-700 font-bold mb-2'
          htmlFor='firstName'
        >
          First Name
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='firstName'
          name='firstName'
          type='text'
          placeholder='John'
          value={formData.firstName}
          onChange={handleInputChange}
        />
        {errors.firstName && <FormError text={errors.firstName} />}
      </div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 font-bold mb-2'
          htmlFor='lastName'
        >
          Last Name
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='lastName'
          name='lastName'
          type='text'
          placeholder='Smith'
          value={formData.lastName}
          onChange={handleInputChange}
        />
        {errors.lastName && <FormError text={errors.lastName} />}
      </div>
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
        {errors.email && <FormError text={errors.email} />}
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
        {errors.password && <FormError text={errors.password} />}
      </div>
      <div className='mb-6'>
        <label
          className='block text-gray-700 font-bold mb-2'
          htmlFor='confirmPassword'
        >
          Confirm Password
        </label>
        <input
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='confirmPassword'
          name='confirmPassword'
          type='password'
          value={formData.confirmPassword}
          onChange={handleInputChange}
        />
        {errors.confirmPassword && <FormError text={errors.confirmPassword} />}
      </div>
      <div className='flex items-center justify-between'>
        <button
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
          Register
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
