import React from 'react'
import TaskCard from './TaskCard';

const Task = () => {
    const tasks = [
        {
          title: "Request Ticket",
          contract: "Contract xyz",
          date: "10th August 12:00",
          status: "completed",
        },
        {
          title: "Request Ticket",
          contract: "Contract xyz",
          date: "10th August 12:00",
          status: "completed",
        },
        {
          title: "Signature Pending",
          contract: "Contract xyz",
          date: "10th August 12:00",
          status: "pending",
        },
      ];
      return (
        <div className="max-w-md mx-auto p-5 bg-white rounded-3xl shadow-md overflow-y-auto">
          <h2 className="text-3xl font-medium text-gray-800 mb-4">Task Log</h2>
          {tasks.map((task, index) => (
            <TaskCard
              key={index}
              title={task.title}
              contract={task.contract}
              date={task.date}
              status={task.status}
            />
          ))}
        </div>
      );
}

export default Task