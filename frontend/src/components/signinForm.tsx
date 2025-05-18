import type {ChangeEvent, FormEvent} from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signIn } from '../redux/authSlice';
import { useNavigate } from 'react-router-dom';
import type { RootState, AppDispatch } from '../redux/store'; 

interface FormData {
  email: string;
  password: string;
}

export default function SignInForm() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(signIn(formData)).then((action: any) => {
      if (action.type === 'auth/signIn/fulfilled') {
        navigate('/dashboard');
      } else {
        console.error('Sign-in failed:', action.payload);
      }
    });
  };

  return (
    <div className="max-w-md mx-auto bg-amber-50 shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Sign In</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2" htmlFor="password">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg p-2"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-purple-500 text-white font-medium py-2 px-4 rounded-lg hover:bg-purple-600"
          disabled={loading}
        >
          {loading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>
    </div>
  );
}