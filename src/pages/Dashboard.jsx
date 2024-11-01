import React, { useEffect, useState } from 'react'

import CategoryPieChart from '../components/CategoryPieChart';

const Dashboard = () => {
  const categoryBreakdown = {
    Health: 2,
    Work: 2,
    'Personal Development': 1,
  };
  return (
    <div className='w-full bg-[#dbdada] flex flex-col gap-1'>
      <CategoryPieChart categoryBreakdown={categoryBreakdown} />
      <CategoryPieChart categoryBreakdown={categoryBreakdown} />
    </div>
  )
}

export default Dashboard