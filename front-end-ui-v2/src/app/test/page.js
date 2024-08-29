"use client"
import React, { useState } from 'react';
import { Pie } from '@visx/shape';
import { Group } from '@visx/group';
import { scaleOrdinal } from '@visx/scale';

const data = [
  { label: 'A', value: 10 },
  { label: 'B', value: 20 },
  { label: 'C', value: 30 },
  { label: 'D', value: 40 },
];

const getFillColor = scaleOrdinal({
  domain: data.map((d) => d.label),
  range: ['#ff69b4', '#33cc33', '#6666ff', '#ff9966'],
});

const defaultMargin = { top: 20, right: 20, bottom: 20, left: 20 };

function PieChart({ width, height, margin = defaultMargin }) {
  const [selectedSlice, setSelectedSlice] = useState(null);

  if (width < 10) return null;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const radius = Math.min(innerWidth, innerHeight) / 2;
  const centerY = innerHeight / 2;
  const centerX = innerWidth / 2;

  return (
    <svg width={width} height={height}>
      <Group top={centerY + margin.top} left={centerX + margin.left}>
        <Pie
          data={data}
          pieValue={(d) => d.value}
          outerRadius={radius}
          innerRadius={0}
        >
          {(pie) => (
            <g>
              {pie.arcs.map((arc, index) => (
                <path
                  key={index}
                  d={pie.path(arc)}
                  fill={getFillColor(arc.data.label)}
                  onClick={() => setSelectedSlice(arc.data.label)}
                />
              ))}
            </g>
          )}
        </Pie>
        {selectedSlice && (
          <text
            x={centerX}
            y={centerY}
            dy=".33em"
            fontSize={24}
            textAnchor="middle"
            fill="#000"
          >
            {selectedSlice}
          </text>
        )}
      </Group>
    </svg>
  );
}

export default function Page() {
  return (
    <div>
      <PieChart width={500} height={300} />
    </div>
  )
}