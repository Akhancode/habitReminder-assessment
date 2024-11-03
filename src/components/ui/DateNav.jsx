import React, { useMemo } from 'react'
import clickSound from '../../assets/sounds/sound.mp3';
const DateNav = ({ viewType = "today", setViewType }) => {
  const audio = useMemo(() => new Audio(clickSound), []);
  const playSound = () => {
    audio.currentTime = 0.12 
    audio.volume = 0.2;
    audio.play();
  };
  const onClickNav = (value) => {
    playSound()
    setViewType(value)
  }
  return (
    <div className='w-full bg-white py-5 h-fit  border-gray-100 border-b-[1px] flex font-sans  px-6 text-2xl text-gray-400 gap-3 '>
      <p onClick={() => {
        onClickNav("today")
      }} className={`cursor-pointer select-none transition-colors duration-500  ${viewType === 'today' ? 'text-black' : 'text-gray-300'}`}>Today</p>
      <p onClick={()=> {onClickNav("weekly")}} className={`cursor-pointer select-none transition-colors duration-500  ${viewType === 'weekly' ? 'text-black' : 'text-gray-300'}`}>Weekly</p>
    </div>
  )
}

export default DateNav