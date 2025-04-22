import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { Card, CardBody, CardHeader } from "@heroui/react";

const data = [
  { name: 'Chrome', visitors: 180 },
  { name: 'Safari', visitors: 200 },
  { name: 'Firefox', visitors: 275 },
  { name: 'Edge', visitors: 150 },
  { name: 'Other', visitors: 120 },
];

const customColors: Record<string, string> = {
  Chrome: '#4F46E5',
  Safari: '#EC4899',
  Firefox: '#D97706',
  Edge: '#9333EA',
  Other: '#10B981',
};

export default function BrowserChart() {
  return (
    <Card 
      className="w-full bg-black/10 backdrop-blur-lg border-none"
      radius="lg"
    >
      <CardHeader className="flex flex-col items-start px-6 pt-6">
        <h4 className="text-xl font-semibold text-white">
          Bar Chart - Active
        </h4>
        <p className="text-sm text-gray-400">
          January - June 2024
        </p>
      </CardHeader>
      <CardBody>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid 
                strokeDasharray="3 3" 
                stroke="#333" 
                vertical={false}
              />
              <XAxis
                dataKey="name"
                tick={{ fill: '#9CA3AF' }}
                axisLine={{ stroke: '#4B5563' }}
              />
              <YAxis
                tick={{ fill: '#9CA3AF' }}
                axisLine={{ stroke: '#4B5563' }}
              />
              <Tooltip
                content={({ active, payload }: { active?: boolean; payload?: any[] }) => {
                  if (active && payload && payload.length && payload[0]) {
                    const name = payload[0].payload.name;
                    const color = customColors[name as keyof typeof customColors] || '#000'; // Fallback color
                    return (
                      <div className="bg-[#1F2937] px-3 py-2 rounded-lg border-none">
                        <div className="flex items-center gap-2">
                          <span 
                            className="h-3 w-3 rounded-full" 
                            style={{ backgroundColor: color }}
                          />
                          <p className="text-white text-sm">
                            {`${payload[0].value} Visitors`}
                          </p>
                        </div>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Bar
                dataKey="visitors"
                radius={[4, 4, 0, 0]}
                maxBarSize={60}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={customColors[entry.name]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-4">
          <div className="flex items-center gap-1 text-emerald-400">
            <p className="text-sm">
              Trending up by 5.2% this month
            </p>
          </div>
          <p className="text-xs text-gray-400">
            Showing total visitors for the last 6 months
          </p>
        </div>
      </CardBody>
    </Card>
  );
}