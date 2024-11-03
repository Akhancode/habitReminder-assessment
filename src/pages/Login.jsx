import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenContext } from '../context/TokenContext';

function Login() {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    navigate('/register');
  };



  const { loginUser } = useContext(TokenContext);
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleCheckboxChange = (e) => {
    setRememberMe(e.target.checked);
  };

  const handleSubmit = async (e) => {
    try {

      e.preventDefault();
      await loginUser(formData);
      navigate('/');
    } catch (error) {
      console.log(error.response.data.msg || error.message)
      setError(error.response.data.msg || error.message)
    }



    // Add success handling (e.g., redirect, message)
  };
  return (
    <section className="h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl md:text-5xl font-bold text-gray-700 text-center mt-5 mb-10">
        Habit Tracker
      </h1>
      <div className="md:w-1/3 max-w-sm">
        <img
          src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
          alt="Sample image" />
      </div>
      <div className="md:w-1/3 max-w-sm">

        <form onSubmit={handleSubmit} className="">
          <h2 className="text-lg font-semibold mb-4">Login</h2>
          {error && <p className="text-red-500">{error}</p>} {/* Display error message */}
          <input
            name='email'
            value={formData.email}
            onChange={handleChange}
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded"
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4"
            type="password"
            placeholder="Password"
            required
          />
          <div className="mt-4 flex justify-between font-semibold text-sm">
            <label className="flex text-slate-500 hover:text-slate-600 cursor-pointer">
              <input
                className="mr-1"
                type="checkbox"
                checked={rememberMe}
                onChange={handleCheckboxChange}
              />
              <span>Remember Me</span>
            </label>
            {/* Uncomment if you want to add a "Forgot Password?" link */}
            {/* <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a> */}
          </div>
          <div className="text-center md:text-left">
            <button
              className="mt-4 bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white uppercase rounded text-xs tracking-wider"
              type="submit"
            >
              Login
            </button>
          </div>
        </form>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Don't have an account? <a onClick={handleRegisterClick} className="text-red-600 hover:underline hover:underline-offset-4" href="#">Register</a>
        </div>
      </div>
    </section>
  );
}

export default Login;