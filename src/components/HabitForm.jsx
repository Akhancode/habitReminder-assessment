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









    if (!habit.reminder) {
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
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4 h-[70vh] min-w-full max-w-lg overflow-y-auto flex flex-col">
                <h2 className="w-full py-3 text-3xl font-sans text-gray-600 flex items-center justify-start">
                    {mode === 'edit' ? 'Update' : 'Create'} <span className='ml-1 text-black'>Habit</span>
                </h2>

                <div className="bg-[#edeef2] opacity-85 rounded-3xl p-4 py-6 flex flex-col sm:flex-row justify-between items-center space-y-2 sm:space-y-0 h-[15%]">
                    <input
                        type="text"
                        name="title"
                        value={habit.title}
                        onChange={handleChange}
                        className="w-full sm:w-auto text-xl bg-transparent outline-none cursor-text h-full"
                        placeholder="Habit Name"
                        required
                    />
                </div>

                <div className="bg-[#edeef2] opacity-85 rounded-3xl p-4 py-6 flex flex-row sm:flex-row justify-between items-center space-y-2 sm:space-y-0 h-[15%]">
                    <label className="text-gray-900 text-xl w-full sm:w-auto">Category</label>
                    <select
                        name="category"
                        value={habit.category}
                        onChange={handleChange}
                        className="border-2 rounded w-full sm:w-auto py-2 px-3 h-full"
                        required
                    >
                        <option value="" disabled>Select Category</option>
                        <option value="Health">Health</option>
                        <option value="Work">Work</option>
                        <option value="Personal Development">Personal Development</option>
                    </select>
                </div>

                <div className="bg-[#edeef2] opacity-85 rounded-3xl p-4 py-6 flex flex-row sm:flex-row  justify-between items-center space-y-2 sm:space-y-0 h-[15%]">
                    <label className="text-gray-900 text-xl w-full sm:w-auto">Frequency</label>
                    <select
                        name="frequency"
                        value={habit.frequency}
                        onChange={handleChange}
                        className="border rounded w-full sm:w-auto py-2 px-3 h-full"
                        required
                    >
                        <option value="" disabled>Select frequency</option>
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>

                <div className="bg-[#edeef2] opacity-85 rounded-3xl p-4 py-6 flex flex-row sm:flex-row justify-between items-center space-y-2 sm:space-y-0 h-[15%]">
                    <label className="text-gray-900 text-xl w-full sm:w-auto">Reminder</label>
                    <div className="flex gap-2 w-full sm:w-auto">
                        <input
                            type="string"
                            name="hours"
                            value={habit.reminder?.split(":")[0]}
                            onChange={handleReminderChange_v2}
                    
                            className="border rounded w-full sm:w-20 py-2 px-3 h-full"
                            placeholder="HH"
                        />
                        <input
                            type="string"
                            name="minutes"
                            value={habit.reminder?.split(":")[1]}
                            onChange={handleReminderChange_v2}
                     
                            className="border rounded w-full sm:w-20 py-2 px-3 h-full"
                            placeholder="MM"
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="w-full py-2 rounded-3xl text-xl bg-blue-500 text-white flex items-center justify-center hover:bg-blue-700 h-[15%]"
                >
                    {mode === 'edit' ? 'Update Habit' : 'Create Habit'}
                </button>
            </form>

    );
};

export default HabitForm;
