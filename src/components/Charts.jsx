// Simple Bar Chart Component
export const BarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-16 text-sm text-gray-600">{item.label}</div>
            <div className="flex-1 bg-gray-200 rounded-full h-6 relative">
              <div 
                className="bg-blue-500 h-6 rounded-full flex items-center justify-end pr-2"
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              >
                <span className="text-white text-xs font-medium">{item.value}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Simple Line Chart Component
export const LineChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 300;
    const y = 150 - ((item.value / maxValue) * 120);
    return `${x},${y}`;
  }).join(' ');

  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="bg-gray-50 p-4 rounded-lg">
        <svg width="100%" height="180" viewBox="0 0 300 180">
          {/* Grid lines */}
          {[0, 1, 2, 3, 4].map(i => (
            <line 
              key={i}
              x1="0" 
              y1={30 + i * 30} 
              x2="300" 
              y2={30 + i * 30}
              stroke="#e5e7eb" 
              strokeWidth="1"
            />
          ))}
          
          {/* Line */}
          <polyline
            fill="none"
            stroke="#3b82f6"
            strokeWidth="3"
            points={points}
          />
          
          {/* Points */}
          {data.map((item, index) => {
            const x = (index / (data.length - 1)) * 300;
            const y = 150 - ((item.value / maxValue) * 120);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="#3b82f6"
              />
            );
          })}
        </svg>
        
        {/* Labels */}
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          {data.map((item, index) => (
            <span key={index}>{item.label}</span>
          ))}
        </div>
      </div>
    </div>
  );
};

// Simple Pie Chart Component
export const PieChart = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  let currentAngle = 0;
  
  const colors = ['#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6'];
  
  return (
    <div className="w-full">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="flex items-center space-x-6">
        <div className="relative">
          <svg width="200" height="200" viewBox="0 0 200 200">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const angle = (item.value / total) * 360;
              const startAngle = currentAngle;
              const endAngle = currentAngle + angle;
              
              const x1 = 100 + 80 * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = 100 + 80 * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = 100 + 80 * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = 100 + 80 * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArcFlag = angle > 180 ? 1 : 0;
              
              const pathData = [
                `M 100 100`,
                `L ${x1} ${y1}`,
                `A 80 80 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ');
              
              currentAngle += angle;
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={colors[index % colors.length]}
                />
              );
            })}
          </svg>
        </div>
        
        {/* Legend */}
        <div className="space-y-2">
          {data.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <div 
                className="w-4 h-4 rounded"
                style={{ backgroundColor: colors[index % colors.length] }}
              ></div>
              <span className="text-sm text-gray-700">{item.label}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};