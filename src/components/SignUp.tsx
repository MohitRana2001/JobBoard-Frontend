import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

const signUpSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z.string().regex(/^\d{10}$/, 'Phone number must be 10 digits'),
  companyName: z.string().min(2, 'Company name must be at least 2 characters'),
  companyEmail: z.string().email('Invalid email address'),
  employeeSize: z.number().min(1, 'Employee size is required'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type FormData = z.infer<typeof signUpSchema>;

const SignUp: React.FC = () => {

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if(token){
            navigate('/dashboard');
        }
    }, [navigate]);

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    resolver: zodResolver(signUpSchema),
  });
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post('http://localhost:4000/api/auth/register', data);
      if (response.status === 201) {
        navigate('/verify', { state: { companyEmail: data.companyEmail, phone: data.phone } });
      }
    } catch (err) {
      if (axios.isAxiosError(err) && err.response) {
        setError(err.response.data.msg || 'An error occurred during registration');
      } else {
        setError('An unexpected error occurred');
      }
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <p className="text-gray-600 mb-6 text-center">Join our platform to post jobs and find great candidates</p>
      {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <div>
            <Input id="name" {...register('name')} placeholder="Name" />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <Input id="phone" {...register('phone')} placeholder="Phone no." />
            {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>}
          </div>
          <div>
            <Input id="companyName" {...register('companyName')} placeholder="Company Name" />
            {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName.message}</p>}
          </div>
          <div>
            <Input id="companyEmail" type="email" {...register('companyEmail')} placeholder="Company Email" />
            {errors.companyEmail && <p className="text-red-500 text-sm mt-1">{errors.companyEmail.message}</p>}
          </div>
          <div>
            <Input id="employeeSize" type='number'{...register('employeeSize', { valueAsNumber: true })} placeholder="Employee Size" />
            {errors.employeeSize && <p className="text-red-500 text-sm mt-1">{errors.employeeSize.message}</p>}
          </div>
          <div>
            <Input id="password" type="password" {...register('password')} placeholder="Password" />
            {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>}
          </div>
        </div>
        <Button type="submit" className="w-full mt-6">
          Proceed
        </Button>
      </form>
      <p className="text-sm text-center mt-4 text-gray-600">
        By clicking on proceed you will accept our Terms & Conditions
      </p>
    </div>
  );
};

export default SignUp;