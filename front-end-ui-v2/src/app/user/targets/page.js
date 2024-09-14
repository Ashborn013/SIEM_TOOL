"use client"
import { useEffect, useState } from 'react'
import NavBar from '@/components/NavBar';
import SideBar from '@/components/SideBar';
import { FaLaptopCode } from "react-icons/fa6";
export default function Page() {
    const [hostNames, SethostName] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            const requestOptions = {
                method: "GET",
                redirect: "follow"
            };

            try {
                const response = await fetch("http://localhost:223/hostnames", requestOptions);
                const result = await response.json()
                SethostName(result);
                console.log(result)
            } catch (error) {
                console.error(error);
            }
            console.log(hostNames);

        };

        fetchData();
    }, []);

    return (
        <div>
            <NavBar />
            <div className='flex '>
                <div className='flex justify-evenly   '>
                    {
                        hostNames.map((elm)=>{
                            return <><Card name={elm.hostname}/></>
                        })
                    }
                </div>
            </div>
            <SideBar />
        </div>
    )
}





function Card({name}) {
    return (
        <>
            <div className="card bg-base-100 w-96 shadow-xl">
                <figure className="px-10 pt-10">
                <FaLaptopCode size="5em" />
                </figure>
                <div className="card-body items-center text-center">
                    <h2 className="card-title">{name}</h2>
                    <p></p>
                    
                </div>
            </div>
        </>
    )

}