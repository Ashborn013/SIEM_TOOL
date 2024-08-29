import React from "react";
import { CgMenuGridO, CgFlagAlt } from "react-icons/cg";
import { FaServer } from "react-icons/fa6";
import { IoIosPulse } from "react-icons/io";
import { IoBook } from "react-icons/io5";
import { GoGear } from "react-icons/go";
import Link from "next/link";
export default function SideBar() {
  return (
    <div>
      <div className="drawer">
        <input id="side-bar" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
          {/* Page content here */}
          <label htmlFor="side-bar" className="btn btn-primary drawer-button hidden ">
            Open drawer
          </label>
        </div>
        <div className="drawer-side">
          <label
            htmlFor="side-bar"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4 justify-between   flex-col text-[1.25rem]">
            {/* Sidebar content here */}
            <div className="flex justify-between flex-col  ">
              <li className="mb-4 ">
                <Link href="/user/dashboard">
                  <CgMenuGridO /> DashBoard
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/user/targets">
                  <FaServer />
                  Targets
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/user/scans">
                  <IoIosPulse /> Scans
                </Link>
              </li>
              <li className="mb-4">
                <Link href="/user/risk">
                  <CgFlagAlt />
                  Risk
                </Link>
              </li>
              <li>
                <Link href="/user/report">
                  <IoBook /> Report
                </Link>
              </li>
            </div>
            <div>
              <hr />
              <li>
                <a>
                  <GoGear /> Settings
                </a>
              </li>
            </div>
          </ul>
        </div>
      </div>
    </div>
  );
}
