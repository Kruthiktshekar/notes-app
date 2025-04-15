import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginUser, signInUser } from '../app/features/authSlice'; 
import { useRouter } from 'next/router';
import Navbar from '@/app/NavBar';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' , username:''});
  const [error, setError] = useState(null); 
  const dispatch = useDispatch();
  const router = useRouter()

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleClick=()=>{
    router.replace('/login')
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const resultAction = await dispatch(signInUser(form));

      if (signInUser.fulfilled.match(resultAction)) {
        setForm('')
         router.replace('/login')
      } else {
        console.log('Register failed', resultAction.payload);
        setError(resultAction.payload); 
      }
    } catch (err) {
      setError('An error occurred during register.'); 
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#f5f0dc]">
      <div className='top-0 fixed w-screen'>
        <Navbar/>
      </div>
      <div className="border border-gray-700 rounded shadow-md w-96">
        <div className="bg-[#fcebcf] border-b border-gray-700 px-3 py-1 flex items-center justify-between">
          <span className="text-xs text-gray-700 font-semibold">Signin</span>
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-400 rounded-full"></div>
            <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>

        <div className="bg-white px-6 py-8 text-center">
          <h2 className="text-xl font-bold text-gray-800 mb-6">Signin</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
          <div>
              <label className="block text-gray-700 text-sm mb-1">username</label>
              <input
                type="text"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded mb-6 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
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
                Register
              </button>
              <button
                type="button"
                className="w-full px-4 m-1 py-2 bg-[#aad4cc] text-white font-semibold rounded hover:bg-[#8bc2ba] text-sm transition duration-200"
                onClick={()=>handleClick()}
                >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
