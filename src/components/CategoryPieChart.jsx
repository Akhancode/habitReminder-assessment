import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

const CategoryPieChart = ({ categoryBreakdown }) => {
  const labels = Object.keys(categoryBreakdown);
  const dataValues = Object.values(categoryBreakdown);

  // Chart data and configuration
  const data = {
    labels,
    datasets: [
      {
        label: 'Category Breakdown',
        data: dataValues,
        backgroundColor: ['#4CAF50', '#2196F3', '#FF9800'], // Customize colors
        hoverBackgroundColor: ['#66BB6A', '#42A5F5', '#FFB74D'],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        labels: {
          color: '#333',
          font: { size: 14 },
        },
      },
      tooltip: {
        enabled: true,
      },
    },
    animation: {
      animateRotate: true,
      animateScale: true,
    },
  };

  return (
    <div  className='bg-white w-full h-2/6 py-2 '>
      <Pie data={data} options={options} />
    </div>
  );
};

export default CategoryPieChart;
