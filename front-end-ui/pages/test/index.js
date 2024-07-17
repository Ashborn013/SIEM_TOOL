import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar'
import NavBar from '../../components/NavBar';
import Chart from 'chart.js/auto';
//  to do add a funtion in main.py which can add each job run to table 
export default function index() {
  const [rows, setRows] = useState([]);
  useEffect(
    () => {
      fetch('http://127.0.0.1:223/Job_details')
        .then(response => response.json())
        .then(data => {
          setRows(data);

        })
        .catch(error => console.error("Error"), [])
    }, []

  )
  // console.log(CountValuesInArray(rows))
  useEffect(() => {
    if (rows.length > 0) {
      CreateGraph(CountValuesInArray(rows), "canva-bar");
    }
  }, [rows]);


  return (
    <div>
      <NavBar />
      <div className='flex h-screen'>
        <CreateTable rows={rows} />
        <canvas id="canva-bar"></canvas>

      </div>
      awd
      <SideBar />
    </div>
  )
}

function CountValuesInArray(rows) {
  let dict = {}
  rows.forEach(row => {
    let what = row.level;
    dict[what] = (dict[what] || 0) + 1;
  });

  return dict
}


function CreateGraph(lablesPluseData, elmid) {

  const ctx = document.getElementById(elmid)
  if (window.myChartInstance) {
    window.myChartInstance.destroy();
  }

  window.myChartInstance = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: Object.keys(lablesPluseData),
      datasets: [{
        // label: 'lol my brain',
        data: Object.values(lablesPluseData)
      }]
    }
  })
}


function CreateTable({ rows }) {
  return (<>
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
          {rows.map((row, index) => {
            // const correctedJson = row.log.replace(/'/g, '"');
            // let logObj = JSON.parse(correctedJson);

            return (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{row.Job}</td>
                <td>{row.message}</td>
                <td>{row.level}</td>
                <td>{row.Job_id}</td>
                <td>{new Date(row.time * 1000).toLocaleString()}</td>

              </tr>
            );
          })}
          {/* row 1 */}

        </tbody>
      </table>
    </div>
  </>
  )
}