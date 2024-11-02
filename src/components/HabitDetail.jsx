import { useEffect, useState } from "react";
import Heatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { FaMedkit, FaCalendarCheck, FaHistory } from 'react-icons/fa';

const HabitDetail = ({ habitData }) => {
    const [historyMapData, setHistoryMapData] = useState([])
    useEffect(() => {
        console.log(habitData)
        const heatmapData = habitData?.histories?.map(entry => ({
            date: new Date(entry.createdAt).toISOString().split('T')[0],
            count: 1,
        }));
        setHistoryMapData(heatmapData)
    }, [habitData])


    return (
        <div className="container capitalize mx-auto p-6 bg-white shadow-lg rounded-lg">
            <div className="mb-4 p-4 bg-white rounded-lg shadow-md flex flex-col gap-3">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 ">{String(habitData.title)}</h1>
                <h2 className="text-xl font-semibold text-gray-700">📝 Details</h2>
                <p className="text-gray-600">Category: <span className="font-medium">{habitData?.category}</span></p>
                <p className="text-gray-600">Frequency: <span className="font-medium">{habitData?.frequency}</span></p>
                <p className="text-gray-600">Frequency: <span className="font-medium">{typeof habitData == "string" ? String(habitData?.reminder):"n/a"}</span></p>
                {/* <p className="text-gray-600">Reminder: <span className="font-medium">{habitData?.reminder'}</span></p> */}
            </div>

            <div className="mb-4 p-4 bg-white rounded-lg shadow-md flex flex-col gap-3">

                <h2 className="text-xl font-semibold text-gray-700">🔥 Streak Information</h2>
                <p className="text-gray-600">Consecutive Days 🏃🏿: <span className="font-medium">{habitData?.streak?.consecutiveDays}</span></p>
                <p className="text-gray-600">Last Completed 💪🏿: <span className="font-medium">{new Date(habitData?.streak?.lastCompletedDate).toLocaleDateString()}</span></p>
            </div>

            <div className="mb-4 p-4 bg-white rounded-lg shadow-md flex flex-col gap-3">

                <h2 className="text-xl font-semibold text-gray-700">🏆 Badges and Rewards </h2>
                <p className="text-gray-600">Points Gained 🪙: <span className="font-medium">{habitData?.streak?.points || 0}</span></p>
                <p className="text-gray-600">Badges 🌟: <span className="font-medium">{(habitData?.streak?.badges.join(',')) || 'n/a'}</span></p>
            </div>

            <div className="mb-4 p-4 bg-white rounded-lg shadow-md flex flex-col gap-3">
                <h2 className="text-xl font-semibold text-gray-700 flex items-center">
                    <FaHistory className="text-blue-500 mr-2 " /> Habit Completion History
                </h2>
                {historyMapData && <Heatmap
                    startDate={new Date('2024-01-01')}
                    endDate={new Date('2024-12-31')}
                    values={historyMapData}
                    classForValue={(value) => {
                        if (!value) {
                            return 'color-empty';
                        }
                        return `color-scale-${Math.min(value.count, 4)}`;
                    }}
                />}
            </div>
            {/* <div>
                <h2 className="text-xl font-semibold text-gray-700">History</h2>
                <ul className="list-disc pl-5">
                    {habitData.histories.map(history => (
                        <li key={history._id} className="text-gray-600">
                            Completed on: {new Date(history.createdAt).toLocaleString()}
                        </li>
                    ))}
                </ul>
            </div> */}
        </div>
    );
};

export default HabitDetail;