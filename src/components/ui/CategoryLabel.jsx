import { TagIcon } from '@heroicons/react/24/outline'
import React from 'react'

const CategoryLabel = () => {
  return (
    <div className='w-full px-8 bg-white py-3 flex justify-start gap-3'>
        <div className='flex text-gray-500 text-base items-center justify-start'>
        <TagIcon className="h-6 w-6 text-pastel-orange border-orange-800  fill-current" />
        <span className='text-sm font-extralight'>Work</span>
        </div>
        <div className='flex text-gray-500 text-base items-center justify-start'>
        <TagIcon className="h-6 w-6 text-pastel-purple border-purple-500-800  fill-current" />
        <span className='text-sm font-extralight'>Personal Development</span>
        </div>
        <div className='flex text-gray-500 text-base items-center justify-start'>
        <TagIcon className="h-6 w-6 text-pastel-green border-green-800  fill-current" />
        <span className='text-sm font-extralight'>Health</span>
        </div>
    </div>
  )
}

export default CategoryLabel