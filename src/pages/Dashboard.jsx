import React, { useEffect, useState } from 'react'
import api from '../api/api';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [habitsData, setHabitsData] = useState([])
  const getHabits = async () => {
    const response = await api.get('/habit');
    setHabitsData(response.data)
  }
  const navigate = useNavigate()
  const gotoEdit = async (habitId) => {
    navigate(`/habit/${habitId}`)
  }
  useEffect(() => {
    getHabits()

  }, [])


  return (
    habitsData.length ?
    <div className='flex flex-col flex-grow text-black bg-[#efefef] min-h-full' >
      <div className='bg-[#efefef] py-5 flex justify-between text-gray-500'>
        <div className='flex-initial  w-[40%]'></div>
        <div className='flex-1  '>
          Today
        </div>
      </div>
      <div className='flex  flex-col gap-1'>
        {
          habitsData.map((habit) => {
            "Health", "Work", "Personal Development"
            let textColor = 'green'
            if (habit.category == "Work") {
              textColor = "blue"
            }
            if (habit.category == "Personal Development") {
              textColor = "orange"
            }
            return (
              <div style={{color:textColor}} className='bg-white hover:bg-slate-100 active:bg-gray-300 py-4 font-semibold flex justify-between text-green-500 shadow-sm'>
                <div className='flex-initial  w-[40%] flex justify-center items-center'>{habit.title}</div>
                <div className='flex-1 flex gap-2 '>
                  <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                    Undone
                  </button>
                  <button onClick={()=>{gotoEdit(habit._id)}} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded">
                    edit
                  </button>
                </div>
              </div>
            )
          })
        }

      </div>
    </div>
    :<div className='flex items-center justify-center text-2xl flex-grow text-gray-300 bg-[#efefef] min-h-full'>
      No Habits found
    </div>
  )
}

export default Dashboard