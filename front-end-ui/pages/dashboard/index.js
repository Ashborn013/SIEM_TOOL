import SideBar from '../../components/SideBar'
import React, { useEffect, useState } from 'react';

export default function index() {
    return (
        <>
            <div className='flex h-screen'>
                <SideBar />
                <div className='flex-grow overflow-auto p-4'>
                    <a className=' font-bold text-[5rem]'>Dashboard</a>
                    <div className='flex flex-row  gap-4'>
                        <RiskCards title="Critical" content="0" color="bg-purple-600" />
                        <RiskCards title="High" content="0" color="bg-[#FF6160]" />
                        <RiskCards title="Medium" content="0" color="bg-[#FEAF64]" />
                        <RiskCards title="Low" content="0" color="bg-[#F4E449]" />
                        <div className='flex-row  space-y-2'>
                            <RiskCards title="Accpted" content="0" color=" bg-[#58FA80]" />
                            <RiskCards title="Closed" content="0" color=" bg-[#D8DCDF]" />

                        </div>

                    </div>
                    <a className='text-[2rem]'>Recent Scans </a>
                    {/* MORE DATA */}
                    <CreateTable />
                </div>
            </div>
        </>
    )
}

function RiskCards({ title, content, color }) {
    return (
        <div className={`card ${color} text-primary-content w-96`}>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{content}</p>
            </div>
        </div>
    )
}


function CreateTable() {
    const [rows, setRows] = useState([]);
    useEffect(
        () => {
            fetch('http://127.0.0.1:223/data')
                .then(response => response.json())
                .then(data => {
                    setRows(data);

                })
                .catch(error => console.error("Error"), [])
        }
    )
    return (<>
        <div className="overflow-x-auto">
            <table className="table text-lg">
                {/* head */}
                <thead>
                    <tr>
                        <th className="text-xl">Slno</th>
                        <th className="text-xl" >Time</th>
                        <th className="text-xl" >level</th>
                        <th className="text-xl" >message</th>
                        <th className="text-xl" >event_id</th>

                    </tr>
                </thead>
                <tbody>
                    {rows.map((row, index) => {
                        const correctedJson = row.log.replace(/'/g, '"');
                        let logObj = JSON.parse(correctedJson);

                        return (
                            <tr key={index}>
                                <th>{index + 1}</th>
                                <td>{row.timestamp}</td>
                                <td>{logObj.level}</td>
                                <td>{row.message}</td>
                                <td>{row.event_id}</td>

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