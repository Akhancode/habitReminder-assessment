import React from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Squares2X2Icon, PlusIcon, BookmarkIcon, ArrowLeftIcon ,PencilIcon} from '@heroicons/react/24/outline';


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

  let screenName = "Habits"
  //Home
  let LeftDiv = <div>
    <Squares2X2Icon strokeWidth={1.5} onClick={redirectToDashBoard} className="w-6 h-6 active:scale-75 text-gray-700" />
  </div>
  let RightDiv = <div className="flex items-center space-x-4">
    <PlusIcon strokeWidth={1.5} onClick={gotoAddPage} className="w-7 h-7 active:scale-75 text-gray-700" />
    <BookmarkIcon strokeWidth={1.5} className="w-7 h-7 text-gray-700" />
  </div>

  //habit - create/edit
  if (currentPath.startsWith('/habit')) {
    screenName = "Create Habit"
    LeftDiv = <ArrowLeftIcon strokeWidth={2} onClick={redirectToHome} className="w-6 h-6 active:scale-75 text-gray-700" />
    RightDiv = <div className="flex items-center space-x-4">
      <PlusIcon strokeWidth={1.5} onClick={gotoAddPage} className="w-7 h-7 active:scale-75 text-gray-700" />
      <BookmarkIcon strokeWidth={1.5} className="w-7 h-7 text-gray-700" />
    </div>
  }
  if (currentPath.startsWith('/habit/')) {
    //edit
    screenName = "Edit Habit"
  }
  if (currentPath.startsWith('/dashboard')) {
    screenName = "Dashboard"

    LeftDiv = <div>
      <ArrowLeftIcon strokeWidth={2} onClick={redirectToHome} className="w-6 h-6 active:scale-75 text-gray-700" />
    </div>
    RightDiv = <div className='cursor-pointer  flex items-center justify-end gap-3'>
    </div>
  }
  if (currentPath.startsWith('/progress')) {
    screenName = "Progress Details"
    LeftDiv = <div>
      <ArrowLeftIcon onClick={redirectToHome} strokeWidth={2} className="w-6 h-6 active:scale-75 text-gray-700" /> </div>
    RightDiv = <PencilIcon onClick={() => (redirectToEdit(habitId))}  strokeWidth={1.5} className='w-6 h-6   flex cursor-pointer  items-center justify-end gap-3' />
  }
  return (
    // <div className=' cursor-pointer bg-[#424242] min-h-20 max-h-28 flex justify-between items-center px-6'>
    //   {LeftDiv}
    //   {RightDiv}
    // </div>
    <nav className=" w-full flex items-center justify-between px-4 py-5 border-b  min-h-20 max-h-28 bg-white">
      {/* Left Icon */}
      {LeftDiv}

      {/* Title */}
      <h1 className="text-2xl font-normal capitalize ">{screenName}</h1>

      {/* Right Icons */}
      {RightDiv}
    </nav>
  )
}

export default Navbar