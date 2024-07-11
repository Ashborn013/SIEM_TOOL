import React, { useEffect, useState } from 'react';
import SideBar from '../../components/SideBar'
//  to do add a funtion in main.py which can add each job run to table 
export default function index() {
    return (
        <div>
            <div className='flex h-screen'>
                <SideBar />
                <CreateTable />
            </div>


        </div>
    )
}


function CreateTable() {
    const [rows, setRows] = useState([]);
    useEffect(
        () => {
            fetch('http://127.0.0.1:223/Job_details')
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
                        <th className="text-xl" >Job</th>
                        <th className="text-xl" >Message</th>
                        <th className="text-xl" >level</th>
                        <th className="text-xl" >Job_id</th>

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