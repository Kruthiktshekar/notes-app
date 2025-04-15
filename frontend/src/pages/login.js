import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../app/features/authSlice'; // Adjust the import path as needed
import { useRouter } from 'next/router';
import Navbar from '@/app/NavBar';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(null); // Store error message
  const dispatch = useDispatch();
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = () =>{
    router.replace('/register')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(loginUser(form));

      if (loginUser.fulfilled.match(resultAction)) {
        setForm('')
         router.replace('/home')
      } else {
        console.log('Login failed', resultAction.payload);
        setError(resultAction.payload); 
      }
    } catch (err) {
      setError('An error occurred during login.'); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f0dc]">
      <div className='top-0 fixed w-screen'>
        <Navbar/>
      </div>
      <div className="border border-gray-700 rounded shadow-md w-96">
        <div className="bg-[#fcebcf] border-b border-gray-700 px-3 py-1 flex items-center justify-between">
          <span className="text-xs text-gray-700 font-semibold">Login</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white px-6 py-8 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-gray-700 text-sm mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block text-gray-700 text-sm mb-1">Password</label>
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="flex justify-between">
              <button
                type="submit"
                className="w-full px-4 m-1 py-2 bg-[#f4c794] text-white font-semibold rounded hover:bg-[#e6b37d] text-sm transition duration-200"
              >
                Login
              </button>
              <button
                type="button"
                className="w-full px-4 m-1 py-2 bg-[#aad4cc] text-white font-semibold rounded hover:bg-[#8bc2ba] text-sm transition duration-200"
                onClick={()=>handleRegister()}
              >
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
