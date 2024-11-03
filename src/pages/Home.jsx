import React, { useEffect, useState } from 'react'
import api, { completeById, completeByIdWIthCustomDate } from '../api/api';
import { useNavigate } from 'react-router-dom';
import moment from 'moment';
import { getISODateForDay, getTodayTime, getWeekData, } from '../utils/helper';
import { Squares2X2Icon, PlusIcon, BookmarkIcon } from '@heroicons/react/24/outline';
import Card from '../components/ui/Card';
import DateNav from '../components/ui/DateNav';
import HabitTracker from '../components/ui/WeeklyCard';

const Home = () => {
  const [habitsData, setHabitsData] = useState([])
  const [habitsDoneData, setHabitsDoneData] = useState([])
  const [habitsUpcomingData, setHabitsUpcomingData] = useState([])
  const getHabits = async () => {
    const response = await api.get('/habit');
    const habitWithThisWeekHistory = response?.data?.map((habit)=>{
      const thisWeekHistories = getWeekData(habit.histories)
      return {...habit,histories:thisWeekHistories}
    })
    setHabitsData(habitWithThisWeekHistory)
    let todayHabitData = response?.data?.filter((habit) => {
      let isToday = true
      //is it new - one 
      if (!habit?.streak?.lastCompletedDate) {
        isToday = true
      }
      else if (!habit?.streak?.lastCompletedDate || habit.frequency == "daily") {
        isToday = moment().isSame(moment(habit?.streak?.lastCompletedDate).add(1, 'day'), 'day');
      }
      else if (!habit?.streak?.lastCompletedDate || habit.frequency == "weekly") {
        isToday = moment().isSame(moment(habit?.streak?.lastCompletedDate).add(1, 'week'), 'day');
      }

      return isToday
    }).sort((a, b) => {
      // Handle cases where reminder is not provided
      const reminderA = a.reminder || ''; // Default to empty string if no reminder
      const reminderB = b.reminder || '';

      console.log("a.reminder", a.reminder)
      // If either reminder is missing, prioritize that entry
      if (!reminderA && !reminderB) return 0;
      if (!reminderA) return -1;
      if (!reminderB) return 1;

      const [hoursA, minutesA] = reminderA?.split(':').map(Number);
      const [hoursB, minutesB] = reminderB?.split(':').map(Number);
      const totalMinutesA = hoursA * 60 + minutesA;
      const totalMinutesB = hoursB * 60 + minutesB;

      return totalMinutesA - totalMinutesB;
    });


    let doneHabitData = response?.data?.filter((habit) => {
      let isToday = false
      //is it new - one 
      if (habit?.streak?.lastCompletedDate) {
        isToday = moment().isSame(moment(habit?.streak?.lastCompletedDate), 'day');
      }
      return isToday
    })
    setHabitsDoneData(doneHabitData)
    setHabitsUpcomingData(todayHabitData)

    // setHabitsData(todayHabitData)
  }
  const navigate = useNavigate()
  const gotoEdit = async (habitId) => {
    navigate(`/habit/${habitId}`)
  }

  const handleComplete = async (habitId) => {
    console.log("clicked complete ", habitId)
    completeById(habitId).then(() => {
      getHabits()
    })
  }
  const markCustomDay = async (habitId , DDD) => {
    completeByIdWIthCustomDate(habitId, getISODateForDay(DDD)).then(() => {
        getHabits()
      })
}

  useEffect(() => {
    getHabits()
  }, [])

  const redirectToProgress = (habitId) => {
    navigate(`/progress/${habitId}`)
  }

  const [viewType, setViewType] = useState("today")
  return (

    (habitsUpcomingData.length || habitsDoneData.length) ?
      <div className='flex flex-col flex-grow text-black bg-white min-h-full' >
        <DateNav viewType={viewType} setViewType={setViewType} />
        {viewType == "today" && <div>

          {/* upcoming today */}
          <div>

            <div className='flex px-5 mt-5  flex-col gap-2'>
              {
                habitsUpcomingData.map((habit) => {
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
                    <Card habit={habit} handleComplete={handleComplete} />
                  )
                  // return (
                  //   <div onClick={(e)=>{
                  //     e.stopPropagation();
                  //     redirectToProgress(habit._id)
                  //   }} style={{ color: textColor }} className='bg-white hover:bg-slate-100 active:bg-gray-300 py-4 font-semibold flex justify-between text-green-500 shadow-sm'>
                  //     <div className='flex-initial  w-[60%] flex justify-center items-center'>{habit.title}   <p className='px-3 text-gray-400 font-thin text-sm'>{habit?.reminder}</p></div>
                  //     <div className='flex-1 flex gap-2 '>
                  //       {
                  //         (isDone ?
                  //           <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded" disabled>
                  //             Done
                  //           </button>
                  //           :
                  //           <button onClick={(e) => {
                  //             e.stopPropagation();
                  //             handleComplete(habit._id)
                  //           }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                  //             Mark done
                  //           </button>
                  //         )

                  //       }
                  //       {/* {
                  //       (!isToday&&!isDone) && <button class="bg-slate-200 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 border border-green-700 rounded" disabled>
                  //         Not Today
                  //       </button>
                  //     } */}
                  //       <button onClick={() => { gotoEdit(habit._id) }} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded">
                  //         edit
                  //       </button>
                  //     </div>
                  //   </div>
                  // )
                })
              }

            </div>
          </div>

          {/* completed */}
          <div className='flex px-5 my-8  flex-col gap-2 '>

            {
              habitsDoneData.map((habit) => {
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
                  <Card habit={habit} completed={true} />
                )
                // return (
                //   <div onClick={(e)=>{
                //     e.stopPropagation();
                //     redirectToProgress(habit._id)
                //   }} style={{ color: textColor }} className='bg-white hover:bg-slate-100 active:bg-gray-300 py-4 font-semibold flex justify-between text-green-500 shadow-sm'>
                //     <div className='flex-initial  w-[60%] flex justify-center items-center'>{habit.title}</div>
                //     <div className='flex-1 flex gap-2 '>
                //       {
                //         (isDone ?
                //           <button class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 border border-green-700 rounded" disabled>
                //             Done
                //           </button>
                //           :
                //           <button onClick={() => { handleComplete(habit._id) }} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded">
                //             Mark done
                //           </button>
                //         )

                //       }
                //       {/* {
                //         (!isToday&&!isDone) && <button class="bg-slate-200 hover:bg-gray-100 text-gray-700 font-bold py-2 px-4 border border-green-700 rounded" disabled>
                //           Not Today
                //         </button>
                //       } */}
                //       <button onClick={() => { gotoEdit(habit._id) }} class="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 border border-gray-700 rounded">
                //         edit
                //       </button>
                //     </div>
                //   </div>
                // )
              })
            }

          </div>
        </div>
        }
        {
          viewType == "weekly" && habitsData.map((habit) => {
            return <HabitTracker habit={habit} markCustomDay={markCustomDay} />
          })
        }


      </div>
      : <div className='flex items-center justify-center text-2xl flex-grow text-gray-300 bg-[#efefef] min-h-full'>
        No Habits found
      </div>


  )
}

export default Home