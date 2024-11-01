// src/pages/HabitPage.jsx
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import HabitForm from '../components/HabitForm';
import Navbar from '../components/Layout/Navbar';
import { createHabit, getHabitById, updateHabit } from '../api/api';

const HabitPage = () => {
  const { habitId } = useParams(); // Get habit ID from URL if in edit mode
  const navigate = useNavigate();
  const [initialData, setInitialData] = useState(null);

  const isEditMode = Boolean(habitId);
  
  useEffect(() => {
    if (isEditMode) {
      // Fetch the existing habit data (Mocked fetch)
      const fetchHabitData = async (id) => {
        // Simulate API fetch for existing habit (Replace with actual API call)
        const data = await getHabitById(id)
        setInitialData(data);
      };
      fetchHabitData(habitId);
    }
  }, [habitId]);



  const handleFormSubmit = async (habitData) => {
    if (isEditMode) {
      updateHabit(habitData)
      // Mock update API call here
    } else {
      // Call API to create new habit
      createHabit(habitData)
      // Mock create API call here
    }
    // Redirect to the dashboard or habit list page
    navigate('/');
  };

  return (
    <div className='flex flex-col flex-grow text-black bg-[#efefef] min-h-full' >

      <Navbar />
      <HabitForm
        initialData={initialData}
        onSubmit={handleFormSubmit}
        mode={isEditMode ? 'edit' : 'create'}
      />
    </div>
  );
};

export default HabitPage;
