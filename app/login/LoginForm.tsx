'use client';

import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ErrorMessage from '../components/ErrorMessage';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormValues>();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const onSubmit = async (data: LoginFormValues) => {
    try {
      const response = await axios.post(
        'https://rb-playground.onrender.com/internal/api/v1/auth/login/',
        {
          email: data.email,
          password: data.password,
        },
        {
          headers: { 'Content-Type': 'application/json' },
        }
      );

      const responseData = response.data;
      if (responseData?.status && responseData?.data?.access) {
        // Store the access token in local storage
        localStorage.setItem('accessToken', responseData.data.access);

        // Redirect to the dashboard
        router.push('/dashboard');
      } else {
        setError('Invalid response structure.');
      }
    } catch (err) {
      setError('Login failed. Please check your credentials and try again.');
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="p-6 bg-white shadow-md rounded-md w-full max-w-sm"
    >
      <h1 className="text-xl font-semibold mb-4">Login</h1>
      {error && <ErrorMessage message={error} />}

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Email</label>
        <input
          {...register('email', { required: 'Email is required' })}
          type="email"
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium mb-1">Password</label>
        <input
          {...register('password', { required: 'Password is required' })}
          type="password"
          className="w-full px-3 py-2 border rounded-md focus:outline-none"
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
      >
        Login
      </button>
    </form>
  );
}
