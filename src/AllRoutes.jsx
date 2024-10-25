import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import Leads from './components/Leads';
import Reports from './components/Reports';
import Analytics from './components/Analytics';

const AllRoutes = ({ isSidebarOpen, toggleSidebar }) => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
      <Route path="/leads" element={<Leads isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
      <Route path="/reports" element={<Reports isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
      <Route path="/analytics" element={<Analytics isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />} />
    </Routes>
  );
};

export default AllRoutes;
