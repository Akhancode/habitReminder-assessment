import React from 'react';
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/outline';

const HabitTracker = ({ habit }) => {
    let title = habit?.title
    let category = habit?.category
    let colorByCategorySecondary = "green-500"; // Tailwind class should start with "bg-"
    let colorByCategoryPrimary = "pastel-green"; // Tailwind class should start with "bg-"

    if (String(category).toLowerCase() === "health") {
        colorByCategory = "bg-green-500";
    } else if (String(category).toLowerCase().includes("personal")) {
        colorByCategory = "bg-pastel-purple"; // Using a standard Tailwind color
    } else if (String(category).toLowerCase() === "work") {
        colorByCategory = "bg-pastel-orange"; // Using a standard Tailwind color
    }


    return (
        <div className='px-5 mt-2 font-sans  text-base text-gray-800'>
            <div className={`bg-${colorByCategoryPrimary} p-4 rounded-3xl w-full mx-auto px-10 py-10`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl  ">Walking</h3>
                    <span className="text-gray-500">Everyday</span>
                </div>
                <div className="flex justify-between">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
                        <div key={day} className="flex flex-col items-center">
                            <span className="text-sm text-gray-700">{day}</span>
                            <div
                                className={`w-14 h-14 rounded-full flex items-center justify-center mt-2 ${day === 'Sun' ? `bg-${colorByCategorySecondary}` : `bg-${colorByCategoryPrimary} border border-${colorByCategorySecondary} `
                                    }`}
                            >
                                {day === 'Sun' && <CheckIcon className="w-5 h-5 text-white" />}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HabitTracker;
