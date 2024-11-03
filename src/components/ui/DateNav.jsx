import React from 'react'

const DateNav = ({viewType="today",setViewType}) => {
    
  return (
    <div className='w-full bg-white py-5 border-gray-100 border-b-[1px] flex font-sans  px-6 text-2xl text-gray-400 gap-3 '>
        <p onClick={()=>{setViewType("today")}}  className={`cursor-pointer select-none transition-colors duration-500  ${viewType === 'today' ? 'text-black' : 'text-gray-300'}`}>Today</p>
        <p onClick={()=>{setViewType("weekly")}} className={`cursor-pointer select-none transition-colors duration-500  ${viewType === 'weekly' ? 'text-black' : 'text-gray-300'}`}>Weekly</p>
    </div>
  )
}

export default DateNav