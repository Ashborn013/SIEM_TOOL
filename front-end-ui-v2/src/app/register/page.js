"use client"
import {React , useState , useEffect} from 'react';
import { useRouter } from 'next/navigation'

export default function Page() {
    const router = useRouter();
    
    const [password,setPassword] = useState("");
    const [username,setUsername] = useState("");
    const [email,setEmail] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        let formData = new FormData();
        formData.append("email",email);
        formData.append("username",username);
        formData.append("password",password);
        const response = await fetch("/api/login",{
            method:"POST",
            body:formData
        });
        if (response.ok){
            const data = await response.json();
            console.log(data);
            router.push("/user/dashboard");
        }
    }
    const onChangePassword = (e) => {
        setPassword(e.target.value);
    }
    const onChangeEmail = (e) => {
        setEmail(e.target.value);
    }
    const onChangeUseName = (e) => {
        setUsername(e.target.value);
    }
    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="card w-96 shadow-xl p-4">

                <label className="input input-bordered flex items-center gap-2 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                        <path
                            d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                    </svg>
                    <input onChange={onChangeEmail} id="email" type="text" className="grow" placeholder="Email" required />
                </label>
                {/* Username Input */}
                <label className="input input-bordered flex items-center gap-2 mb-4">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
                    </svg>
                    <input onChange={onChangeUseName} id="username" type="text" className="grow" placeholder="Username" required />
                </label>
                {/* Password Input */}
                <label className="input input-bordered flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 16 16"
                        fill="currentColor"
                        className="h-4 w-4 opacity-70">
                        <path
                            fillRule="evenodd"
                            d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                            clipRule="evenodd" />
                    </svg>
                    <input onChange={onChangePassword} id="password" type="password" className="grow" placeholder="password" required />
                </label>
                <div className="card-actions justify-end pt-5">
                    <button  onClick={handleSubmit} className="btn btn-primary">Submit</button>
                </div>
            </div>
        </div>
    );
}