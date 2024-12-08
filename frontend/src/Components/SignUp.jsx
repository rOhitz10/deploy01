import React, { useState } from 'react';
import Logo from '../assets/Logo.png';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';

function SignUp() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sponsorId: '',
    epin: '',
    password: '',
    name: '',
    email: '',
    number: '',
    acceptTerms: false,
  });
  
  const [error, setError] = useState(''); // State to handle error messages
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("/api/v1/create-chain", formData)
      .then((res) => {
        if (res.status === 201) {
          alert("You are registered");
          navigate('/signin');
        }
      })
      .catch((err) => {
        console.error(err);
        // Set the error message to state
        const errorMessage = err.response?.data?.msg || 'Registration failed. Please try again.';
        setError(errorMessage);
      });
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-purple-600 to-blue-500 p-4 sm:p-8">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-lg transition-transform transform ">
        <div className="text-center">
          <img src={Logo} alt="Logo" className="w-36 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800">Create Your Account</h2>
          <p className="text-gray-600 mt-1">
            Already have an account?{' '}
            <Link to="/signin" className="text-indigo-600 hover:underline">
              Sign in here
            </Link>
          </p>
        </div>

        {/* Display error message */}
        {error && (
          <div className="text-red-500 bg-red-100 border border-red-400 text-center rounded-lg p-2 mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="sponsorId" className="block text-sm font-medium text-gray-700">
              Sponsor ID
            </label>
            <input
              type="text"
              name="sponsorId"
              id="sponsorId"
              placeholder="eg. P2PF123456"
              value={formData.sponsorId}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="epin" className="block text-sm font-medium text-gray-700">
              Epin
            </label>
            <input
              type="text"
              name="epin"
              id="epin"
              value={formData.epin}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type={passwordVisible ? 'text' : 'password'} 
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
             <div
              onClick={() => setPasswordVisible(!passwordVisible)} // Toggle visibility
              className="absolute right-12 top-[49%]  transform -translate-y-1/2 cursor-pointer text-gray-500"
            >
              {passwordVisible ? <AiOutlineEyeInvisible size={24} /> : <AiOutlineEye size={24} />}
            </div>
          </div>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div>
            <label htmlFor="number" className="block text-sm font-medium text-gray-700">
              Mobile No.
            </label>
            <input
              type="tel"
              name="number"
              id="number"
              value={formData.number}
              onChange={handleChange}
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="acceptTerms"
              id="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring focus:ring-indigo-500"
            />
            <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600">
              I accept the{' '}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
            type="submit"
            disabled={!formData.acceptTerms}
            className="w-full py-2 mt-4 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition"
          >
            Sign up
          </button>
        </form>
        
        <p className="mt-4 text-center text-sm text-gray-600">
          or
          <Link to="/">
            <span className="text-indigo-600 hover:underline ml-1">
              Go back to website
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignUp;
