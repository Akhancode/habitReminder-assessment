import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import signUpImage from '../assets/images/signup.jpg'
import { TokenContext } from '../context/TokenContext';
const Register = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };



  const { registerUser } = useContext(TokenContext);
  const [formData, setFormData] = useState({ email: '', password: '',userName:'' });
  const [error, setError] = useState('');
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    await registerUser(formData);
    navigate('/');
    // Add success handling (e.g., redirect, message)
  };
  return (
    <section className="h-screen flex flex-col items-center justify-center">
  {/* Centered app name heading */}
  <h1 className="text-3xl md:text-5xl font-bold text-gray-700 text-center mt-5 mb-10">
    Habit Tracker
  </h1>

  <div className="flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center mx-5 md:mx-0 md:my-0">
    
    <div className="md:w-1/3 max-w-sm">
      <img src={signUpImage} alt="Sample image" />
    </div>

    <div className="md:w-1/3 max-w-sm">
      <form onSubmit={handleSubmit} className="">
        <h2 className="text-lg font-semibold mb-4">Register</h2>
        {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
        
        <input
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="text-sm w-full px-4 py-2 border border-gray-300 rounded"
          type="email"
          placeholder="Email Address"
          required
        />
        
        <input
          name="userName"
          value={formData.userName}
          onChange={handleChange}
          className="text-sm w-full px-4 py-2 border border-gray-300 rounded mt-4"
          type="text"
          placeholder="User Name"
          required
        />
        
        <input
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="text-sm w-full px-4 py-2 border border-gray-300 rounded mt-4"
          type="password"
          placeholder="Password"
          required
        />
        
        <div className="text-center md:text-left mt-4">
          <button
            className="bg-pink-500 hover:bg-pink-300 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
            type="submit"
          >
            Register
          </button>
        </div>
      </form>
      
      <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
        Already have an account? 
        <a onClick={handleLoginClick} className="text-red-600 hover:underline hover:underline-offset-4" href="#">
          Login
        </a>
      </div>
    </div>
  </div>
</section>

  );
}

export default Register