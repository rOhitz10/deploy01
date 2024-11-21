import React, { useState } from 'react'
import Logo from '../assets/Logo.png'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function SignUp() {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    sponsorId: '',
    epin: '',
    password: '',
    // confirmPassword: '',
    name: '',
    email: '',
    number: '',
    acceptTerms: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post("http://localhost:3000/api/v1/create-chain",formData)
    
    .then((res)=>{
      alert("you are registered")
      if (res.status === 201) {
        
        navigate('/signin')
        
      }
    })
    .catch((err)=>console.error(err))
    
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg">
        <div className="text-center">
          <img
            src={Logo} 
            alt="Logo"
            className="w-52 mx-auto "
          />
          <h2 className="text-2xl font-bold">Create Your Account</h2>
          <p className="text-sm text-gray-500">
            Don't have an account yet?{' '}
            <Link to="/signin" className="text-blue-600 hover:underline">
              <h1>
                Sign in here
                </h1>
            </Link>
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="sponsorId" className="block text-sm font-medium text-gray-700">
              Sponsor Id
            </label>
            <input
              type="text"
              name="sponsorId"
              id="sponsorId"
              placeholder="eg. P2PF123456"
              value={formData.sponsorId}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
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
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
            />
          </div>
          {/* <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
              Password Confirmation
            </label>
            <input
              type="password"
              name="confirmPassword"
              id="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
            />
          </div> */}
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
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
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
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
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
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="acceptTerms"
              id="acceptTerms"
              checked={formData.acceptTerms}
              onChange={handleChange}
              className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-500"
            />
            <label htmlFor="acceptTerms" className="ml-2 text-sm text-gray-600">
              I accept the{' '}
              <a href="/terms" className="text-blue-600 hover:underline">
                Terms and Conditions
              </a>
            </label>
          </div>
          <button
           disabled={!formData.acceptTerms}
            type="submit"
            className="w-full py-2 mt-4 font-semibold text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Sign up
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          or
         <Link to='/'>
          <div className="text-blue-600 hover:underline">
            Go back to website
          </div>
         </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp
