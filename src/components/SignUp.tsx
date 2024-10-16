import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../AuthContext';

type FormData = {
  name: string;
  phone: string;
  companyName: string;
  companyEmail: string;
  employeeSize: string;
  password: string;
};

const SignUp: React.FC = () => {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();
  const navigate = useNavigate();
  const { login, setCompanyDetails } = useAuth();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', data);
      console.log('Company registered successfully:', response.data);
      console.log(data);
      if (response.data) {
        console.log("Inside if");
        const { token, ...companyDetails } = response.data;
        setCompanyDetails(companyDetails);
        login(token, companyDetails);
        navigate('/verify');
      }
    } catch (error) {
      console.error('Error registering company:', error);
      // Handle error (e.g., show error message to the user)
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <p className="text-gray-600 mb-6 text-center">Join our platform to post jobs and find great candidates</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <input
            type="text"
            {...register('name', { required: 'Name is required' })}
            placeholder="Name"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <input
            type="tel"
            {...register('phone', { required: 'Phone number is required' })}
            placeholder="Phone no."
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
        </div>
        <div className="mb-4">
          <input
            type="text"
            {...register('companyName', { required: 'Company name is required' })}
            placeholder="Company Name"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
        </div>
        <div className="mb-4">
          <input
            type="email"
            {...register('companyEmail', { required: 'Company email is required' })}
            placeholder="Company Email"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.companyEmail && <p className="text-red-500 text-sm mt-1">{errors.companyEmail.message}</p>}
        </div>
        <div className="mb-6">
          <input
            type="number"
            {...register('employeeSize', { required: 'Employee size is required' })}
            placeholder="Employee Size"
            className="w-full px-3 py-2 border rounded-md"
          />
          {errors.employeeSize && <p className="text-red-500 text-sm mt-1">{errors.employeeSize.message}</p>}
        </div>
        <div className="mb-6">
          <input
            type="password"
            {...register('password', { required: 'Password is required', minLength: 8 })}
            placeholder="Password"
            className="w-full px-3 py-2 border rounded-md"
          />
        {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition duration-300"
        >
          Proceed
        </button>
      </form>
      <p className="text-sm text-center mt-4 text-gray-600">
        By clicking on proceed you will accept our Terms & Conditions
      </p>
    </div>
  );
};

export default SignUp;
