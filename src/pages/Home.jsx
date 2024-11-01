import React, { useEffect, useState } from 'react'
import api, { completeById } from '../api/api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';

const Home = () => {
  const [habitsData, setHabitsData] = useState([])
  const getHabits = async () => {
    const response = await api.get('/habit');
    setHabitsData(response.data)
  }
  const navigate = useNavigate()
  const gotoEdit = async (habitId) => {
    navigate(`/habit/${habitId}`)
  }

  const handleComplete = async (habitId) => {
    completeById(habitId).then(() => {
      getHabits()
    })
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
              let isDone = (habit?.streak?.lastCompletedDate && moment(habit?.streak?.lastCompletedDate).isSame(moment(), 'day')) ? true : false
              let isToday = true
              if (!habit?.streak?.lastCompletedDate || habit.frequency == "daily") {
                isToday = moment().isSame(moment(habit?.streak?.lastCompletedDate).add(1, 'day'), 'day');
              }
              if (!habit?.streak?.lastCompletedDate || habit.frequency == "weekly") {
                isToday = moment().isSame(moment(habit?.streak?.lastCompletedDate).add(1, 'week'), 'day');
              }


              return (
                <div style={{ color: textColor }} className='bg-white hover:bg-slate-100 active:bg-gray-300 py-4 font-semibold flex justify-between text-green-500 shadow-sm'>
                  <div className='flex-initial  w-[40%] flex justify-center items-center'>{habit.title}</div>
                  <div className='flex-1 flex gap-2 '>
                    {
                      (isDone ?
                        <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded" disabled>
                          Done
                        </button>
                        :
                        isToday&&<button onClick={() => { handleComplete(habit._id) }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                          Mark done
                        </button>
                      )

                    }
                    {
                      (!isToday&&!isDone) && <button class="bg-slate-200 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 border border-green-700 rounded" disabled>
                        Not Today
                      </button>
                    }
                    <button onClick={() => { gotoEdit(habit._id) }} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded">
                      edit
                    </button>
                  </div>
                </div>
              )
            })
          }

        </div>
      </div>
      : <div className='flex items-center justify-center text-2xl flex-grow text-gray-300 bg-[#efefef] min-h-full'>
        No Habits found
      </div>
  )
}

export default Home