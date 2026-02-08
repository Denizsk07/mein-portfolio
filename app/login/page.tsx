'use client';

import { getCsrfToken, signIn } from 'next-auth/react';
import { useState, useEffect } from 'react';

export default function Login() {
  const [csrfToken, setCsrfToken] = useState<string | null>(null);

  useEffect(() => {
    const fetchCsrfToken = async () => {
      const token = await getCsrfToken();
      setCsrfToken(token ?? null);  // Ensure token is either string or null
    };

    fetchCsrfToken();
  }, []);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const username = event.currentTarget.username.value;
    const password = event.currentTarget.password.value;

    console.log('Submitting credentials', { username, password });

    const result = await signIn('credentials', {
      redirect: false,
      username,
      password,
    });

    console.log('Result:', result);

    if (result && !result.error) {  // Ensure result is not undefined
      window.location.href = '/admin';
    } else {
      console.error('Login failed:', result?.error);
    }
  };

  if (!csrfToken) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Gesicherter Bereich</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input name="csrfToken" type="hidden" value={csrfToken} />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="username" className="sr-only">Benutzer</label>
              <input id="username" name="username" type="text" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Username" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Passkey</label>
              <input id="password" name="password" type="password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input id="remember_me" name="remember_me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900">Remember me</label>
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              Anmelden
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
