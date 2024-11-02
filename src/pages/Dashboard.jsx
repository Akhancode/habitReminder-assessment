import React, { useEffect, useState } from 'react'

import CategoryPieChart from '../components/CategoryPieChart';
import api, { getHistories, getProgress } from '../api/api';
import LineChart from '../components/LineChart';
import { transformData } from '../utils/helper';
// import LineChart from '../components/LineChart';
// import  LineChart, { progressData } from '../components/LineChart';

// const habits = [
//   { id: 1, name: 'Morning Jog', streak: 5, rewardPoints: 10 },
//   { id: 2, name: 'Read a Book', streak: 3, rewardPoints: 5 },
//   { id: 3, name: 'Meditate', streak: 7, rewardPoints: 15 },
// ];
const Dashboard = () => {
  const [historiesData, setHistoriesData] = useState({})
  const getHistoriesData = async () => {
    const response = await getHistories()
    setHistoriesData(transformData(response))
  }
  useEffect(() => {
    getHistoriesData()
  }, [])



  const HealthData = historiesData.Health || []
  const WorkData = historiesData.Work || []
  const PersonalDevData = historiesData["Personal Development"] || []

  // const WorkData = [
  //   { date: '2024-10-01', count: 3 },
  //   { date: '2024-10-02', count: 5 },
  //   { date: '2024-10-03', count: 6 },
  // ];

  const uniqueDates = Array.from(new Set([
    ...HealthData?.map(entry => entry.date),
    ...WorkData?.map(entry => entry.date),
    ...PersonalDevData?.map(entry => entry.date),
  ])).sort();




  const healthDataCounts = uniqueDates.map(date => {
    const entry = HealthData.find(d => d.date === date);
    return entry ? entry.count : 0;
  });

  const workDataCount = uniqueDates.map(date => {
    const entry = WorkData.find(d => d.date === date);
    return entry ? entry.count : 0;
  });
  const PersonalDevDataCounts = uniqueDates.map(date => {
    const entry = PersonalDevData.find(d => d.date === date);
    return entry ? entry.count : 0;
  });

  const chartData = {
    labels: uniqueDates,
    datasets: [
      {
        label: 'Health',
        data: healthDataCounts,
        borderColor: 'rgba(75, 192, 192,0.5)',
        tension: 0.4,
      },
      {
        label: 'Work',
        data: workDataCount,
        borderColor: 'rgba(255, 99, 132,0.5)',
        tension: 0.4,
      },
      {
        label: 'Personal development',
        data: PersonalDevDataCounts,
        borderColor: 'rgba(55, 19, 32,0.5)',
        tension: 0.4,
      },
    ],
  };








  const [habitsData, setHabitsData] = useState([])
  const [categoryBreakdown, setCategoryBreakdown] = useState({})
  const getHabits = async () => {
    const response = await getProgress()
    setHabitsData(response?.habitProgress)
    setCategoryBreakdown(response?.categoryBreakdown)
  }
  useEffect(() => {
    getHabits()

  }, [])

  return (
    <div className='w-full bg-[#dbdada] flex flex-col '>
      <div className="container mx-auto p-6 flex flex-col gap-4">
        <h1 className="text-3xl font-bold mb-6 text-center">Your Habits Dashboard</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-3">
          {habitsData?.map((habit) => (
            <div key={habit.id} className="bg-white shadow-md rounded-lg p-4 flex flex-row justify-between">
              <div>
                <h2 className="text-xl font-semibold mb-2">{habit?.title}</h2>
                <p>{habit?.category}</p>
                <p>{habit?.frequency}</p>
              </div>

              <div className='self-end'>
                <p className="text-gray-700">🔥Streak: <span className="font-bold">{habit?.streak?.consecutiveDays || 0} days</span></p>
                <p className="text-gray-700">🪙Points: <span className="font-bold">{habit?.streak?.points || 0}</span></p>
              </div>
              {/* <button className="mt-auto bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200">
                View Details
              </button> */}
            </div>
          ))}

        </div>
        <CategoryPieChart categoryBreakdown={categoryBreakdown} />
        <LineChart chartData={chartData} />
      </div>
      {/* <LineChart data={progressData.habitProgress} /> */}
    </div>
  )
}

export default Dashboard