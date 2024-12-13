import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useMedData } from '../context/MedDataContext';

export function Dashboard() {
  const { timeSeriesData, settings, updateSettings } = useMedData();

  const handleRangeChange = (e) => {
    updateSettings({
      ...settings,
      graphDays: Number(e.target.value)
    });
  };

  return (
    <div className="dashboard">
      <div className="dashboard-container">
        <div className="graph-container">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart
              data={timeSeriesData}
              margin={{ top: 5, right: 20, left: 20, bottom: 25 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="time"
                tickFormatter={(time) => {
                  const date = new Date(time);
                  return `${date.getMonth() + 1}/${date.getDate()}`;
                }}
              />
              <YAxis />
              <Tooltip
                labelFormatter={(label) => new Date(label).toLocaleString()}
                formatter={(value) => [`${value.toFixed(2)}mg`]}
              />
              <Legend />
              <Area
                type="monotone"
                dataKey="psychoactiveLevel"
                stackId="1"
                stroke="#8884d8"
                fill="#8884d8"
                name="Psychoactive Level"
              />
              <Area
                type="monotone"
                dataKey="plasmaLevel"
                stackId="2"
                stroke="#82ca9d"
                fill="#82ca9d"
                name="Plasma Level"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        
        <div className="graph-controls">
          <label>
            <span className="control-label">Time Range: {settings.graphDays} days</span>
            <input
              type="range"
              min="1"
              max="30"
              value={settings.graphDays}
              onChange={handleRangeChange}
              className="time-slider"
            />
          </label>
        </div>
      </div>
    </div>
  );
} 