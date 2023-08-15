import React from "react";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillClipboardCheckFill } from "react-icons/bs";
import { BsPencilFill } from "react-icons/bs";
import { BsFillFilePdfFill } from "react-icons/bs";
import { FaUsers } from "react-icons/fa";
import { BiLogOutCircle } from "react-icons/bi";
import { VscTarget } from "react-icons/vsc";

const Sidebar = () => {
  return (
    <div className="w-1/6 sidebar-height bg-headline  sticky top-0 px-2 py-4 shadow-md">
      <Link to="/">
        <div className="flex items-center justify-center font-bold mb-4">
          <VscTarget />
          <span className="text-black text-lg ml-2 ">Menu</span>
        </div>
      </Link>
      <div className="flex-col justify-end border-t-2 font-bold my-4"></div>

      <div className="h-[70vh] grid grid-rows-[auto,auto]">
        <div>
          <ul className="space-y-6 mt-4 w-full">
            <li className="app-side-li">
              <NavLink to="/skills" className="flex items-center gap-4">
                <BiSolidDashboard />
                <span>Dashboard</span>
              </NavLink>
            </li>
            <li className="app-side-li">
              <NavLink to="/mcqs" className="flex items-center gap-4">
                <BsFillClipboardCheckFill />
                <span>Add Chapters</span>
              </NavLink>
            </li>
            <li className="app-side-li">
              <NavLink to="/mcqs" className="flex items-center gap-4">
                <BsPencilFill />
                <span>Add MCQs</span>
              </NavLink>
            </li>
            <li className="app-side-li">
              <NavLink to="/choose" className="flex items-center gap-4">
                <BsFillFilePdfFill />
                <span>PDF Notes</span>
              </NavLink>
            </li>
            <li className="app-side-li">
              <NavLink to="/" className="flex items-center gap-4">
                <FaUsers />
                <span>Users</span>
              </NavLink>
            </li>
          </ul>
        </div>
        <div className="px-4 flex flex-col-reverse ">
          <NavLink to="/logut" className="flex items-center gap-4 app-side-li">
            <BiLogOutCircle />
            <span>Logout</span>
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
