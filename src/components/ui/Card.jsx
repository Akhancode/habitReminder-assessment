import { useState } from 'react';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

function Card({ habit, completed = false, handleComplete }) {






    const navigate = useNavigate()
    let title = habit?.title
    let category = habit?.category
    let colorByCategory = "bg-pastel-green"; // Tailwind class should start with "bg-"

    if (completed) {
        colorByCategory = "bg-pastel-gray";
    } else if (String(category).toLowerCase() === "health") {
        colorByCategory = "bg-pastel-green";
    } else if (String(category).toLowerCase().includes("personal")) {
        colorByCategory = "bg-pastel-purple"; // Using a standard Tailwind color
    } else if (String(category).toLowerCase() === "work") {
        colorByCategory = "bg-pastel-orange"; // Using a standard Tailwind color
    }
    const handleClickComplete = (habitId) => {
        handleComplete(habitId)
    }
    const redirectToDetails = (habitId) => {
        navigate(`/progress/${habitId}`)
    
    }

    const [isDone, setIsDone] = useState(completed);
    const toggleDone = () => setIsDone(!isDone);

    console.log(category, title, colorByCategory, String(category).toLowerCase() === "personal development");

    return (
        <div onClick={()=>{redirectToDetails(habit._id)}} className={`${colorByCategory} opacity-85 rounded-3xl p-6 text-start capitalize py-8 flex justify-between pr-7 `}>
            <div className='flex items-center justify-center gap-5'>
                <p className="text-gray-800 text-2xl">{title}</p>
                <p className="text-gray-400 text-sm">{habit?.reminder||""}</p>

            </div>
            {isDone ? (
                <div className='flex gap-6'>
                    <p className='text-lg text-gray-400 font-extralight '>completed</p>
                    <CheckCircleIcon

                        className="h-8 w-8 text-green-500 transition-transform duration-200 ease-in-out transform hover:scale-110 active:scale-90"
                        strokeWidth={1.8} // Customize thickness
                    />
                </div>
            ) : (
                <XCircleIcon
                    onClick={(e) => { 
                        e.stopPropagation()
                        handleClickComplete(habit._id) }}
                    className="h-8 w-8 text-gray-400 transition-transform duration-200 ease-in-out transform hover:scale-110 active:scale-90"
                    strokeWidth={1.8} // Customize thickness
                />
            )}
        </div>
    );
}

export default Card;
