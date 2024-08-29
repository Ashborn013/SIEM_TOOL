import Image from "next/image";
import Link from 'next/link'
export default function Home() {
  return (<>
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <h1 className="text-5xl font-bold">Hello there</h1>
          <p className="py-6">
            LogIn to get Started  
          </p>
          <button  className="btn btn-primary"><Link href="/login"> Get Started</Link></button>
        </div>
      </div>
    </div>
  </>);
}
