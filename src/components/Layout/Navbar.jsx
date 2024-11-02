import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'

const Navbar = () => {
  const navigate = useNavigate()
  const gotoAddPage = () => {
    navigate('/habit')
  }
  const saveHabit = () => {
  }
  const redirectToHome = () => {
    navigate('/')

  }
  const redirectToDashBoard = () => {
    navigate('/dashboard')

  }
  const { habitId } = useParams();;
  const redirectToEdit = (habitId) => {
    navigate(`/habit/${habitId}`)

  }
  const location = useLocation()

  const currentPath = location.pathname;
  let LeftDiv = <div>
    <h3 onClick={redirectToHome} className=' cursor-pointer font-semibold text-2xl text-white'>Habits</h3>
  </div>
  let RightDiv = <div className='cursor-pointer flex items-center justify-end gap-3'>
    <button onClick={gotoAddPage} className='flex  items-center hover:text-gray-400 active:text-gray-700 cursor-pointer justify-center  font-semibold text-4xl text-white'>+</button>
    <button onClick={redirectToDashBoard} className=' flex items-center hover:text-gray-400 active:text-gray-700 cursor-pointer justify-center  font-semibold text-4xl text-white'>📈</button>
  </div>

  if (currentPath.startsWith('/habit')) {
    RightDiv = <div className='flex cursor-pointer  items-center justify-end'>
      <button onClick={redirectToHome} className='flex items-center hover:text-gray-400 hover:border-gray-400 active:text-gray-700 cursor-pointer justify-center  font-semibold text-xl text-white border rounded-md px-4 py-1 '>cancel</button>
    </div>
  }
  if (currentPath.startsWith('/dashboard')) {
    LeftDiv = <div>
      <h3 onClick={redirectToHome} className='cursor-pointer  font-semibold text-2xl text-white'>🔙</h3>
    </div>
    RightDiv = <div className='cursor-pointer  flex items-center justify-end gap-3'>
    </div>
  }
  if (currentPath.startsWith('/progress')) {

    LeftDiv = <div>
      <h3 onClick={redirectToHome} className='cursor-pointer  font-semibold text-2xl text-white'>🔙</h3>
    </div>
    RightDiv = <div onClick={() => (redirectToEdit(habitId))} className='flex cursor-pointer  items-center justify-end gap-3'>✏️
    </div>
  }
  return (
    <div className=' cursor-pointer bg-[#424242] min-h-20 max-h-28 flex justify-between items-center px-6'>
      {LeftDiv}
      {RightDiv}
    </div>
  )
}

export default Navbar