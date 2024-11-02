// LineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip, Legend);

const LineChart = ({ chartData }) => {
    const data = {
        labels: chartData.labels,
        datasets: chartData.datasets,
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            title: {
                display: true,
                text: 'Daily Habit Entries',
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Number of Completion',
                },
                beginAtZero: true,
            },
        },
    };

    return <Line data={data} options={options} />;
};

export default LineChart;
