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
    return (
        <div>
            <NavBar/>
            <div className='flex h-screen'>
                <div className=''>
                <Focus_drop_data title="BruteForce" content={<CreateTableBruteForce />}  />
                <Focus_drop_data title="UserAccountChanges" content={<CreateTableUserAccountChanges />}  />
                <Focus_drop_data title="special privilege Logons" content={<CreateTableSplPrivilegeLogons />}  />
                <Focus_drop_data title="Explicit Credential Logon" content={<CreateTableExplicitCredentialLogon  />}/>
                {/* <Focus_drop_data /> */}
                </div>
            </div>

        <SideBar / >
        </div>
    )
}

function Focus_drop_data({title,content}) {
    return (<>
        <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border ">
            <div className="collapse-title text-xl font-medium">{title}</div>
            <div className="collapse-content">
                <div>
                    {content}
                </div>
            </div>
        </div>
    </>)
}



function CreateTableBruteForce() {
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


function CreateTableUserAccountChanges() {
    const [rows, setRows] = useState([]);
    useEffect(
        () => {
            fetch('http://127.0.0.1:223/user_account_changes')
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

function CreateTableSplPrivilegeLogons() {
    const [rows, setRows] = useState([]);
    useEffect(
        () => {
            fetch('http://127.0.0.1:223/spl_privilege_logons')
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

function CreateTableExplicitCredentialLogon() {
    const [rows, setRows] = useState([]);
    useEffect(
        () => {
            fetch('http://127.0.0.1:223/explicit_credential_logon')
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
                        <th className="text-xl" >email</th>

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
                                <td>{row.email}</td>

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