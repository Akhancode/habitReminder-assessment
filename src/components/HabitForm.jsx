// src/components/HabitForm.jsx
import React, { useState, useEffect } from 'react';
import TimePicker from 'react-time-picker';
import 'react-time-picker/dist/TimePicker.css';
import 'react-clock/dist/Clock.css';
import ToggleButton from './ui/toggleButton';
const HabitForm = ({ initialData = {}, onSubmit, mode }) => {
    const [habit, setHabit] = useState({
        title: '',
        category: '',
        frequency: '',
        reminder: "00:00",
        ...initialData, // Pre-fill fields if data is provided (edit mode)
    });
    useEffect(() => {
        setHabit({ ...initialData })
    }, [initialData])

    // Update form fields as user types
    const handleChange = (e) => {
        const { name, value } = e.target;
        setHabit((prev) => ({ ...prev, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(habit);
    };









    if(!habit.reminder){
        habit.reminder = "00:00"
    }
    const [hours, setHours] = useState(habit.reminder.split(":")[0]);
    const [minutes, setMinutes] = useState(habit.reminder.split(":")[1]);

    const handleReminderChange = (e) => {
        const { name, value } = e.target;

        // Update the corresponding part (hours or minutes) in the reminder time
        let hours = null
        let minutes = null
        if (habit.reminder) {
            [hours, minutes] = habit.reminder.split(':');
        }
        if (name === 'hours') hours = value.padStart(2, '0'); // Ensure 2-digit format
        if (name === 'minutes') minutes = value.padStart(2, '0');
        let reminder = undefined

        reminder = `${hours}:${minutes}`
        // Update habit.reminder in HH:mm format
        setHabit((prevHabit) => ({
            ...prevHabit,
            reminder

        }));
    };









    const handleReminderChange_v2 = (e) => {
        const { name, value } = e.target;

        // Update hours or minutes based on the input field
        if (name === "hours") {
            setHours(value);
            setHabit((prevHabit) => ({
                ...prevHabit,
                reminder: `${value.padStart(2, "0")}:${minutes.padStart(2, "0")}`,
            }));
        } else if (name === "minutes") {
            setMinutes(value);
            setHabit((prevHabit) => ({
                ...prevHabit,
                reminder: `${hours.padStart(2, "0")}:${value.padStart(2, "0")}`,
            }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className=" p-6 rounded space-y-4">
            <h2 className="w-full bg-white py-5 border-gray-100  flex font-sans  text-5xl text-gray-600  ">{mode === 'edit' ? 'Update ' : 'Create '} <p className='ml-1 text-black'> Habit</p> </h2>
            <div className={`bg-[#edeef2] opacity-85 rounded-3xl p-6 text-start capitalize py-8 flex justify-between pr-7 `}>
                <input
                    type="text"
                    name="title"
                    value={habit.title}
                    onChange={handleChange}
                    class="border-0 text-2xl bg-transparent p-0 outline-none cursor-text "
                    placeholder="Habit Name"
                    required
                />
            </div>
            <div className={`bg-[#edeef2] opacity-85 rounded-3xl p-6 text-start capitalize py-8 flex justify-between pr-7 `}>
                <label className="text-gray-900 text-2xl">Category</label>
                <select
                    name="category"
                    value={habit.category}
                    onChange={handleChange}
                    className="border-2  "
                    required
                >
                    <option value="" disabled>Select Category</option>
                    <option value="Health">Health</option>
                    <option value="Work">Work</option>
                    <option value="Personal Development">Personal Development</option>
                </select>
            </div>
            <div className={`bg-[#edeef2] opacity-85 rounded-3xl p-6 text-start capitalize py-8 flex justify-between pr-7 `}>
                <label className="text-gray-900 text-2xl">Frequency</label>
                <select
                    name="frequency"
                    value={habit.frequency}
                    onChange={handleChange}
                    className="border rounded py-2 px-3"
                    required
                >
                    <option value="" disabled>Select frequency</option>
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                </select>

            </div>
            <div className={`bg-[#edeef2] opacity-85 rounded-3xl p-6 text-start capitalize py-8 flex justify-between pr-7 `}>
                <label className="text-gray-900 text-2xl">Reminder</label>
                <div className='flex gap-2'>
                    <input
                        type="number"
                        name="hours"
                        value={habit.reminder?.split(":")[0]}
                        onChange={handleReminderChange_v2}
                        min="0"
                        max="23"
                        className="border rounded py-2 px-3 w-20"
                        placeholder="HH"
                    />
                    <input
                        type="number"
                        name="minutes"
                        value={habit.reminder?.split(":")[1]}
                        onChange={handleReminderChange_v2}
                        min="0"
                        max="59"
                        className="border rounded py-2 px-3 w-20"
                        placeholder="MM"
                    />

                </div>

            </div>



 
            <button type="submit" className="w-full p-6 text-start capitalize py-8 rounded-3xl  flex justify-center text-2xl  bg-blue-500 text-white  px-4  hover:bg-blue-700 ">
                {mode === 'edit' ? 'Update Habit' : 'Create Habit'}
            </button>
        </form>
    );
};

export default HabitForm;
