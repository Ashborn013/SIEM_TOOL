"use client"

import React, { useEffect, useState, useLayoutEffect } from 'react';
import SideBar from '@/components/SideBar';
import NavBar from '@/components/NavBar';

import Chart from 'chart.js/auto';

export default function Page() {
  function CreateGraph(labelsPlusData, elmId, graphType) {
    const ctx = document.getElementById(elmId);
    if (window.myChartInstance) {
      window.myChartInstance.destroy();
    }

    window.myChartInstance = new Chart(ctx, {
      type: graphType,
      data: {
        labels: Object.keys(labelsPlusData),
        datasets: [{
          data: Object.values(labelsPlusData)
        }]
      }
    });
  }

  const [rows, setRows] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch('http://127.0.0.1:223/Job_details');
        const data = await response.json();
        console.log("Fetched data");

        setRows((currentRows) => {
          if (JSON.stringify(currentRows) !== JSON.stringify(data)) {
            setData(data);
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

  useLayoutEffect(() => {
    console.log(document.getElementById("canva-doughnut")); // Check if canvas element exists
    console.log(CountValuesInArray(data)); // Verify data is being passed correctly

    CreateGraph(CountValuesInArray(data), "canva-doughnut", "doughnut");
    CreateGraph(CountValuesInArray(data), "canva-bar", "bar");
  }, [data]);

  function CountValuesInArray(rows) {
    let dict = {};
    rows.forEach((row) => {
      let what = row.level;
      dict[what] = (dict[what] || 0) + 1;
    });

    return dict;
  }

  return (
    <div>
      <NavBar />

      <div className='flex h-screen justify-evenly '>
        <div>
          <canvas id="canva-doughnut"  ></canvas>
        </div>
        <div>
          <canvas id="canva-bar"></canvas>
        </div>

      </div>
      <SideBar />
    </div>
  );
}