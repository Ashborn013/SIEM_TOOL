import NavBar from '../../components/NavBar';
import SideBar from '../../components/SideBar'
import React, { useEffect, useState } from 'react';
import { getCookie } from 'cookies-next';


export const getServerSideProps = (context) => {
    console.log(context.req)
    const user = getCookie('login', { req: context.req });
  
    if (!user) {
      return {
        redirect: {
          destination: '/auth/login',
          permanent: false,
        },
      };
    }
  
    return { props: {} };
  };



export default function index() {
    const [rows, setRows] = useState([]);
    const [user, setUser] = useState(null)


    useEffect(()=>{
        if(getCookie('login')){
          setUser(getCookie('login'))
          console.log(user)
        }
      })

    useEffect(() => {
        function fetchJobDetails() {
            fetch('http://127.0.0.1:223/Job_details')
                .then(response => response.json())
                .then(data => {
                    console.log("Fetched data");
                    data = CountValuesInArray(data)

                    setRows((currentRows) => {
                        if (JSON.stringify(currentRows) !== JSON.stringify(data)) {


                            return data;
                        }
                        return currentRows;
                    });
                })
                .catch(error => console.error("Error fetching data:", error));
        };
        fetchJobDetails(); // Initial fetch
        const intervalId = setInterval(fetchJobDetails, 5000); // Fetch every 5000 ms (5 seconds)
        return () => clearInterval(intervalId);
    }, []);
    useEffect(() => {
        console.log(new Date(), rows);
    }, [rows]);
    // console.log(rows)    
    return (
        < div>

            <NavBar />

            <div className='flex h-screen '>
                {/* <SideNavBar/> */}
                <div className='flex-grow overflow-auto p-4'>
                    <a className=' font-bold text-[5rem]'>Dashboard</a>
                    <div className='flex flex-row  gap-4'>
                        <RiskCards title="Critical" content={rows.Critical} color="bg-purple-600" />
                        <RiskCards title="High" content={rows.High} color="bg-[#FF6160]" />
                        <RiskCards title="Medium" content={rows.Mid} color="bg-[#FEAF64]" />
                        <RiskCards title="Low" content={rows.Low} color="bg-[#F4E449]" />
                        <div className='flex-row  space-y-2'>
                            <RiskCards title="Accpted" content="0" color=" bg-[#58FA80]" />
                            <RiskCards title="Closed" content="0" color=" bg-[#D8DCDF]" />

                        </div>

                    </div>
                    <a className='text-[2rem]'>Recent Scans </a>
                    {/* MORE DATA */}
                    {/* <CreateTable /> */}
                </div>
            </div>
            <SideBar />

        </div>
    )
}

function RiskCards({ title, content, color }) {
    return (
        <div className={`card ${color} text-primary-content w-96 flex justify-center items-center`}>
            <div className="card-body flex flex-col justify-center items-center h-full">
                <div className=''>
                    <h1 className="card-title font-mono">{title}</h1>
                </div>
                <div className='flex justify-center items-center'>
                    <p className='font-bold text-[25px]'>{content}</p>
                </div>
            </div>
        </div>
    )
}


function CreateTable() {
    const [rows, setRows] = useState([]);
    useEffect(
        () => {
            fetch('http://127.0.0.1:223/brute_force')
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
function CountValuesInArray(rows) {
    let dict = {}
    rows.forEach(row => {
        let what = row.level;
        dict[what] = (dict[what] || 0) + 1;
    });

    return dict
}