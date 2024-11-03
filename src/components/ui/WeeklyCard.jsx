import React from 'react';
import { CheckCircleIcon, CheckIcon } from '@heroicons/react/24/outline';
import { getDayShortFormat, getISODateForDay, getTodayDayShortFormat } from '../../utils/helper';
import api, { completeByIdWIthCustomDate } from '../../api/api';

const HabitTracker = ({ habit, markCustomDay }) => {
    let title = habit?.title || "walking"
    let category = habit?.category || "Health"
    let frequency = habit?.frequency || "Everyday"
    let completedDays = habit.histories.map((history) => {
        return getDayShortFormat(history?.createdAt)
    })
    const colors = {
        pastelGreen: {
            primary: "bg-pastel-green/[.5]",
            secondary: "bg-green-500",
            border: "border-green-500",
            text: "text-green-500"
        },
        pastelOrange: {
            primary: "bg-pastel-orange/[.5]",
            secondary: "bg-orange-500",
            border: "border-orange-500",
            text: "text-orange-500"

        },
        pastelPurple: {
            primary: "bg-pastel-purple/[.5]",
            secondary: "bg-purple-500",
            border: "border-purple-500",
            text: "text-purple-500"

        }
    };


    let colorByCategorySecondary = colors.pastelGreen.secondary
    let colorByCategorySecondaryBorder = colors.pastelGreen.border
    let colorByCategoryPrimary = colors.pastelGreen.primary
    let colorByCategoryText = colors.pastelGreen.text

    if (String(category).toLowerCase() === "health") {
        colorByCategorySecondary = colors.pastelGreen.secondary
        colorByCategorySecondaryBorder = colors.pastelGreen.border
        colorByCategoryPrimary = colors.pastelGreen.primary
        colorByCategoryText = colors.pastelGreen.text
    } else if (String(category).toLowerCase().includes("personal")) {
        colorByCategorySecondary = colors.pastelPurple.secondary
        colorByCategorySecondaryBorder = colors.pastelPurple.border
        colorByCategoryPrimary = colors.pastelPurple.primary
        colorByCategoryText = colors.pastelPurple.text
    } else if (String(category).toLowerCase() === "work") {
        colorByCategorySecondary = colors.pastelOrange.secondary
        colorByCategorySecondaryBorder = colors.pastelOrange.border
        colorByCategoryPrimary = colors.pastelOrange.primary
        colorByCategoryText = colors.pastelOrange.text
    }

    const todayDDD = getTodayDayShortFormat()
    // if (habit._id == "672713e39c3e88cd9f280471") {
    //     console.log(habit)
    // }
    return (
        <div className='md:w-1/2 px-5 mt-2  font-sans w-full text-base text-gray-800'>
            <div className={`${colorByCategoryPrimary} p-4 rounded-3xl w-full mx-auto px-10 py-10`}>
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-2xl text-gray-700 capitalize md:text-4xl">{title}</h3>
                    <span className="text-xl text-gray-500 capitalize md:text-3xl">{frequency}</span>
                </div>
                <div className=" grid grid-cols-7 gap-2 max-w-full">
                    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
                        <div key={day} className="flex flex-col items-center">
                            <span className={`text-sm text-gray-700 ${day === todayDDD ? `${colorByCategoryText} font-bold` : ''}`}>
                                {day}
                            </span>
                            <button
                                onClick={(e) => { markCustomDay(habit._id, day) }}
                                disabled={completedDays.includes(day)}
                                className={`aspect-square w-full rounded-full flex items-center justify-center mt-2 ${completedDays.includes(day) ? `${colorByCategorySecondary}` : `${colorByCategoryPrimary} border-[0.2rem] ${colorByCategorySecondaryBorder} hover:bg-slate-300 active:bg-white disabled`}`}
                            >
                                {completedDays.includes(day) && <CheckIcon className="w-5 h-5 text-white" />}
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    );
};

export default HabitTracker;
