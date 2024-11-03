// src/pages/HabitPage.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HabitForm from '../components/HabitForm';
import Navbar from '../components/Layout/Navbar';
import { createHabit, getHabitById, getProgressByHabit, updateHabit } from '../api/api';
import HabitDetail from '../components/HabitDetail';

const ProgressPage = () => {
  const { habitId } = useParams(); // Get habit ID from URL if in edit mode
  const [progressData, setProgressData] = useState({});
  const getProgressData = async () => {
    const response = await getProgressByHabit(habitId);
    console.log(response)
    setProgressData(response);
  } // Dependencies include habitId to re-run if it changes

  useEffect(() => {
    getProgressData();
  }, []);


  return (
    <div className='flex flex-col flex-grow text-black bg-red-50 min-h-screen' >

      <Navbar />
      <HabitDetail habitData={progressData} />
 
    </div>
  );
};

export default ProgressPage;
