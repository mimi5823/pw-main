"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

// Enhanced Chart Data interface with more options
interface EnhancedChartData {
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
  // Added properties for enhanced charts
  title?: string;
  description?: string;
  timeRanges?: string[];
  insights?: {
    text: string;
    type: 'positive' | 'negative' | 'neutral' | string;
  }[];
}

// Tooltip Component
const Tooltip = ({ visible, x, y, data, label }: { 
  visible: boolean; 
  x: number; 
  y: number; 
  data: number; 
  label: string;
}) => {
  if (!visible) return null;
  
  return (
    <div 
      className="absolute bg-gray-900 text-white p-2 rounded-md border border-gray-700 shadow-lg z-10 text-sm"
      style={{ 
        left: `${x}px`, 
        top: `${y - 40}px`,
        transform: 'translateX(-50%)',
        pointerEvents: 'none'
      }}
    >
      <div className="font-medium">{label}</div>
      <div className="text-primary">{data}</div>
    </div>
  );
};

// Enhanced Line Chart Component
export function EnhancedLineChart({ data }: { data: EnhancedChartData }) {
  const [activeTooltip, setActiveTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    data: number;
    label: string;
    datasetIndex: number;
  }>({
    visible: false,
    x: 0,
    y: 0,
    data: 0,
    label: '',
    datasetIndex: 0
  });
  
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(
    data.timeRanges && data.timeRanges.length > 0 ? data.timeRanges[0] : 'Last 7 days'
  );

  // Calculate the maximum value for scaling
  const maxValue = Math.max(...data.datasets.flatMap(dataset => dataset.data)) * 1.2;
  
  return (
    <Card className="bg-black text-white shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{data.title || 'Chart'}</CardTitle>
            <CardDescription className="text-gray-400">{data.description || 'Data visualization'}</CardDescription>
          </div>
          {data.timeRanges && (
            <select 
              className="bg-gray-900 border border-gray-800 rounded-md text-sm text-white px-2 py-1"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              {data.timeRanges.map((range, i) => (
                <option key={i} value={range}>{range}</option>
              ))}
            </select>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] relative">
          {/* Chart container */}
          <div className="absolute inset-0 flex flex-col">
            {/* Y-axis labels */}
            <div className="flex h-full">
              <div className="w-10 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                <div>{maxValue.toFixed(0)}</div>
                <div>{(maxValue * 0.75).toFixed(0)}</div>
                <div>{(maxValue * 0.5).toFixed(0)}</div>
                <div>{(maxValue * 0.25).toFixed(0)}</div>
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
                
                {/* Data lines with interactive points */}
                {data.datasets.map((dataset, datasetIndex) => {
                  // Create points for the line
                  const points = dataset.data.map((value, i) => {
                    const x = (i / (data.labels.length - 1)) * 100;
                    const y = 100 - ((value / maxValue) * 100);
                    return { x, y, value, label: data.labels[i] };
                  });
                  
                  // Create SVG path from points
                  const pathD = points.map((point, i) => {
                    return `${i === 0 ? 'M' : 'L'} ${point.x}% ${point.y}%`;
                  }).join(' ');
                  
                  // Create area fill path
                  const areaPathD = `${pathD} L 100% 100% L 0% 100% Z`;
                  
                  return (
                    <div key={datasetIndex} className="absolute inset-0 mt-2 mb-4">
                      {/* Area fill */}
                      {dataset.fill && (
                        <svg className="w-full h-full">
                          <defs>
                            <linearGradient id={`gradient-${datasetIndex}`} x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor={typeof dataset.borderColor === 'string' ? dataset.borderColor : '#4f46e5'} stopOpacity="0.2" />
                              <stop offset="100%" stopColor={typeof dataset.borderColor === 'string' ? dataset.borderColor : '#4f46e5'} stopOpacity="0" />
                            </linearGradient>
                          </defs>
                          <path 
                            d={areaPathD} 
                            fill={`url(#gradient-${datasetIndex})`}
                            stroke="none"
                          />
                        </svg>
                      )}
                      
                      {/* Line */}
                      <svg className="w-full h-full absolute inset-0">
                        <path 
                          d={pathD} 
                          fill="none"
                          stroke={typeof dataset.borderColor === 'string' ? dataset.borderColor : '#4f46e5'}
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                      
                      {/* Interactive points */}
                      <div className="absolute inset-0">
                        {points.map((point, i) => (
                          <div 
                            key={i}
                            className="absolute w-4 h-4 -ml-2 -mt-2 cursor-pointer"
                            style={{ 
                              left: `${point.x}%`, 
                              top: `${point.y}%`,
                            }}
                            onMouseEnter={(e) => {
                              const rect = e.currentTarget.getBoundingClientRect();
                              setActiveTooltip({
                                visible: true,
                                x: rect.left + rect.width / 2,
                                y: rect.top,
                                data: point.value,
                                label: `${dataset.label} (${point.label})`,
                                datasetIndex
                              });
                            }}
                            onMouseLeave={() => {
                              setActiveTooltip(prev => ({ ...prev, visible: false }));
                            }}
                          >
                            <div 
                              className={`w-3 h-3 rounded-full border-2 transition-all duration-200 ${
                                activeTooltip.visible && 
                                activeTooltip.datasetIndex === datasetIndex && 
                                point.label === data.labels[data.labels.indexOf(activeTooltip.label.split(' (')[1]?.replace(')', ''))]
                                  ? 'scale-150' 
                                  : 'scale-0'
                              }`}
                              style={{ 
                                backgroundColor: 'black',
                                borderColor: typeof dataset.borderColor === 'string' ? dataset.borderColor : '#4f46e5',
                              }}
                            ></div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
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
          
          {/* Tooltip */}
          <Tooltip 
            visible={activeTooltip.visible}
            x={activeTooltip.x}
            y={activeTooltip.y}
            data={activeTooltip.data}
            label={activeTooltip.label}
          />
        </div>
        
        {/* Insights and summary */}
        {data.insights && data.insights.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <h4 className="text-sm font-medium text-white mb-2">Insights</h4>
            <div className="space-y-2">
              {data.insights.map((insight, i) => (
                <div key={i} className="flex items-start">
                  <div className={`w-3 h-3 rounded-full mr-2 mt-1 ${
                    insight.type === 'positive' ? 'bg-green-500' : 
                    insight.type === 'negative' ? 'bg-red-500' : 
                    'bg-gray-500'
                  }`}></div>
                  <p className="text-sm text-gray-300">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Summary metrics */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Average</span>
              <span className="text-lg font-bold text-white">
                {(data.datasets[0].data.reduce((a, b) => a + b, 0) / data.datasets[0].data.length).toFixed(1)}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Peak</span>
              <span className="text-lg font-bold text-white">
                {Math.max(...data.datasets[0].data)}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced Bar Chart Component
export function EnhancedBarChart({ data }: { data: EnhancedChartData }) {
  const [activeTooltip, setActiveTooltip] = useState<{
    visible: boolean;
    x: number;
    y: number;
    data: number;
    label: string;
  }>({
    visible: false,
    x: 0,
    y: 0,
    data: 0,
    label: ''
  });
  
  const [selectedTimeRange, setSelectedTimeRange] = useState<string>(
    data.timeRanges && data.timeRanges.length > 0 ? data.timeRanges[0] : 'Last 6 months'
  );

  // Calculate the maximum value for scaling
  const maxValue = Math.max(...data.datasets.flatMap(dataset => dataset.data)) * 1.2;
  
  return (
    <Card className="bg-black text-white shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{data.title || 'Chart'}</CardTitle>
            <CardDescription className="text-gray-400">{data.description || 'Data visualization'}</CardDescription>
          </div>
          {data.timeRanges && (
            <select 
              className="bg-gray-900 border border-gray-800 rounded-md text-sm text-white px-2 py-1"
              value={selectedTimeRange}
              onChange={(e) => setSelectedTimeRange(e.target.value)}
            >
              {data.timeRanges.map((range, i) => (
                <option key={i} value={range}>{range}</option>
              ))}
            </select>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[300px] relative">
          {/* Chart container */}
          <div className="absolute inset-0 flex flex-col">
            {/* Y-axis labels */}
            <div className="flex h-full">
              <div className="w-12 h-full flex flex-col justify-between text-xs text-gray-500 py-2">
                <div>{maxValue.toFixed(0)}</div>
                <div>{(maxValue * 0.75).toFixed(0)}</div>
                <div>{(maxValue * 0.5).toFixed(0)}</div>
                <div>{(maxValue * 0.25).toFixed(0)}</div>
                <div>0</div>
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
                    const height = `${(value / maxValue) * 100}%`;
                    const bgColor = Array.isArray(data.datasets[0].backgroundColor) 
                      ? data.datasets[0].backgroundColor[i] 
                      : data.datasets[0].backgroundColor || '#4f46e5';
                    
                    return (
                      <div 
                        key={i} 
                        className="flex flex-col items-center w-full max-w-[40px] cursor-pointer group"
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setActiveTooltip({
                            visible: true,
                            x: rect.left + rect.width / 2,
                            y: rect.top + (rect.height - (rect.height * (value / maxValue))),
                            data: value,
                            label: `${data.datasets[0].label} (${label})`
                          });
                        }}
                        onMouseLeave={() => {
                          setActiveTooltip(prev => ({ ...prev, visible: false }));
                        }}
                      >
                        <div 
                          className="w-full rounded-t-sm transition-all duration-200 group-hover:brightness-125"
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
          
          {/* Tooltip */}
          <Tooltip 
            visible={activeTooltip.visible}
            x={activeTooltip.x}
            y={activeTooltip.y}
            data={activeTooltip.data}
            label={activeTooltip.label}
          />
        </div>
        
        {/* Insights and summary */}
        {data.insights && data.insights.length > 0 && (
          <div className="mt-4 pt-4 border-t border-gray-800">
            <h4 className="text-sm font-medium text-white mb-2">Insights</h4>
            <div className="space-y-2">
              {data.insights.map((insight, i) => (
                <div key={i} className="flex items-start">
                  <div className={`w-3 h-3 rounded-full mr-2 mt-1 ${
                    insight.type === 'positive' ? 'bg-green-500' : 
                    insight.type === 'negative' ? 'bg-red-500' : 
                    'bg-gray-500'
                  }`}></div>
                  <p className="text-sm text-gray-300">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Summary metrics */}
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-800">
          <div className="grid grid-cols-2 gap-4 w-full">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Total</span>
              <span className="text-lg font-bold text-white">
                {data.datasets[0].data.reduce((a, b) => a + b, 0).toLocaleString()}
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-xs text-gray-400">Average</span>
              <span className="text-lg font-bold text-white">
                {(data.datasets[0].data.reduce((a, b) => a + b, 0) / data.datasets[0].data.length).toLocaleString(undefined, {maximumFractionDigits: 0})}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Enhanced Pie Chart Component
export function EnhancedPieChart({ data }: { data: EnhancedChartData }) {
  const [activeSegment, setActiveSegment] = useState<number | null>(null);
  const [isHovering, setIsHovering] = useState(false);
  
  // Calculate total for percentages
  const total = data.datasets[0].data.reduce((a, b) => a + b, 0);
  
  // Define a vibrant color palette with better contrast
  const defaultColors = [
    '#3b82f6', // blue
    '#f59e0b', // amber
    '#10b981', // emerald
    '#8b5cf6', // violet
    '#ec4899', // pink
    '#f43f5e', // rose
    '#06b6d4', // cyan
    '#84cc16', // lime
    '#6366f1', // indigo
    '#ef4444'  // red
  ];
  
  // Calculate segment angles
  const segments = data.datasets[0].data.map((value, index) => {
    const percentage = (value / total) * 100;
    const previousSegmentsTotal = data.datasets[0].data
      .slice(0, index)
      .reduce((sum, val) => sum + (val / total) * 100, 0);
    
    // Use provided colors or default to our enhanced palette
    const color = Array.isArray(data.datasets[0].backgroundColor) 
      ? data.datasets[0].backgroundColor[index] 
      : defaultColors[index % defaultColors.length];
    
    return {
      value,
      percentage,
      startAngle: previousSegmentsTotal * 3.6, // Convert percentage to degrees (360 / 100 = 3.6)
      endAngle: (previousSegmentsTotal + percentage) * 3.6,
      color,
      label: data.labels[index]
    };
  });
  
  return (
    <Card className="bg-black text-white shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>{data.title || 'Distribution'}</CardTitle>
            <CardDescription className="text-gray-400">{data.description || 'Data distribution'}</CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              className="text-xs text-primary hover:underline"
              onClick={() => {
                // This would typically trigger a download or export function
                alert('Export functionality would be implemented here');
              }}
            >
              Export
            </button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row justify-center items-center gap-8">
          <div 
            className="relative w-[280px] h-[280px]"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => {
              setIsHovering(false);
              setActiveSegment(null);
            }}
          >
            {/* SVG Pie Chart */}
            <svg width="280" height="280" viewBox="0 0 280 280">
              <defs>
                <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
              </defs>
              <g transform="translate(140, 140)">
                {segments.map((segment, i) => {
                  // Calculate SVG arc path
                  const startAngle = segment.startAngle * (Math.PI / 180);
                  const endAngle = segment.endAngle * (Math.PI / 180);
                  
                  // Calculate the midpoint angle for the segment
                  const midAngle = (startAngle + endAngle) / 2;
                  
                  // Calculate points for the path
                  const radius = 100;
                  const x1 = Math.cos(startAngle) * radius;
                  const y1 = Math.sin(startAngle) * radius;
                  
                  const x2 = Math.cos(endAngle) * radius;
                  const y2 = Math.sin(endAngle) * radius;
                  
                  // Determine if we need the large arc flag
                  const largeArcFlag = segment.percentage > 50 ? 1 : 0;
                  
                  // Create the path data
                  const pathData = [
                    `M 0 0`,
                    `L ${x1} ${y1}`,
                    `A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                    `Z`
                  ].join(' ');
                  
                  // For hover effect, calculate a slightly larger radius
                  const hoverRadius = radius + (activeSegment === i ? 15 : 10);
                  const hoverX1 = Math.cos(startAngle) * hoverRadius;
                  const hoverY1 = Math.sin(startAngle) * hoverRadius;
                  
                  const hoverX2 = Math.cos(endAngle) * hoverRadius;
                  const hoverY2 = Math.sin(endAngle) * hoverRadius;
                  
                  const hoverPathData = [
                    `M 0 0`,
                    `L ${hoverX1} ${hoverY1}`,
                    `A ${hoverRadius} ${hoverRadius} 0 ${largeArcFlag} 1 ${hoverX2} ${hoverY2}`,
                    `Z`
                  ].join(' ');
                  
                  // Calculate position for percentage label
                  const labelRadius = radius * 0.7;
                  const labelX = Math.cos(midAngle) * labelRadius;
                  const labelY = Math.sin(midAngle) * labelRadius;
                  
                  // Only show percentage labels for segments > 10%
                  const showLabel = segment.percentage >= 10;
                  
                  // Calculate pull-out effect for active segment
                  const pullOutDistance = activeSegment === i ? 10 : 0;
                  const translateX = Math.cos(midAngle) * pullOutDistance;
                  const translateY = Math.sin(midAngle) * pullOutDistance;
                  
                  return (
                    <g key={i} 
                      onMouseEnter={() => setActiveSegment(i)}
                      onMouseLeave={() => !isHovering && setActiveSegment(null)}
                      className="cursor-pointer"
                      style={{
                        transform: `translate(${translateX}px, ${translateY}px)`,
                        transition: 'transform 0.3s ease-out'
                      }}
                    >
                      {/* Base segment */}
                      <path
                        d={pathData}
                        fill={segment.color}
                        stroke="#111"
                        strokeWidth="1"
                        className="transition-all duration-300"
                        style={{ 
                          opacity: activeSegment === null || activeSegment === i ? 1 : 0.5,
                          filter: activeSegment === i ? 'url(#glow)' : 'none'
                        }}
                      />
                      
                      {/* Hover effect segment */}
                      {activeSegment === i && (
                        <path
                          d={hoverPathData}
                          fill={segment.color}
                          stroke="#111"
                          strokeWidth="1"
                          className="animate-pulse"
                          style={{ opacity: 0.15 }}
                        />
                      )}
                      
                      {/* Percentage labels inside segments */}
                      {showLabel && (
                        <text
                          x={labelX}
                          y={labelY}
                          textAnchor="middle"
                          dominantBaseline="middle"
                          fill="#fff"
                          fontSize="13"
                          fontWeight="bold"
                          style={{
                            filter: 'drop-shadow(0px 0px 2px rgba(0,0,0,0.8))',
                            opacity: activeSegment === null || activeSegment === i ? 1 : 0.7,
                          }}
                        >
                          {segment.percentage.toFixed(0)}%
                        </text>
                      )}
                    </g>
                  );
                })}
                
                {/* Center circle for donut effect */}
                <circle 
                  cx="0" 
                  cy="0" 
                  r="60" 
                  fill="#000" 
                  stroke="#111" 
                  strokeWidth="2" 
                  className="transition-all duration-300"
                  style={{
                    filter: activeSegment !== null ? 'drop-shadow(0px 0px 4px rgba(255,255,255,0.1))' : 'none'
                  }}
                />
                
                {/* Center text - show selected segment info */}
                {activeSegment !== null ? (
                  <g>
                    <text 
                      x="0" 
                      y="-15" 
                      textAnchor="middle" 
                      fill="white" 
                      fontSize="14"
                      fontWeight="bold"
                      className="transition-all duration-300"
                    >
                      {segments[activeSegment].label}
                    </text>
                    <text 
                      x="0" 
                      y="15" 
                      textAnchor="middle" 
                      fill="white" 
                      fontSize="20"
                      fontWeight="bold"
                      className="transition-all duration-300"
                    >
                      {segments[activeSegment].percentage.toFixed(1)}%
                    </text>
                    <text 
                      x="0" 
                      y="35" 
                      textAnchor="middle" 
                      fill="gray" 
                      fontSize="12"
                      className="transition-all duration-300"
                    >
                      ({segments[activeSegment].value})
                    </text>
                  </g>
                ) : (
                  <g>
                    <text 
                      x="0" 
                      y="-5" 
                      textAnchor="middle" 
                      dominantBaseline="middle"
                      fill="white" 
                      fontSize="14"
                      fontWeight="bold"
                    >
                      Total
                    </text>
                    <text 
                      x="0" 
                      y="15" 
                      textAnchor="middle" 
                      dominantBaseline="middle"
                      fill="white" 
                      fontSize="18"
                      fontWeight="bold"
                    >
                      {total}
                    </text>
                  </g>
                )}
              </g>
            </svg>
          </div>
          
          {/* Legend */}
          <div className="mt-4 lg:mt-0 lg:ml-4 space-y-2 flex-shrink-0 w-full lg:w-auto max-w-[280px] lg:max-w-none">
            {segments.map((segment, i) => (
              <div 
                key={i} 
                className="flex items-center group cursor-pointer p-1 rounded-md transition-colors duration-200 hover:bg-gray-900/50"
                onMouseEnter={() => setActiveSegment(i)}
                onMouseLeave={() => !isHovering && setActiveSegment(null)}
              >
                <div 
                  className="w-4 h-4 rounded-sm mr-3 transition-all duration-200 group-hover:scale-125"
                  style={{ 
                    backgroundColor: segment.color,
                    transform: activeSegment === i ? 'scale(1.25)' : 'scale(1)',
                    boxShadow: activeSegment === i ? `0 0 8px ${segment.color}` : 'none'
                  }}
                ></div>
                <div className="flex flex-col">
                  <span className={`text-sm ${activeSegment === i ? 'text-white font-medium' : 'text-gray-300'}`}>
                    {segment.label}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs ${activeSegment === i ? 'text-white' : 'text-gray-400'}`}>
                      {segment.percentage.toFixed(1)}%
                    </span>
                    <span className="text-xs text-gray-500">
                      ({segment.value})
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Insights section */}
        {data.insights && data.insights.length > 0 && (
          <div className="mt-8 pt-4 border-t border-gray-800">
            <h4 className="text-sm font-medium text-white mb-3">Key Insights</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {data.insights.map((insight, i) => (
                <div 
                  key={i} 
                  className={`flex items-start p-3 rounded-lg ${
                    insight.type === 'positive' ? 'bg-green-900/20 border border-green-800/30' : 
                    insight.type === 'negative' ? 'bg-red-900/20 border border-red-800/30' : 
                    'bg-gray-900/20 border border-gray-800/30'
                  }`}
                >
                  <div className={`w-3 h-3 rounded-full mr-2 mt-1 ${
                    insight.type === 'positive' ? 'bg-green-500' : 
                    insight.type === 'negative' ? 'bg-red-500' : 
                    'bg-gray-500'
                  }`}></div>
                  <p className="text-sm text-gray-300">{insight.text}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Skeleton loader for charts
export function ChartSkeleton() {
  return (
    <Card className="bg-black text-white shadow-lg hover:shadow-primary/5 transition-all duration-300 border border-gray-800">
      <CardHeader>
        <div className="animate-pulse flex justify-between items-center">
          <div>
            <div className="h-6 w-32 bg-gray-800 rounded mb-2"></div>
            <div className="h-4 w-48 bg-gray-800 rounded"></div>
          </div>
          <div className="h-8 w-28 bg-gray-800 rounded"></div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="animate-pulse">
          <div className="h-[300px] bg-gray-800/30 rounded-lg border border-gray-800 flex items-center justify-center">
            <div className="grid grid-cols-7 gap-2 w-full px-10">
              {Array(7).fill(0).map((_, i) => (
                <div 
                  key={i} 
                  className="bg-gray-700/30 rounded-t-sm" 
                  style={{ 
                    height: `${Math.random() * 150 + 50}px`,
                  }}
                ></div>
              ))}
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-800 grid grid-cols-2 gap-4">
            <div>
              <div className="h-4 w-20 bg-gray-800 rounded mb-2"></div>
              <div className="h-6 w-16 bg-gray-800 rounded"></div>
            </div>
            <div>
              <div className="h-4 w-20 bg-gray-800 rounded mb-2"></div>
              <div className="h-6 w-16 bg-gray-800 rounded"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}