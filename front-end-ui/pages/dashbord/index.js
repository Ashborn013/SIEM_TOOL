import React from 'react'
import SideBar from '../../components/SideBar'

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
                    {/* Place other row-by-row data here */}
                    <CreateTable/>
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
    return (<>
        <div className="overflow-x-auto">
            <table className="table text-lg">
                {/* head */}
                <thead>
                    <tr>
                        <th className="text-xl"></th>
                        <th className="text-xl" >Scan</th>
                        <th className="text-xl" >Target</th>
                        <th className="text-xl" >Result</th>
                    </tr>
                </thead>
                <tbody>
                    {/* row 1 */}
                    <tr>
                        <th>1</th>
                        <td>Cy Ganderton</td>
                        <td>Quality Control Specialist</td>
                        <td>Blue</td>
                    </tr>
                    {/* row 2 */}
                    <tr>
                        <th>2</th>
                        <td>Hart Hagerty</td>
                        <td>Desktop Support Technician</td>
                        <td>Purple</td>
                    </tr>
                    {/* row 3 */}
                    <tr>
                        <th>3</th>
                        <td>Brice Swyre</td>
                        <td>Tax Accountant</td>
                        <td>Red</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </>
    )
}