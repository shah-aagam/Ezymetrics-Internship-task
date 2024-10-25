import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import monitor from '../assets/monitor.png';
import report from '../assets/report.png';
import analytics from '../assets/analytics.png';
import leads from '../assets/leads.png';

const Sidebar = ({ isSidebarOpen, toggleSidebar }) => {
  const location = useLocation();

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`fixed top-0 h-screen bg-white shadow-xl w-60 transition-transform duration-200 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <nav className="sticky top-0 py-8">
          <div className="w-full text-left bg-inherit mb-10 px-6">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">
              Ezy<span className="text-[#1C6BA0]">Metrics</span>
            </h2>
            <p className="text-sm text-gray-500">Transforming Data into Insights</p>
          </div>

          <div className="px-4">
            <div className="mb-6">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `flex items-center justify-between px-8 py-3 text-lg rounded-lg text-gray-600 hover:bg-[#1C6BA0] hover:text-white transition-all duration-200 ${
                    isActive ? 'font-bold bg-[#1C6BA0] text-white shadow-lg' : ''
                  }`
                }
                onClick={toggleSidebar}
              >
                <img
                  src={monitor}
                  width={38}
                  className={location.pathname === '/' ? 'invert' : ''}
                  alt="Dashboard Icon"
                />
                <p>Dashboard</p>
              </NavLink>
            </div>

            <div className="mb-6">
              <NavLink
                to="/leads"
                className={({ isActive }) =>
                  `flex items-center justify-between px-8 py-3 text-lg rounded-lg text-gray-600 hover:bg-[#1C6BA0] hover:text-white transition-all duration-200 ${
                    isActive ? 'font-bold bg-[#1C6BA0] text-white shadow-md' : ''
                  }`
                }
                onClick={toggleSidebar}
              >
                <img
                  src={leads}
                  width={38}
                  className={location.pathname === '/leads' ? 'invert' : ''}
                  alt="Leads Icon"
                />
                <p>Leads</p>
              </NavLink>
            </div>

            <div className="mb-6">
              <NavLink
                to="/analytics"
                className={({ isActive }) =>
                  `flex gap-4 items-center justify-between px-8 py-3 text-lg rounded-lg text-gray-600 hover:bg-[#1C6BA0] hover:text-white transition-all duration-200 ${
                    isActive ? 'font-bold bg-[#1C6BA0] text-white shadow-md' : ''
                  }`
                }
                onClick={toggleSidebar}
              >
                <img
                  src={analytics}
                  width={38}
                  className={location.pathname === '/analytics' ? 'invert' : ''}
                  alt="Analytics Icon"
                />
                <p>Analytics</p>
              </NavLink>
            </div>

            <div className="mb-6">
              <NavLink
                to="/reports"
                className={({ isActive }) =>
                  `flex gap-4 items-center justify-between px-8 py-3 text-lg rounded-lg text-gray-600 hover:bg-[#1C6BA0] hover:text-white transition-all duration-200 ${
                    isActive ? 'font-bold bg-[#1C6BA0] text-white shadow-md' : ''
                  }`
                }
                onClick={toggleSidebar}
              >
                <img
                  src={report}
                  width={38}
                  className={location.pathname === '/reports' ? 'invert' : ''}
                  alt="Reports Icon"
                />
                <p>Reports</p>
              </NavLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;


