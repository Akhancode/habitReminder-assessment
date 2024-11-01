import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const gotoAddPage = () => {
    navigate('/habit')
  }
  const saveHabit = () => {
  }
  const redirectToDashboard = () => {
    navigate('/')

  }
  const location = useLocation();

  const currentPath = location.pathname;
  let RightDiv = <div className='flex items-center justify-end'>
    <button onClick={gotoAddPage} className='flex items-center hover:text-gray-400 active:text-gray-700 cursor-pointer justify-center  font-semibold text-4xl text-white'>+</button>
  </div> 

  if (currentPath.startsWith('/habit')){
    RightDiv =  <div className='flex items-center justify-end'>
    <button onClick={redirectToDashboard} className='flex items-center hover:text-gray-400 hover:border-gray-400 active:text-gray-700 cursor-pointer justify-center  font-semibold text-2xl text-white border rounded-md px-5 py-2 '>cancel</button>
  </div>
  }
    return (
      <div className=' bg-[#424242] min-h-20 max-h-28 flex justify-between items-center px-6'>
        <div>
          <h3 className='font-semibold text-2xl text-white'>Habits</h3>
        </div>
       {RightDiv}
      </div>
    )
}

export default Navbar