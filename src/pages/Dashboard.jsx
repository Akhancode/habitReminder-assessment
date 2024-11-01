import React, { useEffect, useState } from 'react'

import CategoryPieChart from '../components/CategoryPieChart';
import api, { getProgress } from '../api/api';
// import  LineChart, { progressData } from '../components/LineChart';

const habits = [
  { id: 1, name: 'Morning Jog', streak: 5, rewardPoints: 10 },
  { id: 2, name: 'Read a Book', streak: 3, rewardPoints: 5 },
  { id: 3, name: 'Meditate', streak: 7, rewardPoints: 15 },
];
const Dashboard = () => {

  const [habitsData, setHabitsData] = useState([])
  const [categoryBreakdown, setCategoryBreakdown] = useState({})
  const getHabits = async () => {
    const response = await getProgress()
    console.log(response)
    setHabitsData(response.habitProgress)
    setCategoryBreakdown(response.categoryBreakdown)
  }
  useEffect(() => {
    getHabits()

  }, [])

  return (
    <div className='w-full bg-[#dbdada] flex flex-col '>
      <div className="container mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Habits Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
          {habitsData.map((habit) => (
            <div key={habit.id} className="bg-white shadow-md rounded-lg p-4 flex flex-row justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{habit.title}</h2>
                <p>{habit.category}</p>
                <p>{habit.frequency}</p>
              </div>

              <div className='self-end'>
                <p className="text-gray-700">🔥Streak: <span className="font-bold">{habit?.streak?.consecutiveDays||0} days</span></p>
                <p className="text-gray-700">🪙Points: <span className="font-bold">{habit?.streak?.points||0}</span></p>
              </div>
              {/* <button className="mt-auto bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
                View Details
              </button> */}
            </div>
          ))}

        </div>
        <CategoryPieChart categoryBreakdown={categoryBreakdown} />

      </div>
      {/* <LineChart data={progressData.habitProgress} /> */}
    </div>
  )
}

export default Dashboard