/*
import React from 'react';
import { Link } from 'react-router-dom';
import { HiChartPie, HiInbox, HiUser, HiTable, HiArrowSmRight } from 'react-icons/hi';

const Sidebar: React.FC = () => {
  return (
    <div className="fixed top-0 left-0 h-full w-64 bg-gray-800 text-white">
      <div className="p-4">
        <ul>
        
        <Link to="/" className="flex items-center p-2 hover:bg-gray-700 rounded">
            <HiChartPie className="w-6 h-6 mr-2" />
            Dashboard
        </Link>
 
            <Link to="/submissions" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <HiTable className="w-6 h-6 mr-2" />
              New Submission
            </Link>
 
            <Link to="/sign-in" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <HiUser className="w-6 h-6 mr-2" />
              Sign In
            </Link>
  
            <Link to="/statistics" className="flex items-center p-2 hover:bg-gray-700 rounded">
              <HiArrowSmRight className="w-6 h-6 mr-2" />
              Statistics
            </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
import React, { useState } from 'react';
import { Transition } from '@headlessui/react';
import { Bars3Icon } from '@heroicons/react/24/solid';
import {
  HiChartPie,
  HiTable,
  HiUser,
  HiArrowSmRight,
} from 'react-icons/hi';
import { Link } from 'react-router-dom';

export function SidebarWithHamburger() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="relative">

      <Bars3Icon
        onClick={toggleSidebar}
        style={{ width: '20px', height: '20px' }}  // Set size directly
    className="text-gray-500 rounded-md hover:bg-gray-200 focus:outline-none absolute top-4 left-4 z-50 cursor-pointer"
      />

      <Transition
        show={isOpen}
        enter="transition-all duration-300 ease-in-out"
        enterFrom="w-0"
        enterTo="w-64"
        leave="transition-all duration-300 ease-in-out"
        leaveFrom="w-64"
        leaveTo="w-0"
      >
        <div className="fixed top-0 left-0 h-full bg-gray-800 text-white shadow-lg z-40">
          <div className="p-4">
            <h1 className="text-xl font-bold mb-6">Menu</h1>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="flex items-center p-2 text-white hover:bg-gray-700 rounded">
                  <HiChartPie className="w-6 h-6 mr-2" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/submissions" className="flex items-center p-2 text-white hover:bg-gray-700 rounded">
                  <HiTable className="w-6 h-6 mr-2" />
                  New Submission
                </Link>
              </li>
              <li>
                <Link to="/sign-in" className="flex items-center p-2 text-white hover:bg-gray-700 rounded">
                  <HiUser className="w-6 h-6 mr-2" />
                  Sign In
                </Link>
              </li>
              <li>
                <Link to="/statistics" className="flex items-center p-2 text-white hover:bg-gray-700 rounded">
                  <HiArrowSmRight className="w-6 h-6 mr-2" />
                  Statistics
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Transition>
    </div>
  );
}
*/
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Bars3Icon } from '@heroicons/react/24/solid'; // Import the Bars3Icon

interface SidebarProps {
  // Add any props you want to use here
}

const Sidebar: React.FC<SidebarProps> = () => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div className={`flex ${isExpanded ? 'w-64' : 'w-16'} bg-gray-800 text-white h-full transition-all duration-300`}>
      <div className="flex flex-col w-full">
        <button
          onClick={toggleSidebar}
          className="p-4 bg-gray-700 hover:bg-gray-600 rounded-r-lg focus:outline-none"
        >
          <Bars3Icon className="w-6 h-6" />
        </button>
        <div className={`flex flex-col items-center mt-4 ${isExpanded ? 'opacity-100' : 'opacity-0'}`}>
          <Link to="/" className={`flex items-center p-2 transition-all ${isExpanded ? 'block' : 'hidden'} hover:bg-gray-600`}>
            Home
          </Link>
          <Link to="/statistics" className={`flex items-center p-2 transition-all ${isExpanded ? 'block' : 'hidden'} hover:bg-gray-600`}>
            Statistics
          </Link>
          <Link to="/sign-in" className={`flex items-center p-2 transition-all ${isExpanded ? 'block' : 'hidden'} hover:bg-gray-600`}>
            Sign In
          </Link>
          <Link to="/submissions" className={`flex items-center p-2 transition-all ${isExpanded ? 'block' : 'hidden'} hover:bg-gray-600`}>
            Submissions
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
