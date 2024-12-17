'use client';

import React, { useActionState } from 'react';
import { login } from './actions';
import { LoginState } from '@/types/actions';
import { useFormStatus } from 'react-dom';

export default function Login() {
  const [state, loginAction] = useActionState<LoginState, FormData>(
    login,
    undefined
  );
  const { pending } = useFormStatus();

  return (
    <form className="max-w-sm mx-auto" autoComplete="off" action={loginAction}>
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="email"
          autoComplete="off"
          name='email'
          required
        />
        {state?.errors?.email && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            Invalid email
          </p>
        )}
      </div>

      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          autoComplete="off"
          name='password'
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          required
        />
        {state?.errors?.password && (
          <p className="mt-2 text-sm text-red-600 dark:text-red-500">
            Invalid password
          </p>
        )}
      </div>

      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        disabled={pending}
      >
        Login
      </button>
    </form>
  );
}
