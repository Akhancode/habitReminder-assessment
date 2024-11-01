import React from 'react'
import { useNavigate } from 'react-router-dom';
import signUpImage from '../assets/images/signup.jpg'
const Register = () => {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate('/login'); 
  };
  return (
    <section className="h-screen flex flex-col md:flex-row justify-center space-y-10 md:space-y-0 md:space-x-16 items-center my-2 mx-5 md:mx-0 md:my-0">
      <div className="md:w-1/3 max-w-sm">
        <img
          src={signUpImage}
          alt="Sample image" />
      </div>
      <div className="md:w-1/3 max-w-sm">

        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded" type="text" placeholder="Email Address" />
        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="text" placeholder="Name" />
        <input className="text-sm w-full px-4 py-2 border border-solid border-gray-300 rounded mt-4" type="password" placeholder="Password" />
        <div className="mt-4 flex justify-between font-semibold text-sm">
       
          {/* <a className="text-blue-600 hover:text-blue-700 hover:underline hover:underline-offset-4" href="#">Forgot Password?</a> */}
        </div>
        <div className="text-center md:text-left">
          <button className="mt-4 bg-[#db84d5] hover:bg-pink-600 px-4 py-2 text-white uppercase rounded text-xs tracking-wider" type="submit">Register</button>
        </div>
        <div className="mt-4 font-semibold text-sm text-slate-500 text-center md:text-left">
          Already have an account? <a onClick={handleLoginClick} className="text-red-600 hover:underline hover:underline-offset-4" href="#">Login</a>
        </div>
      </div>
    </section>
  );
}

export default Register