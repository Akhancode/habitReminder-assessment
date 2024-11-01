// src/components/HabitForm.jsx
import React, { useState, useEffect } from 'react';

const HabitForm = ({ initialData = {}, onSubmit, mode }) => {
    const [habit, setHabit] = useState({
        title: '',
        category: '',
        frequency: '',
        reminder: '',
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

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md space-y-4">
            <h2 className="text-2xl font-semibold">{mode === 'edit' ? 'Edit Habit' : 'Create Habit'}</h2>

            <div className="flex flex-col">
                <label className="text-gray-700">Habit Title</label>
                <input
                    type="text"
                    name="title"
                    value={habit.title}
                    onChange={handleChange}
                    className="border rounded py-2 px-3"
                    placeholder="Enter habit name"
                    required
                />
            </div>

            <div className="flex flex-col">
                <label className="text-gray-700">Category</label>
                <select
                    name="category"
                    value={habit.category}
                    onChange={handleChange}
                    className="border rounded py-2 px-3"
                    required
                >
                    <option value="" disabled>Select Category</option>
                    <option value="Health">Health</option>
                    <option value="Work">Work</option>
                    <option value="Personal Development">Personal Development</option>
                </select>
            </div>
            <div className="flex flex-col">
                <label className="text-gray-700">Frequency</label>
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

            <div className="flex flex-col">
                <label className="text-gray-700">Reminder</label>
                <input
                    type="number"
                    name="reminder"
                    value={habit.reminder}
                    onChange={handleChange}
                    className="border rounded py-2 px-3"
                    placeholder="e.g., 9:00 AM"

                />
            </div>

            <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
                {mode === 'edit' ? 'Update Habit' : 'Create Habit'}
            </button>
        </form>
    );
};

export default HabitForm;
