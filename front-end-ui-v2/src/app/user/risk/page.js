"use client"

import React, { useEffect, useState, useLayoutEffect } from 'react';
import SideBar from '@/components/SideBar';
import NavBar from '@/components/NavBar';
import { BarChart } from '@mui/x-charts/BarChart';
import { PieChart } from '@mui/x-charts/PieChart';
import { styled } from '@mui/material/styles';
import { LineChart } from '@mui/x-charts/LineChart';

export default function Page() {

  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);
  const [bargraphdata, setBarGraphdata] = useState([]);
  const [piegraphdata, setPieGraphdata] = useState([]);
  const [lineChartData, setLineChartData] = useState({ times: [], incidents: [] });

  function ArrayToPieArry(rows) {
    let dict = {};
    rows.forEach((row) => {
      let what = row.level;
      dict[what] = (dict[what] || 0) + 1;
    });

    // Transform the dictionary into an array of dictionaries
    return Object.entries(dict).map(([letter, frequency]) => ({
      label: letter,
      value: frequency,
    }));
  }

  function ArrayToBarArray(rows) {
    let dict = {};

    rows.forEach((row) => {
      let what = row.level;
      dict[what] = (dict[what] || 0) + 1;
    });

    const labels = Object.keys(dict);
    const frequencies = Object.values(dict);

    return [labels, frequencies];
  }


  function ArrayToLineChartData(rows) {
      const eventsPerDay = {};
    
      rows.forEach(row => {
        const date = new Date(row.time * 1000).toISOString().split('T')[0]; // Convert epoch to date string (YYYY-MM-DD)
        eventsPerDay[date] = (eventsPerDay[date] || 0) + 1;
      })
      console.log(eventsPerDay);
    const times = Object.keys(eventsPerDay);
    const incidents = Object.values(eventsPerDay);
    // console.log(times, incidents);
    return { times ,incidents };
  }

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch('http://127.0.0.1:223/Job_details');
        const data = await response.json();
        console.log("Fetched data");

        setRows((currentRows) => {
          if (JSON.stringify(currentRows) !== JSON.stringify(data)) {
            setData(data);
            setBarGraphdata(ArrayToBarArray(data));
            setPieGraphdata(ArrayToPieArry(data));
            setLineChartData(ArrayToLineChartData(data));
            return data;
          }
          return currentRows;
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchJobDetails();
    const intervalId = setInterval(fetchJobDetails, 5000);
    return () => clearInterval(intervalId);
  }, []);

  // console.log(data);
  // console.log(piegraphdata);
  console.log(lineChartData)
  return (
    <div>
      <NavBar />
      <div className='flex justify-evenly items-center '>
        {lineChartData && lineChartData.incidents.length > 1 && lineChartData.times.length > 1 ? (
          <BasicLineChart data={lineChartData} />
        ) : (
          <div>Loading or No Data Available</div>
        )}
      </div>
      <div className='flex h-screen justify-evenly items-start '>
        <div>
          {bargraphdata && piegraphdata.length > 1 && bargraphdata[0].length > 0 && bargraphdata[1].length > 0 ? (
            <BarChart
              width={500}
              height={300}
              series={[{ data: bargraphdata[1], type: 'bar' }]}
              xAxis={[{ scaleType: 'band', data: bargraphdata[0] }]}
            >
            </BarChart>
          ) : (
            <div>Loading or No Data Available</div>
          )}
        </div>
        <div>
          {piegraphdata && piegraphdata.length > 1 ? (
            <PieChart
              series={[
                {
                  data: piegraphdata,
                  highlightScope: { fade: 'global', highlight: 'item' },
                  faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
                },
              ]}
              height={450}
              width={450}
            />
          ) : (
            <div>Loading or No Data Available</div>
          )}
        </div>
        <div>
          {/* Additional content can go here */}
        </div>
      </div>
      <SideBar />
    </div>
  );
}

const LoadingReact = styled('rect')({
  opacity: 0.2,
  fill: 'lightgray',
});

const LoadingText = styled('text')(({ theme }) => ({
  stroke: 'none',
  fill: theme.palette.text.primary,
  shapeRendering: 'crispEdges',
  textAnchor: 'middle',
  dominantBaseline: 'middle',
}));

function BasicLineChart({ data }) {
  console.log(data.incidents);
  // console.log(data);
  return (
    <LineChart
      xAxis={[{ data: data.times , scaleType: 'band' }]}
      series={[
        {
          data: data.incidents,

        },
      ]}
      width={500}
      height={300}
    />
  );
}