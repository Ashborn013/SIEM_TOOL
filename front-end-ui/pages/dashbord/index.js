import React from 'react'
import SideBar from '../../components/SideBar'

export default function index() {
    return (
        <div className='flex  items-start h-screen gap-4'>
            <SideBar />
            <div className=' flex  overflow-auto  space-x-3  '>
                <RiskCards title="Critical" content="0" color=" bg-purple-600" />
                <RiskCards title="High" content="0" color=" bg-[#FF6160]" />
                <RiskCards title="Medium" content="0" color=" bg-[#FEAF64]" />
                <RiskCards title="Low" content="0" color=" bg-[#F4E449]" />
                <div className='flex-row  space-y-2'>
                    <RiskCards title="Accpted" content="0" color=" bg-[#58FA80]" />
                    <RiskCards title="Closed" content="0" color=" bg-[#D8DCDF]" />
                </div>
            </div>
        </div>
    )
}


function RiskCards({ title, content, color }) {
    return (<>
        <div className={`card  ${color} text-primary-content w-96 `}>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p>{content}</p>
                {/* <div className="card-actions justify-end">
                    <button className="btn">Buy Now</button>
                </div> */}
            </div>
        </div>
    </>)
}


function temp() {
    <div className='bg-purple-600' ></div>
}