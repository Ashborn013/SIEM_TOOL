"use client"
import React, { useEffect, useState } from 'react';
import SideBar from '@/components/SideBar';
import NavBar from '@/components/NavBar';

import Chart from 'chart.js/auto';

export default function Page() {
  const [rows, setRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function fetchJobDetails() {
      try {
        const response = await fetch('http://127.0.0.1:223/Job_details');
        const data = await response.json();
        console.log("Fetched data");

        setRows((currentRows) => {
          if (JSON.stringify(currentRows) !== JSON.stringify(data)) {
            return data;
          }
          return currentRows;
        });

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchJobDetails(); // Initial fetch
    const intervalId = setInterval(fetchJobDetails, 5000); // Fetch every 5000 ms (5 seconds)
    return () => clearInterval(intervalId);
  }, []);

  const filteredRows = rows.filter(row => 
    row.Job.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.level.toLowerCase().includes(searchQuery.toLowerCase()) ||
    row.Job_id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    new Date(row.time * 1000).toLocaleString().toLowerCase().includes(searchQuery.toLowerCase())
  );
  
  console.log(filteredRows)

  return (
    <div>
      <NavBar />
      <div className='flex h-screen justify-evenly flex-col p-2'>
        <div className='flex justify-center mb-4'>
          <label className="input input-bordered flex items-center gap-2 w-full max-w-md">
            <input 
              type="text" 
              className="grow" 
              placeholder="Search" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="h-4 w-4 opacity-70">
              <path
                fillRule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clipRule="evenodd" />
            </svg>
          </label>
        </div>
        <div className='flex-grow'>
          <CreateTable rows={filteredRows} />
        </div>
        {/* <div className='flex-grow-2'>
          <canvas id="canva-bar"></canvas>
        </div> */}
      </div>
      <SideBar />
    </div>
  )
}





function CreateTable({ rows }) {
  return (
    <div className="overflow-x-auto">
      <table className="table text-lg">
        {/* head */}
        <thead>
          <tr>
            <th className="text-xl">Slno</th>
            <th className="text-xl" >Job</th>
            <th className="text-xl" >Message</th>
            <th className="text-xl" >level</th>
            <th className="text-xl" >Job_id</th>
            <th className="text-xl" >Time</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index}>
              <th>{index + 1}</th>
              <td>{row.Job}</td>
              <td>{row.message}</td>
              <td>{row.level}</td>
              <td>{row.Job_id}</td>
              <td>{new Date(row.time * 1000).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}