import React, { useEffect, useState } from "react";

const ToggleButton = ({ value,
    setHabit ,type="frequency" }) => {
    const [selected, setSelected] = useState(value);
    const arrOfOptions = "frequency"==type?["daily", "weekly"]:["Health",
    "Work",
    "Personal Development"]
    useEffect(() => {
        if(type=="category"){
            setHabit((prev) => ({ ...prev, "category": selected }));
        }else{
            setHabit((prev) => ({ ...prev, "frequency": selected }));

        }
        console.log(selected , type )
    }, [selected])
    
    return (
        <div className="flex bg-gray-100 rounded-full p-1 space-x-1 w-fit">
            
            {arrOfOptions.map((option) => (
                <div
                    key={option}
                    onClick={() => setSelected(option)}
                    className={`cursor-pointer px-4 py-1.5 rounded-full ${selected === option
                        ? "bg-white shadow text-gray-800"
                        : "text-gray-500"
                        }`}
                >
                    {option}
                </div>
            ))}
        </div>
    );
};

export default ToggleButton;
