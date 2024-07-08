import React from "react";
import { CgMenuGridO ,CgFlagAlt } from "react-icons/cg";
import { FaServer } from "react-icons/fa6";
import { IoIosPulse } from "react-icons/io";
import { IoBook } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import Link from "next/link";
export default function SideBar() {
  return (
    <div>
      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col items-center justify-center">
          {/* Page content here */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 flex flex-col justify-between  text-lg">
            {/* Sidebar content here */}
            <div>
              <li>
                <Link href="/dashboard"> <CgMenuGridO /> DashBord</Link>
              </li>
              <li>
              <Link href="/targets"> <FaServer />Targets</Link>
              </li>
              <li>
                <a><IoIosPulse /> Scans</a>
              </li>
              <li>
                <a><CgFlagAlt />Risk</a>
              </li>
              <li>
                <a><IoBook /> Report</a>
              </li>
            </div>
           
            <div>

              <hr />
              <li>
                <a><GoGear /> Settings</a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
