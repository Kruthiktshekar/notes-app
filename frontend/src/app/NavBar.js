import React from 'react'

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../app/features/authSlice';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = () => {
     signOut();
    dispatch(logout());
    router.push('/login');
  };

  return (
    <div className="bg-[#A9D6E5] px-6 py-4 flex justify-between items-center">
      <h1 className="text-xl font-semibold">Keep Notes</h1>
      <div className="space-x-4 text-sm font-medium">
        <a href="#">About</a>
        <a href="#">Notes</a>
        <a href="#">Account</a>

        {token ? (
          <button onClick={handleLogout} className="text-red-500 font-semibold">Logout</button>
        ) : (
          <button onClick={() => router.push('/login')} className="text-green-600 font-semibold">Login</button>
        )}
      </div>
    </div>
  );
}
