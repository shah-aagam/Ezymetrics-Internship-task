import { useState } from 'react';
import './App.css';
import AllRoutes from './AllRoutes';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Router>
      <AllRoutes isSidebarOpen={isSidebarOpen} toggleSidebar={toggleSidebar} />
    </Router>
  );
}

export default App;
