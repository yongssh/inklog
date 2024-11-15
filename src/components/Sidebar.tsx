import React from 'react';
import { CiCircleMinus } from 'react-icons/ci';
import { HiTable, HiUser, HiChartPie, HiArrowSmRight } from 'react-icons/hi';
import { Link } from 'react-router-dom';

interface SideBarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
}

const SideBar: React.FC<SideBarProps> = (props) => {
  const sidebarClass = props.isOpen ? 'sidebar open' : 'sidebar';

  return (
    <div className={sidebarClass}>
      <button onClick={props.toggleSidebar} className="sidebar-close">
        <CiCircleMinus size={24} />
      </button>
      <nav className="sidebar-links">
        <Link
          to="/"
          className={`flex items-center p-4 transition-colors duration-300 ${props.isOpen ? 'block' : 'hidden'} hover:bg-gray-200 rounded-md text-lg`}
        >
          {props.isOpen && <HiChartPie className="w-8 h-8 mr-3" />}
          {props.isOpen && 'Dashboard'}
        </Link>
        <Link
          to="/add"
          className={`flex items-center p-4 transition-colors duration-300 ${props.isOpen ? 'block' : 'hidden'} hover:bg-gray-200 rounded-md text-lg`}
        >
          {props.isOpen && <HiTable className="w-8 h-8 mr-3" />}
          {props.isOpen && 'New Submission'}
        </Link>
        {/* <Link
          to="/sign-in"
          className={`flex items-center p-4 transition-colors duration-300 ${props.isOpen ? 'block' : 'hidden'} hover:bg-gray-200 rounded-md text-lg`}
        >
          {props.isOpen && <HiUser className="w-8 h-8 mr-3" />}
          {props.isOpen && 'Sign In'}
        </Link> */}
        <Link
          to="/SignIn"
          className={`flex items-center p-4 transition-colors duration-300 ${props.isOpen ? 'block' : 'hidden'} hover:bg-gray-200 rounded-md text-lg`}
        >
          {props.isOpen && <HiArrowSmRight className="w-8 h-8 mr-3" />}
          {props.isOpen && 'Sign In'}
        </Link>
      </nav>
    </div>
  );
};

export default SideBar;
