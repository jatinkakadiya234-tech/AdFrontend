import React from 'react';

const RecentActivity = () => {
  const activities = [
    { text: 'Campaign "Summer Sale" was approved', time: '2 hours ago', type: 'success' },
    { text: 'Payment of $500 processed', time: '1 day ago', type: 'payment' },
    { text: 'New creative uploaded', time: '3 days ago', type: 'info' },
    { text: 'Campaign "Black Friday" ended', time: '5 days ago', type: 'info' },
  ];

  const typeColors = {
    success: 'bg-green-500',
    payment: 'bg-purple-500',
    info: 'bg-blue-500',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-bold text-gray-900">Recent Activity</h3>
      </div>
      <div className="p-6 space-y-4">
        {activities.map((activity, index) => (
          <div key={index} className="flex gap-3">
            <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${typeColors[activity.type]}`}></div>
            <div>
              <p className="text-sm font-medium text-gray-900">{activity.text}</p>
              <p className="text-xs text-gray-500 mt-1">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;
