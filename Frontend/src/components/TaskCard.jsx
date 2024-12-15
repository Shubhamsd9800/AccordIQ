import React from 'react'

const TaskCard = ({title,contract,date,status}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-blue-100 rounded-lg shadow-sm mb-4">
      <div>
        <h3 className={` text-base font-semibold ${status === "completed" ? "line-through" : ""}`}>
          {title}
        </h3>
        <p className="text-xs text-gray-600">{contract}</p>
        <p className="text-xs text-gray-500">{date}</p>
      </div>
      <div>
        <span className="w-6 h-6 flex items-center justify-center bg-white border border-blue-500 rounded-full">
          {status === "completed" ? (
            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <circle cx={12} cy={12} r={10} />
            </svg>
          )}
        </span>
      </div>
    </div>
  )
}

export default TaskCard;
