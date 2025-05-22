"use client";

import React from 'react';

// Chart data interface
interface ChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor?: string | string[];
    borderColor?: string;
    tension?: number;
    fill?: boolean;
    borderWidth?: number;
  }[];
}

// Line Chart Component
export function LineChart({ data }: { data: ChartData }) {
  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <div className="w-full h-full relative">
        {/* Chart container */}
        <div className="absolute inset-0 flex flex-col">
          {/* Y-axis labels */}
          <div className="flex h-full">
            <div className="w-10 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
              <div>100</div>
              <div>75</div>
              <div>50</div>
              <div>25</div>
              <div>0</div>
            </div>
            
            {/* Chart grid and lines */}
            <div className="flex-1 h-full relative border-l border-gray-700">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="border-b border-gray-700 h-0"></div>
                <div className="border-b border-gray-700 h-0"></div>
                <div className="border-b border-gray-700 h-0"></div>
                <div className="border-b border-gray-700 h-0"></div>
                <div className="border-b border-gray-700 h-0"></div>
              </div>
              
              {/* Data lines (simplified representation) */}
              {data.datasets.map((dataset, i) => (
                <div 
                  key={i}
                  className="absolute inset-0 mt-2 mb-4"
                  style={{
                    background: `linear-gradient(to right, rgba(0,0,0,0) 0%, ${typeof dataset.borderColor === 'string' ? dataset.borderColor : '#4f46e5'} 50%, rgba(0,0,0,0) 100%)`,
                    opacity: 0.2,
                    clipPath: 'polygon(0% 70%, 15% 60%, 30% 40%, 45% 50%, 60% 30%, 75% 40%, 90% 20%, 100% 40%, 100% 100%, 0% 100%)'
                  }}
                ></div>
              ))}
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="h-6 flex pl-10">
            {data.labels.map((label, i) => (
              <div key={i} className="flex-1 text-center text-xs text-gray-500">
                {label}
              </div>
            ))}
          </div>
        </div>
        
        {/* Legend */}
        <div className="absolute top-0 right-0 flex items-center space-x-4">
          {data.datasets.map((dataset, i) => (
            <div key={i} className="flex items-center">
              <div 
                className="w-3 h-3 rounded-full mr-1"
                style={{ backgroundColor: typeof dataset.borderColor === 'string' ? dataset.borderColor : '#4f46e5' }}
              ></div>
              <span className="text-xs text-gray-400">{dataset.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Bar Chart Component
export function BarChart({ data }: { data: ChartData }) {
  return (
    <div className="w-full h-[300px] flex items-center justify-center">
      <div className="w-full h-full relative">
        {/* Chart container */}
        <div className="absolute inset-0 flex flex-col">
          {/* Y-axis labels */}
          <div className="flex h-full">
            <div className="w-12 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
              <div>100%</div>
              <div>75%</div>
              <div>50%</div>
              <div>25%</div>
              <div>0%</div>
            </div>
            
            {/* Chart grid and bars */}
            <div className="flex-1 h-full relative border-l border-gray-700">
              {/* Grid lines */}
              <div className="absolute inset-0 flex flex-col justify-between">
                <div className="border-b border-gray-700 h-0"></div>
                <div className="border-b border-gray-700 h-0"></div>
                <div className="border-b border-gray-700 h-0"></div>
                <div className="border-b border-gray-700 h-0"></div>
                <div className="border-b border-gray-700 h-0"></div>
              </div>
              
              {/* Bars */}
              <div className="absolute inset-0 flex items-end justify-around p-2">
                {data.labels.map((label, i) => {
                  const value = data.datasets[0].data[i];
                  const maxValue = Math.max(...data.datasets[0].data);
                  const height = `${(value / maxValue) * 100}%`;
                  const bgColor = Array.isArray(data.datasets[0].backgroundColor) 
                    ? data.datasets[0].backgroundColor[i] 
                    : data.datasets[0].backgroundColor || '#4f46e5';
                  
                  return (
                    <div key={i} className="flex flex-col items-center w-full max-w-[40px]">
                      <div 
                        className="w-full rounded-t-sm"
                        style={{ 
                          height, 
                          backgroundColor: bgColor,
                          maxWidth: '30px'
                        }}
                      ></div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
          
          {/* X-axis labels */}
          <div className="h-6 flex pl-12">
            {data.labels.map((label, i) => (
              <div key={i} className="flex-1 text-center text-xs text-gray-500 truncate px-1">
                {label}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Pie Chart Component
export function PieChart({ data }: { data: ChartData }) {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="relative w-[200px] h-[200px] rounded-full overflow-hidden">
        {/* Simplified pie chart representation */}
        <div className="absolute inset-0" style={{ 
          background: `conic-gradient(
            ${data.datasets[0].backgroundColor?.[0] || '#f87171'} 0% ${data.datasets[0].data[0]}%, 
            ${data.datasets[0].backgroundColor?.[1] || '#60a5fa'} ${data.datasets[0].data[0]}% ${data.datasets[0].data[0] + data.datasets[0].data[1]}%, 
            ${data.datasets[0].backgroundColor?.[2] || '#fbbf24'} ${data.datasets[0].data[0] + data.datasets[0].data[1]}% ${data.datasets[0].data[0] + data.datasets[0].data[1] + data.datasets[0].data[2]}%,
            ${data.datasets[0].backgroundColor?.[3] || '#34d399'} ${data.datasets[0].data[0] + data.datasets[0].data[1] + data.datasets[0].data[2]}% ${data.datasets[0].data[0] + data.datasets[0].data[1] + data.datasets[0].data[2] + data.datasets[0].data[3]}%,
            ${data.datasets[0].backgroundColor?.[4] || '#a78bfa'} ${data.datasets[0].data[0] + data.datasets[0].data[1] + data.datasets[0].data[2] + data.datasets[0].data[3]}% 100%
          )`
        }}></div>
        
        {/* Center circle for donut effect */}
        <div className="absolute inset-0 m-auto w-[120px] h-[120px] rounded-full bg-black"></div>
      </div>
      
      {/* Legend */}
      <div className="ml-4 space-y-2">
        {data.labels.map((label, i) => (
          <div key={i} className="flex items-center">
            <div 
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: Array.isArray(data.datasets[0].backgroundColor) 
                ? data.datasets[0].backgroundColor[i] 
                : '#4f46e5' 
              }}
            ></div>
            <span className="text-xs text-gray-400">{label}: {data.datasets[0].data[i]}%</span>
          </div>
        ))}
      </div>
    </div>
  );
}